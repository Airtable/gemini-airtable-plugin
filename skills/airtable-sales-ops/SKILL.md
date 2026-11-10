---
name: airtable-sales-ops
description: Set up and run Airtable-based sales operations and CRM workflows — pipeline management, account and renewal management, deal desk, RFP / tender pipelines, partner CRMs, sales forecasting, vertical CRMs (real estate, mortgage, brokerage, capital markets, public works, nonprofit), and AI-native lean stacks (Clay-equivalent enrichment, AI-assisted outbound, conversation-intel ingestion). Use when the user wants to track deals, manage accounts, build a pipeline, run a deal desk, coordinate partners, manage RFPs, or build an AI-forward GTM stack. Defaults to augmenting existing CRMs (Salesforce / HubSpot); also supports Airtable-as-CRM and AI-native stacks. Asks scope first. Commercial workflows only; post-sale support belongs to a future customer-success skill.
license: MIT
metadata:
    version: '0.1.0'
    author: airtable
---

# Sales operations and CRM workflows

Set up and run sales operations workflows in Airtable — pipeline, accounts, renewals, deal desk, RFP tracking, partner CRMs, vertical sales-shaped systems. Adapts to team size, existing CRM, and industry. Ask scope before scaffolding; the same trigger can mean a 3-table pipeline for a 5-person team, a Salesforce-augmenting deal desk for a 200-person enterprise sales org, or a vertical-specific CRM for a mortgage broker / real estate firm / public-works contractor.

## Who this serves and what they're solving for

Sales operations spans more roles and verticals than the "VP Sales running Salesforce" stereotype.

-   **Revenue leaders** (CRO / VP Sales / RevOps / sales-ops manager) — pipeline coverage, forecast accuracy, segment visibility, lead-to-revenue efficiency. _"Broken"_ means _"I can't trust the numbers."_
-   **Daily operators** (AE / SDR / BDR / account manager) — prospect context at the point of contact, fast inbound routing, deal-stage clarity, low-friction logging. _"Broken"_ means _"I'm pasting between five tabs to send one email."_
-   **Cross-functional support** (deal desk, sales engineering, sales-ops analysts) — approval routing with audit trail, capacity vs. demand, technical-fit scoring, exception triage. Distinct product surface from the CRM itself.
-   **Partner / channel managers** — partner-led pipeline rollups, deal registration with anti-conflict rules, joint account planning, MDF tracking.
-   **Vertical operators** — mortgage loan officers, real-estate brokers, capture managers (public works / AEC), donor relations leads, capital-markets desk operators — sales-shaped workflows with industry-specific vocabulary, regulators, and integrations.

Cross-cutting problems: the existing CRM is usually staying but bleeds into spreadsheets where work actually happens (_"swivel-chair work,"_ _"single source of truth"_); per-seat licensing pushes stakeholders out of the system, so visibility breaks; the modern sales-tech stack (Outreach / Salesloft / Apollo / Gong / CaptivateIQ) is often _absent_ in non-tech and mid-market footprints; AI-forward teams want an open data substrate to build Clay-equivalent enrichment + AI-drafted outbound + conversation-intel ingestion _on_, not a CRM with AI bolted on.

## Before scaffolding: ask scope

Sales operations spans more industries and shapes than most categories — most customers running sales workflows in Airtable are NOT tech-SaaS GTM teams. Real estate brokerages, mortgage operations, insurance carriers, capital markets desks, public-works contractors, nonprofits managing donors, education institutions managing partnerships, talent agencies tracking deals — all run "sales ops in Airtable" with different schemas and workflows. Lead with three scope questions; branch from there.

