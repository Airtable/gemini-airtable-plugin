# marketing-ops — Build-plan output

Two output shapes, depending on which layers apply. Pick what matches what the user actually asked for — don't over-build (no custom app for _"track our campaigns"_) and don't under-build (no UI-step list when they asked for _"a branded brand-asset portal"_).

**Before listing items in any `Configure in Airtable` or `Configure Portal` block below, check the live MCP at `mcp.airtable.com/mcp` for current support — if the MCP now authors a surface you'd otherwise hand off (view, Interface page, Automation, Form, etc.), use the MCP path instead. The MCP's capability boundary is moving fast; what's a UI handoff today may be MCP-driven tomorrow.**

**Pure Airtable** (most common — user wants the native experience):

```
✅ Built (via MCP):
  - [Base name] with [N] tables, [N] fields, linked records, [N] seed records
  - View in Airtable: [base link]

🎨 Configure in Airtable:
  - [Specific calendar / kanban / gallery view, e.g. "Calendar view on Campaigns keyed by Launch date"] — [click here]
  - [Specific interface page for the right stakeholder audience] — [click here]
  - [Specific form / automation, e.g. "Form for marketing request intake" or "Slack notification on Status = Approved"] — [click here]
```

**Airtable + custom app** (user wants a branded UI, public portal, self-serve generator, or agency client portal):

```
✅ Built (via MCP):
  - [Base + schema]
  - View in Airtable: [base link]

🛠️ Custom app:
  - [Next.js portal at vercel-deploy-url, or self-serve collateral generator]
  - Reads / writes [tables] via Airtable REST API
  - PAT scoped to [scopes]
  - Source: [github-repo-link]

🎨 Configure in Airtable:
  - [Admin interface page for triage] — [click here]
  - [Automation tying app to base events] — [click here]
```

Pick the 1-3 most-impactful UI handoffs; don't enumerate every possible view. The user can ask for more once they're inside the base.
