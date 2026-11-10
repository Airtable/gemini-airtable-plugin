# Changelog

All notable changes to the Airtable plugin for Gemini are documented here. This project follows [Semantic Versioning](https://semver.org).

## 0.1.0

- Initial Gemini / Antigravity package.
- Seven brand-prefixed skills: `airtable-overview`, `airtable-filters`, `airtable-show-link`, `airtable-agent-activity-log`, `airtable-product-ops`, `airtable-sales-ops`, `airtable-marketing-ops`.
- Remote MCP server (`https://mcp.airtable.com/mcp`) wired via `mcp_config.json`.
- Long guidance (build-plan templates, anti-patterns, marketing voice) moved into `references/` for `airtable-sales-ops` and `airtable-marketing-ops`, which exceeded the 24000-byte loader limit and were being silently truncated.
