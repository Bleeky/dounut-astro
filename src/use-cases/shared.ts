import { createClient } from "@crystallize/js-api-client";

export const apiClient = createClient({
    tenantIdentifier: import.meta.env.CRYSTALLIZE_TENANT_IDENTIFIER || "quentin-messagebird-se",
    accessTokenId: import.meta.env.CRYSTALLIZE_ACCESS_TOKEN_ID,
    accessTokenSecret: import.meta.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET,
    tenantId: import.meta.env.CRYSTALLIZE_TENANT_ID,
});
