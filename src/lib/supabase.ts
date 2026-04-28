import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xsffrqqnnvrnxaxqralr.supabase.co'
const supabaseAnonKey = 'sb_publishable_IcwZpo_oGwEmobcHDMB40w_C_Yq8T_b'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)