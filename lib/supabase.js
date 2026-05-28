import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yjxmzvdtztjnzjbtmufj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY in .env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
