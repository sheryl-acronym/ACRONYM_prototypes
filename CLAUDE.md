# ACRONYM Prototypes

## Schema Compliance

All types, mock data, and component code must conform to the Supabase schema defined in `src/db/schema.ts`.

When adding or modifying features:

1. **Field naming** — Use `snake_case` for all type fields and data properties, matching the column names in `src/db/schema.ts`. Never introduce `camelCase` field names.
2. **Enum values** — Use the exact enum values from the schema (e.g. `deal_status`: `in_progress` / `won` / `lost`, `contact_role`: `buyer` / `seller`, `signal_type`: `objection` / `question`, `risk_level`: `high` / `medium` / `low`).
3. **Table structure** — New UI types should mirror the corresponding schema table. If a field doesn't exist in the schema, it belongs in the `metadata: Json` column (e.g. `momentum`, `icon_color`).
4. **Reference file** — `src/db/schema.ts` is the single source of truth. Consult it before creating any new types or data structures.
5. **Type checking** — Run `npx tsc --noEmit` after any change to ensure type safety is maintained.
