# Airtable for Gemini

Airtable is the database and operations layer for your agents — bases, schema, records, and collaboration UI, with the official Airtable MCP server (`mcp.airtable.com/mcp`) bundled.

This repository packages the Airtable plugin for Gemini and Google Antigravity.

## Install

```bash
agy plugin install https://github.com/airtable/gemini-airtable-plugin
```

Or browse the Antigravity Marketplace (**Customizations → Marketplace**) and add Airtable from there.

To validate a local checkout:

```bash
agy plugin validate --strict .
```

## What's inside

| Skill | Use it for |
| --- | --- |
| `airtable-overview` | Core data-model concepts — bases, tables, records, interfaces. |
| `airtable-filters` | Building filter parameters for record queries. |
| `airtable-show-link` | Returning a clickable Airtable link after touching user-visible content. |
| `airtable-agent-activity-log` | Scaffolding an audit log of what an agent did across a long-running workflow. |
| `airtable-product-ops` | Roadmaps, feedback triage, releases, OKRs. |
| `airtable-sales-ops` | Pipeline, forecasting, renewals, deal desk. |
| `airtable-marketing-ops` | Campaigns, launches, briefs, influencer and content pipelines. |

The MCP server is wired through `mcp_config.json` and needs no local install. Sign in with Airtable the first time the server connects.

## Layout

```
.
├── .gemini-plugin/plugin.json   # plugin manifest
├── mcp_config.json              # remote MCP server
├── assets/                      # logo
└── skills/<skill-name>/SKILL.md
```

## Relationship to `airtable/skills`

Skill content is shared with the Claude Code, Codex, and Cursor package at [airtable/skills](https://github.com/airtable/skills). This repository is the Gemini surface and differs in two deliberate ways:

- **Skill slugs are brand-prefixed** (`airtable-sales-ops`, not `sales-ops`), as required for Gemini plugin ingestion.
- **`airtable-cli` is not included.** Gemini runs in a managed sandbox with no local shell, so the CLI-based skill is not shippable here; everything goes through the remote MCP server.

When a shared skill changes upstream, mirror the change here and bump the version.

## Development

```bash
node scripts/lint.mjs    # same checks the CI runs
```

## License

[MIT](./LICENSE).
