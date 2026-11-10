#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const warnings = []
const fail = (m) => errors.push(m)
const warn = (m) => warnings.push(m)

const FORBIDDEN_COMMANDS = [
    ['npm install -g', 'local CLI install'],
    ['brew install', 'local CLI install'],
    ['pip install', 'local CLI install'],
    ['curl | sh', 'remote script dropper'],
    ['curl -sSL |', 'remote script dropper'],
    ['docker run', 'container dependency'],
]

const SECRET_PATTERNS = [
    [/\bpat[A-Za-z0-9]{14,}\b/, 'Airtable personal access token'],
    [/\bsk-[A-Za-z0-9]{20,}\b/, 'OpenAI-style API key'],
    [/\bAKIA[0-9A-Z]{16}\b/, 'AWS access key id'],
    [/BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/, 'private key'],
    [/client_secret\s*[:=]\s*["'][^"']{8,}["']/, 'client secret'],
]

const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2060-\u2064\uFEFF]/

async function readJson(rel) {
    const file = path.join(ROOT, rel)
    if (!existsSync(file)) {
        fail(`${rel}: missing`)
        return null
    }
    try {
        return JSON.parse(await readFile(file, 'utf8'))
    } catch (e) {
        fail(`${rel}: invalid JSON (${e.message})`)
        return null
    }
}

function imageSize(file) {
    const buf = readFileSync(file)
    if (buf.subarray(1, 4).toString() === 'PNG') {
        return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
    }
    const svg = buf.toString('utf8')
    const vb = svg.match(/viewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)/)
    if (vb) return { w: Number(vb[1]), h: Number(vb[2]) }
    const w = svg.match(/\bwidth=["']([\d.]+)/)
    const h = svg.match(/\bheight=["']([\d.]+)/)
    if (w && h) return { w: Number(w[1]), h: Number(h[1]) }
    return null
}

const manifest = await readJson('.gemini-plugin/plugin.json')
const mcp = await readJson('mcp_config.json')

if (manifest) {
    for (const field of ['name', 'displayName', 'description', 'version', 'logo', 'author']) {
        if (!manifest[field]) fail(`plugin.json: missing required field "${field}"`)
    }
    if (manifest.name && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(manifest.name)) {
        fail(`plugin.json: name "${manifest.name}" is not lowercase kebab-case`)
    }
    if (manifest.displayName && /^(gemini|antigravity|claude|cursor)\b/i.test(manifest.displayName)) {
        fail('plugin.json: displayName must not lead with a client name')
    }
    if (manifest.description && (manifest.description.length < 120 || manifest.description.length > 160)) {
        warn(`plugin.json: description is ${manifest.description.length} chars (120-160 recommended)`)
    }
    if (manifest.suggestedPrompts && manifest.suggestedPrompts.length > 3) {
        fail('plugin.json: suggestedPrompts allows at most 3 entries')
    }
    if (manifest.logo) {
        const logo = path.join(ROOT, manifest.logo)
        if (!existsSync(logo)) {
            fail(`plugin.json: logo "${manifest.logo}" does not exist`)
        } else {
            const size = imageSize(logo)
            if (!size) fail(`plugin.json: cannot read logo dimensions for "${manifest.logo}"`)
            else {
                if (size.w !== size.h) fail(`plugin.json: logo must be square (got ${size.w}x${size.h})`)
                if (size.w < 128) fail(`plugin.json: logo must be at least 128x128 (got ${size.w}x${size.h})`)
            }
        }
    }
}

if (mcp) {
    const servers = Object.entries(mcp.mcpServers ?? {})
    if (!servers.length) fail('mcp_config.json: no mcpServers declared')
    for (const [name, server] of servers) {
        if (!server.url) fail(`mcp_config.json: server "${name}" has no url`)
        else if (!server.url.startsWith('https://')) fail(`mcp_config.json: server "${name}" must use https`)
        else if (!new URL(server.url).hostname.endsWith('airtable.com')) {
            fail(`mcp_config.json: server "${name}" must be on a verified airtable.com host`)
        }
        if ('type' in server) fail(`mcp_config.json: server "${name}" declares "type"; transport is inferred from url`)
    }
}

const skillsDir = path.join(ROOT, 'skills')
const entries = (await readdir(skillsDir, { withFileTypes: true })).filter((e) => e.isDirectory())
if (!entries.length) fail('skills/: no skills found')

for (const entry of entries) {
    const rel = `skills/${entry.name}/SKILL.md`
    const file = path.join(ROOT, rel)
    if (!existsSync(file)) {
        fail(`${rel}: missing`)
        continue
    }
    const text = await readFile(file, 'utf8')
    const front = text.match(/^---\n([\s\S]*?)\n---/)
    if (!front) {
        fail(`${rel}: missing YAML frontmatter`)
        continue
    }
    const name = front[1].match(/^name:[ \t]*(.+)$/m)?.[1]?.trim()
    const description = front[1].match(/^description:[ \t]*([\s\S]*?)(?=\n[a-z-]+:|\s*$)/m)?.[1]?.trim()

    if (!name) fail(`${rel}: missing frontmatter "name"`)
    else {
        if (name !== entry.name) fail(`${rel}: name "${name}" does not match directory`)
        if (name.length > 64) fail(`${rel}: name exceeds 64 characters`)
        if (!name.startsWith('airtable-')) fail(`${rel}: name must be prefixed with the partner brand`)
    }
    if (!description) fail(`${rel}: missing frontmatter "description"`)
    else if (description.length > 1024) fail(`${rel}: description is ${description.length} chars (max 1024)`)

    const body = text.slice(front[0].length)
    const lines = body.split('\n').length
    const bytes = Buffer.byteLength(body)
    if (bytes > 24000) fail(`${rel}: body is ${bytes} bytes (loader truncates above 24000)`)
    else if (bytes > 20000) warn(`${rel}: body is ${bytes} bytes (24000 limit, little headroom)`)
    if (lines > 500) fail(`${rel}: body is ${lines} lines (max 500)`)
    else if (lines > 300) warn(`${rel}: body is ${lines} lines (150-300 target)`)

    for (const [pattern, label] of FORBIDDEN_COMMANDS) {
        if (text.includes(pattern)) fail(`${rel}: contains ${label} ("${pattern}")`)
    }
    for (const [pattern, label] of SECRET_PATTERNS) {
        if (pattern.test(text)) fail(`${rel}: looks like it contains a ${label}`)
    }
    if (INVISIBLE.test(text)) fail(`${rel}: contains invisible unicode characters`)
}

for (const e of await readdir(ROOT, { withFileTypes: true })) {
    if (!e.isFile()) continue
    const text = await readFile(path.join(ROOT, e.name), 'utf8').catch(() => '')
    for (const [pattern, label] of SECRET_PATTERNS) {
        if (pattern.test(text)) fail(`${e.name}: looks like it contains a ${label}`)
    }
}

for (const w of warnings) console.warn(`warn  ${w}`)
for (const e of errors) console.error(`error ${e}`)

if (errors.length) {
    console.error(`\n${errors.length} error(s), ${warnings.length} warning(s)`)
    process.exit(1)
}
console.log(`OK: ${entries.length} skills, ${errors.length} errors, ${warnings.length} warnings`)
