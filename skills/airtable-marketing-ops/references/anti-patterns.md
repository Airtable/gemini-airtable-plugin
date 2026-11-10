# marketing-ops — Anti-patterns (what NOT to default to)

These are the recurring failure modes — defaulting to assumptions the data doesn't support.

-   **Don't default to a B2B SaaS frame.** Industry diversity is the rule — CPG, apparel, financial services, healthcare, pharma, media, telecom, automotive, energy, hospitality, music labels, agencies, education, nonprofit. Probe broadly before assuming.
-   **Don't assume HubSpot OR Marketo.** HubSpot dominates below Enterprise; Marketo dominates Enterprise. Mailchimp / Klaviyo / Customer.io / Iterable / Braze / Pardot all have real share. Ask before recommending.
-   **Don't assume Salesforce as CRM backbone.** Heavy at Enterprise, lighter below. Mid-market often uses Airtable AS a lightweight CRM alternative for customer-marketing — don't override that pattern.
-   **Don't assume Slack.** Microsoft Teams + Outlook + SharePoint is roughly half of Enterprise. Healthcare / auto / EU enterprise / government skew Microsoft.
-   **Don't default to ABM scaffolding.** Rare in deployed setups; essentially absent below Enterprise. Surface only when the user explicitly raises account-based motion.
-   **Don't default to a B2B demand-gen frame.** Marketing-ops in the wild is overwhelmingly B2C / enterprise-brand-management / agency-shaped. Demand-gen is a sub-niche, not the default.
-   **Don't over-promise on AI.** AI deployment in marketing-ops is overwhelmingly aspirational — even more so than in product-ops. Workflows should compose AI cleanly when available but work without it. The skill's value-add is helping customers _get there_.
-   **Don't assume Claude or OpenAI access.** Approved-vendor LLM constraints are real (Azure OpenAI is more common in marketing-ops than in product-ops; Gemini-only also appears). Ask.
-   **Don't undersize the SMB case — but don't assume it's a solo marketer either.** The dominant SMB shape is **agencies running multi-client delivery on Airtable**, not solo marketers. Probe.
-   **Don't be shy about consolidation framing for work-management tools.** Workfront / Asana / Monday / Wrike / Smartsheet / ClickUp / Trello / Notion all silo task data and impose schemas that fight marketing taxonomies. Airtable's relational layer + consolidating onto a single platform is the value-prop — lean on the customer-pain language (_"swivel-chair work,"_ _"too many sources of truth,"_ _"fragmented spreadsheets"_) when explaining why consolidation pays off. Per-tool migration guidance lives in `references/migrations.md`; the hybrid "Airtable as planning layer in front of existing tool" shape is documented in `references/build-shapes.md` for users who want consolidation benefits without retiring the existing tool. Follow the user's preference — full migration, hybrid, or status-quo-with-Airtable-elsewhere are all valid choices to support.
-   **Don't push a separate DAM by default.** Airtable can serve as the DAM via Attachment fields + an Assets table for moderate asset volumes — that's a real Airtable capability, not a fallback. Recommend Bynder / Frontify / Brandfolder / Adobe DAM only when the user is at high-volume enterprise scale OR explicitly asks for a specialized DAM.
-   **Don't default to 5-deep campaign hierarchies.** Aspirational in Enterprise customers still building customers; rare in deployed because they're fragile to maintain. Default to 3-tier (Campaign → Tactic → Task); offer 4-tier on demand.
-   **Don't default to localization scaffolding.** Rare overall, and almost all Enterprise-only. Add locale-aware fields when asked, not by default.
-   **Don't default to PO / budget tracking.** Enterprise-heavy — uncommon below Enterprise. Adds heavy field count and a finance-partner workflow. Surface as an add-on when the user mentions budget, spend, or PO.
-   **Don't auto-create views, interface pages, automations, or forms via MCP.** Hand them off as UI configuration steps with `[click here]` links; the visual builders are best-in-class.
-   **Don't push the REST API tier unless the user actually needs it.** Native Airtable handles most marketing-ops shapes well. Custom-app is the right answer when the user wants something public-facing, branded, embedded, or chat-driven — not when they want _"a campaign tracker."_

When in doubt about which path to take, ask. Two scope questions cost ten seconds; rebuilding the wrong shape costs an hour.
