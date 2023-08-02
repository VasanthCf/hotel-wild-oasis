import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yswinbubxilxuxspsild.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzd2luYnVieGlseHV4c3BzaWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3NzQ0NTUsImV4cCI6MjAwNTM1MDQ1NX0.i9Ya5H61ancKg4mhiS9noOdHoCVpgs0T5wDVJkDQvcI";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