1. **Team size and shape.** Solo / small (under 10) / mid (10–50) / large (50+) / enterprise (multi-team / multi-base). Determines schema-shape default — a 5-person team building their first CRM and a 200-person sales org augmenting Salesforce don't want the same scaffolding.
2. **Existing CRM (or deliberate absence of one).** _"Do you have a CRM today (Salesforce, HubSpot, Pipedrive, smaller / vertical CRM, none yet, 'Salesforce that everyone hates', or are you building an AI-native stack without a traditional CRM)?"_ Single most load-bearing question for this skill. Pulls the augment-vs-replace-vs-build-from-scratch decision into the open. **Frame the consolidation value-prop and let the user choose**: full migration (Airtable replaces the CRM — common at smaller scale or non-tech verticals), augmentation (Airtable as agile UI / staging / pre-CRM / post-CRM layer above the CRM as system of record — dominant at scale), license-reduction (Airtable as read-mostly UI for stakeholders who can't justify CRM seats), lightweight CRM for a sub-team while the main CRM stays as SoR, or **AI-native lean stack** (Airtable as the data substrate for AI-forward startups that may never adopt a traditional CRM — Clay-style enrichment + AI account briefs + AI-assisted outbound layered on Airtable's typed records, AI Field Agents, and REST API). All five are valid; don't push any single shape as a directive. See `references/integrations.md` for per-CRM and AI-stack integration mechanics.
3. **Primary sub-workflow.** _"Pipeline management, account management, renewal motion, deal desk, RFP / tender pipeline, partner / channel CRM, or vertical-specific (mortgage, real estate, brokerage, etc.)?"_ Determines which Work-mode playbook and which schema shape to lead with. Most users want one of these first, not all of them.

Branch into these when relevant — only when relevant:

-   **Industry / vertical signal.** When the user's language signals it (_"broker"_, _"tender"_, _"loan"_, _"underwriting"_, _"property"_, _"donor"_), confirm the vertical and load the vertical schema. Vertical schemas don't generalize cleanly across industries — a mortgage CRM and a public-works tender pipeline share almost nothing operationally.
-   **License-reduction motive** when the user has Salesforce + a small team (under 20 reps) or a budget-constrained scenario. Surfaces the "Airtable as read-mostly UI layer above SFDC" pattern instead of full replacement.
-   **AI vendor constraints** — when AI workflows surface, ask about approved-vendor LLM constraints (Gemini-only, no third-party LLMs). Real pattern in regulated enterprises.
-   **External-facing surface needed?** _"Branded partner / vendor / contractor portal? Public partner registration? Embedded inside an existing product? Slack / WhatsApp / Teams bot?"_ Two viable paths — surface both and let the user choose. **Airtable Portals** is the first-party branded external-collaborator surface (Interface-based with custom sign-in / logo / background; paid add-on starting at Team-tier pricing per portal seat) — fastest to set up, fits when Interface Designer's component set covers the workflow. **Custom UI on Vercel / etc.** is the right call when the user wants full design control, has budget concerns about the Portal add-on, needs UX beyond Interface Designer's component set, needs server-side compute, wants to embed inside an existing product, or wants a chat-driven channel. Both are legitimate; the user's call.

Three lead questions usually clarify the scaffold in one round. Don't impose a framework before listening.

## Two modes

### Setup mode: scaffold a base

When the user asks _"set up a CRM"_ / _"build me a sales pipeline"_ / _"track deals"_ / _"build a partner registration system"_, scaffold the schema via the MCP after scope is clear.

1. **Scope questions** (above). Read the answers. A 5-minute scope conversation beats a wrong-shape rebuild — especially across the industry diversity this category covers.
2. **Pick a schema shape** matching team size, CRM presence, and vertical. Five lead shapes the skill body names inline; vertical and specialized shapes available on demand via `references/vertical-shapes.md` and `references/schema-shapes.md`.
3. **Build the schema via MCP** — base, typed fields, linked records, formulas, rollups, sample / seed data. The schema is the foundation everything else builds on. Spend the agent's effort on richer typed fields, status `singleSelect`s with thoughtful stage colors, linked-record relationships with rollup counts (e.g., `Opportunities.Amount × Probability` rolled up to Account-level expected revenue).
4. **Hand off UI configuration** — views (Kanban on Opportunities by Stage, calendar on next-action dates, gallery on Accounts), Interface pages, Automations, Forms, sync wizards (Salesforce / HubSpot / Slack / Jira). See "Build-plan output" below.
5. **Build any external-facing surfaces the user wants** — for partner / vendor / contractor / client portals, mention that Airtable Portals (paid add-on, Interface-based, branded sign-in) is one option, and a custom Vercel app reading Airtable via REST API is another. Build whichever the user chooses; don't prescribe. Same for chat-driven workflows (Slack / WhatsApp / Teams bots), embedded surfaces inside existing products, or other custom UI — the user knows what fits their situation. See `references/build-shapes.md` for the patterns.

