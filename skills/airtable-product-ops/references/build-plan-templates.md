# product-ops — Build-plan output

Three output shapes, depending on which layers apply. Pick what matches what the user actually asked for — don't over-build (no custom app for _"track my projects"_) and don't under-build (no UI-step list when they asked for _"a customer-facing portal"_).

**Before listing items in any `Configure in Airtable` or `Configure Portal` block below, check the live MCP at `mcp.airtable.com/mcp` for current support — if the MCP now authors a surface you'd otherwise hand off (view, Interface page, Automation, Form, etc.), use the MCP path instead. The MCP's capability boundary is moving fast; what's a UI handoff today may be MCP-driven tomorrow.**

**Pure Airtable** (most common — user wants the native experience):

```
✅ Built (via MCP):
  - [Base name] with [N] tables, [N] fields, linked records, [N] seed records
  - View in Airtable: [base link]

🎨 Configure in Airtable:
  - [Specific Kanban / calendar / gallery view] — [click here]
  - [Specific interface page for the right stakeholder audience] — [click here]
  - [Specific form / automation] — [click here]
```

**Airtable + Portals** (user wants branded external access for customers / partners / vendors without building a custom app):

```
✅ Built (via MCP):
  - [Base + schema]
  - View in Airtable: [base link]

🌐 Configure Portal:
  - Enable Portal on the [Customer feedback intake / Partner roadmap] interface — [click here]
  - Customize branded sign-in page (logo + background) — [click here]
  - Invite first portal guest(s) — [click here]

🎨 Configure in Airtable:
  - [Admin interface page for internal triage] — [click here]
  - [Automation tying portal events to internal workflow] — [click here]
```

**Airtable + custom app** (user wants a public-facing roadmap, marketing-grade brand, embedded surface, or chat-surface bot on top):

```
✅ Built (via MCP):
  - [Base + schema]
  - View in Airtable: [base link]

🛠️ Custom app:
  - [Next.js portal at vercel-deploy-url]
  - Reads / writes [tables] via Airtable REST API
  - PAT scoped to [scopes]
  - Source: [github-repo-link]

🎨 Configure in Airtable:
  - [Admin interface page for triage] — [click here]
  - [Automation tying app to base events] — [click here]
```

Pick the 1-3 most-impactful UI handoffs; don't enumerate every possible view. The user can ask for more once they're inside the base.
