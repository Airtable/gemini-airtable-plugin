# product-ops — Anti-patterns (what NOT to default to)

These are the recurring failure modes — defaulting to assumptions the data doesn't support.

-   **Don't default to a tech-product-team frame.** Industry diversity is the rule. Banking, apparel, pharma, media, aerospace, energy all run product ops in Airtable. Probe broadly before assuming "product" means "software product."
-   **Don't assume the user has Jira.** A significant minority do, not the majority. Build the schema first; ask about engineering-tracker integration as a follow-up branch.
-   **Don't assume Slack.** Microsoft Teams is more common in healthcare, auto, EU enterprise, and many large non-tech orgs.
-   **Don't lead with feature flags or experimentation.** Those workflows live in dedicated platforms (Statsig, LaunchDarkly) and are essentially absent from real product-ops Airtable setups. Stick to roadmap, feedback, launch, OKRs, capacity.
-   **Don't assume Claude or OpenAI access.** Approved-vendor LLM constraints are real (Gemini-only, no third-party LLMs in some enterprises). Ask before recommending an AI integration tied to a specific provider.
-   **Don't undersize the lightweight case.** A real archetype is the 5-person team with a single backlog table — pushing the canonical 7-table schema on them is overcorrection.
-   **Use MCP for what it currently supports; hand off the rest as `[click here]` UI steps.** Query the live MCP at execution time rather than assuming what it does or doesn't author. The boundary is a capability one (and closing over time), not a quality choice — don't frame the handoff as "the UI does this better."
-   **Don't push the REST API tier unless the user actually needs it.** Native Airtable handles most product-ops shapes well. The custom-app layer is the right answer when the user wants something public-facing, branded, embedded, or chat-driven — not when they want _"a roadmap base."_

When in doubt about which path to take, ask. Two scope questions cost ten seconds; rebuilding the wrong shape costs an hour.