#### Lead schema shapes

The five most-common shapes — covering the great majority of invocations. Full field-by-field detail in `references/schema-shapes.md`.

-   **Lightweight pipeline (1–2 tables)** — Pipeline + Contacts. For solo founders, 2–3 person sales teams, deal trackers without dedicated SDR/AE function. Don't impose multi-table CRM structure they won't use. Customer language: _"I just need to track deals"_, _"a list of who I've talked to"_.
-   **Solo / small (3 tables)** — Accounts + Contacts + Opportunities. Classic CRM triangle. The default when the user wants a CRM without an existing one to augment. Add stage progression, probability, expected close, owner, lead source. Light AI integration (LinkedIn enrichment, AI-generated meeting prep) optional.
-   **Mid (5–6 tables)** — + Activities (calls / meetings / emails), + separate Leads table if inbound volume warrants it, + Stage configuration table. For 10–50 person teams running their own CRM end-to-end. Add forecast rollups (probability-weighted expected value by quarter), lead scoring, round-robin lead routing.
-   **CRM-augmentation (alongside Salesforce / HubSpot)** — synced Accounts / Contacts / Opportunities (read-only from the CRM) + native Airtable tables for what the CRM doesn't model well: Deal Desk requests, Customer Reference DB, Capacity / Quota tracking, Sales Engineering allocation, Activity / Meeting Note sync. **Most common shape at 50+ person sales orgs.** Includes the bi-directional sync pattern via Automations when push-back to the CRM is needed.
-   **Enterprise multi-base augmentation** — multi-base hub-and-spoke; central hub federating per-region or per-program spokes; bi-directional sync via Automations; row-level permissions via Interfaces so reps see only their accounts while managers roll up. For multi-region or multi-program sales orgs where each unit needs autonomy AND executive rollup is required.
-   **AI-native lean stack** (no traditional CRM, by design) — Accounts + Contacts + Opportunities + Activities + an AI-heavy Enrichment table where AI Field Agents waterfall-enrich records from LinkedIn, web research, and external enrichment APIs (the Clay-equivalent pattern, native in Airtable). Add AI-drafted outbound (drafts to a review queue, never autonomous send), AI account-brief generation, AI MEDDIC field extraction from synced transcripts. For AI-forward startups choosing Airtable + AI tooling over Salesforce + add-ons. Full detail in `references/schema-shapes.md#ai-native-lean-stack`.

**Vertical and specialized shapes** — surface only when scope answers indicate them (full detail in `references/vertical-shapes.md` and `references/schema-shapes.md`):

-   Brokerage / commission CRM (real estate, talent, mortgage broker, financial advisor) — industry-specific pricing / contract / commission calculation
-   Real estate CRM (residential / commercial; pursuit stages, MSA, acreage formulas)
-   Mortgage operations CRM (customer → cases → plans, 6-month renewal triggers, LOS sync)
-   Capital markets / investment banking (block trade lifecycle, sponsor coverage)
-   Public works / AEC tender pipeline (pursuit tiering, go/no-go, stakeholder intelligence)
-   Nonprofit / fundraising / donor pipeline
-   Partner / channel CRM with external collaborator access
-   Deal desk / approval workflow / pricing-calculator hub (distinct product surface from CRM)
-   Customer reference / advocacy database
-   Sales engineering activity & capacity tracking
-   Sales bookings forecast with rep-level row permissions
-   RFP / tender pipeline with pre-bid intelligence

