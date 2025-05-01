interface ImportMetaEnv {
    SUPABASE_KEY(SUPABASE_URL: string, SUPABASE_KEY: string): unknown
    readonly SUPABASE_URL: string
    readonly SUPABASE_ANON_KEY: string
    readonly HYGRAPH_ENDPOINT: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}