# sales-ops — Build-plan output

Four output shapes, depending on which layers apply. Pick what matches what the user actually asked for — don't over-build (no custom partner portal for _"track my deals"_) and don't under-build (no UI-step list when they asked for _"a branded partner registration page"_).

**Before listing items in any `Configure in Airtable` or `Configure Portal` block below, check the live MCP at `mcp.airtable.com/mcp` for current support — if the MCP now authors a surface you'd otherwise hand off (view, Interface page, Automation, Form, etc.), use the MCP path instead. The MCP's capability boundary is moving fast; what's a UI handoff today may be MCP-driven tomorrow.**

**Pure Airtable** (most common — user wants the native experience):

```
✅ Built (via MCP):
  - [Base name] with [N] tables, [N] fields, linked records, [N] seed records
  - View in Airtable: [base link]

🎨 Configure in Airtable:
  - [Specific Kanban / calendar / gallery view, e.g. "Kanban on Opportunities grouped by Stage"] — [click here]
  - [Specific Interface page for the right stakeholder audience, e.g. "Forecast dashboard for sales leadership"] — [click here]
  - [Specific form / automation, e.g. "Form for inbound lead intake" or "Round-robin lead assignment automation"] — [click here]
```

**Airtable + Portal** (when the user has chosen this path):

```
✅ Built (via MCP):
  - [Base + schema]
  - View in Airtable: [base link]

🌐 Configure Airtable Portal:
  - Enable Portal on the [base] — [click here]
  - Branded sign-in page (logo + background — Business/Enterprise) — [click here]
  - Share the [partner-facing Interface] to portal guests at [permission level] — [click here]

🎨 Configure in Airtable:
  - [Admin Interface page for sales-team triage of incoming portal activity] — [click here]
  - [Automation, e.g. "Slack notification when portal guest submits a form"] — [click here]
```

**Airtable + custom Vercel app** (when the user has chosen this path):

```
✅ Built (via MCP):
  - [Base + schema]
  - View in Airtable: [base link]

🛠️ Custom app:
  - [Next.js app at vercel-deploy-url]
  - Reads / writes [tables] via Airtable REST API
  - PAT scoped to [scopes]
  - Source: [github-repo-link]

🎨 Configure in Airtable:
  - [Admin interface page for sales-team triage] — [click here]
  - [Automation tying app to base events] — [click here]
```

**Airtable augmenting Salesforce / HubSpot** (the dominant pattern at scale):

```
✅ Built (via MCP):
  - [Base name] with [N] tables for what the CRM doesn't model — Deal Desk, Reference DB, etc.
  - Synced from [Salesforce/HubSpot]: Accounts, Contacts, Opportunities (read-only via native sync)
  - View in Airtable: [base link]

🔄 Configure CRM sync (see references/integrations.md for current mechanics):
  - Native sync from [Salesforce/HubSpot] — [setup wizard]
  - Write-back path (Salesforce Automation Actions for SFDC; REST API for HubSpot) for [specific writeback fields]

🎨 Configure in Airtable:
  - [Specific Interface page for Deal Desk / sales-team triage] — [click here]
  - [Automation for stage-change push-back to the CRM] — [click here]
```

Pick the 1–3 most-impactful UI handoffs; don't enumerate every possible view. Look up current sync limits, plan-tier gating, and supported objects at execution time — see `references/integrations.md` for the per-tool framework (native sync, Automation Actions, HyperDB sync for very large datasets, REST API, MCP).