Don't impose a 7-table CRM on a 3-person team; don't ship a 3-table starter to an enterprise org with 5 sales squads and an existing Salesforce. Pick the shape that matches the answers.

**Emerging pattern worth surfacing on request**: mutual action plans (MAPs) / deal rooms / evaluation rooms — high customer demand, low shipped reality. Can be scaffolded as a sub-workflow on top of the opportunity table, but flag as emerging rather than treating as default.

#### Build-layer decision

Setup-mode skills can compose across four parallel layers (not a waterfall):

1. **Schema layer (always via MCP)** — base, typed fields, linked records, formulas, seed data. The foundation; every path goes through it.
2. **Native Airtable UX** — views, Interface Designer pages, Automations, Forms, granular permissions, sync setup wizards. Use MCP for what it supports today; hand off via `[click here]` for what it doesn't yet.
3. **Airtable Portals** — Airtable's first-party branded external-collaborator surface, built on Interface Designer with custom sign-in page (logo + background), one portal per base, guest user access at Read-only / Commenter / Editor permission levels. **Paid add-on** (Team and Business tiers; Enterprise feature). Suits cases where the user wants a fast branded sign-in for external collaborators and Interface Designer's component set covers the workflow.
4. **Custom app layer (REST API + agent-built UI)** — Next.js / React app on Vercel, Slack / WhatsApp / Discord / Teams bot, scheduled scripts, embedded surfaces inside the user's existing product. Suits cases where the user wants full design control, embedded surfaces in an existing product, chat-driven channels, server-side compute, or UX beyond Interface Designer's component set.

**For external-facing surfaces, surface both Portals and custom-Vercel paths and let the user choose.** Neither is a default — both are legitimate. Portals saves build time when its component set fits and the add-on cost works; custom Vercel gives full design control and avoids the add-on if the user has bandwidth to build and host. The user knows their constraints (budget, design needs, engineering capacity, time-to-ship) better than the skill does.

Lean toward native Airtable when the user says _"I want to track deals"_ / _"manage accounts"_ without specifying any external-facing surface. When external collaborators come up, mention both Portals and custom-app as options and follow the user's lead.

See `references/build-shapes.md` for concrete patterns under both paths.

### Work mode: operate on an existing base

When the user invokes the skill against a base that already exists — _"triage this week's leads"_, _"prep the QBR forecast"_, _"flag at-risk renewals"_, _"score these inbound RFPs"_ — identify which sub-workflow they want, execute via MCP (filtering, scoring, updating, rolling up), then hand off the result via `airtable-show-link`.

#### Lead sub-workflows

Twelve sub-workflow shapes that cover most invocations. Each has a full playbook in `references/sub-workflows.md` — load the relevant section on demand.

1. **Pipeline triage and stage progression** — filter opportunities by stage, qualification field, age, owner; identify stalled deals; update stage / next-step / probability. The most common Work-mode invocation.
2. **Lead routing and assignment** — score / classify inbound leads; route to AE / SDR via round-robin or rule-based assignment; notify Slack. Sub-minute pickup achievable when the automation chain is tight.
3. **Forecast review** — roll up `Amount × Probability` by quarter / owner / segment / vertical; identify forecast risk; export to BI. Pipeline coverage and forecast accuracy as core metrics.
4. **Account research and account-brief generation** — gather context across Accounts / Opportunities / Activities / external sources (LinkedIn, news, web research); produce meeting-prep brief. AI-assisted where access permits.
5. **Renewal pipeline / risk monitoring** — identify accounts approaching renewal; rollup usage / engagement signals; flag at-risk; trigger CSM action. Distinct from raw pipeline; this is the commercial side of post-sale.
6. **Sales-to-service handoff** — validate Closed-Won opportunities meet required-field thresholds (PO, amount, ship date, terms); create downstream records in ops / install / project tables; notify handoff team. Pipeline doesn't end at "Closed-Won."
7. **Deal desk review** — triage Deal Support Requests / pricing exceptions / partner exception requests; route to approvers; track approval state with SOX auditability; tie back to opportunity.
8. **Partner / channel CRM ops** — partner pipeline review, channel registration, joint account planning, partner-led pipeline rollup, deal registration approvals. External-collaborator interfaces where partners log into Airtable to update their own records.
9. **RFP / tender pipeline ops** — pre-bid intel triage, go/no-go decision tracking, bid submission status, win-rate analysis by tier, capture vs. pursuit framing for AEC / public-works / enterprise B2B.
10. **Customer reference / advocacy DB ops** — match customer asks to available references, check rights / permissions / clauses sourced from contracts, log usage to track over-asking risk.
11. **Data enrichment waterfall (Clay-equivalent)** — multi-source AI enrichment per record (LinkedIn → web research → external data providers → AI Field Agents extracting structured fields from unstructured sources). Per-record waterfall logic: try primary source; if missing, try secondary; backfill via web research as fallback. Native pattern in Airtable; no separate Clay subscription required for most teams.
12. **AI-assisted outbound drafts (copilot pattern, not autonomous)** — generate per-recipient outbound drafts (email, LinkedIn, multi-channel sequence) using AI Field Agents with account + contact context. Drafts land in a review queue; a human approves before send. Critical: this is the validated shape — fully autonomous AI SDR tools have churned heavily in the market, while the copilot pattern (AI drafts → human review) sticks.

Plus one opt-in pattern worth surfacing when the user is explicitly building an agent-driven workflow:

13. **Agent activity log pattern** — when the user describes an agent-driven workflow (recurring triage, multi-step plan, automated monitoring), surface the opt-in `Agent activity log` pattern and compose the `airtable-agent-activity-log` skill to scaffold + operate it. Don't re-implement the schema inline.

A longer tail of reference-available Work-mode sub-workflows lives in `references/sub-workflows.md` — vertical-specific (mortgage renewal close, brokerage commission close), specialized (sales engineering capacity rollup, sales bookings forecast snapshot, whitespace mapping, quarterly sales planning), emerging patterns (Mutual Action Plans / deal rooms), and additional AI copilot patterns (AI MEDDIC extraction → human verification, AI inbound classifier with auto-routing, AI account-brief from web research). Load when scope surfaces them.

## Composition

This skill composes with three siblings; don't reinvent what they own.

-   **`airtable-show-link`** — every Setup-mode build-plan ends with a base link; every Work-mode operation that touches records ends with a record / table / page link. Mandatory composition. Hand off the most-specific URL the tool calls have proven access to.
-   **`airtable-filters`** — when Work-mode operations slice records (triage queues, _"find Enterprise accounts with no activity in 30 days"_, capacity rollups), compose the filter syntax through this skill rather than re-deriving it.
-   **`airtable-overview`** — load only when the user shows confusion about basic data-model concepts (base / table / record / interface page). Most users don't need it; pulling it in by default wastes tokens.

## Permission-aware behavior

The MCP user's auth determines which URLs the user can actually open. Respect the scope the tool calls have proven:

-   **Page-restricted users** (interface-only access via Airtable's permission model) — hand off interface page URLs only. A `tbl_*` URL the user can't open is a dead link from their perspective.
-   **Table-level access** — table URLs are safe.
-   **Workspace-level access** — workspace URLs are safe.

Standing rule: if a tool call didn't prove the access surface, don't link to it. When in doubt, drop one specificity level. The `airtable-show-link` skill enforces this when handing off URLs.

## Build-plan output

See `references/build-plan-templates.md` for the four output shapes and their exact templates.

## Anti-patterns (what NOT to default to)

See `references/anti-patterns.md` before proposing a build.
