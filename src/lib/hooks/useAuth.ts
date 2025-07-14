import { useState, useEffect } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { showToast } from "@/lib/utils"

export function useAuth() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  const signOut = async () => {
    await supabase.auth.signOut()
    showToast.info('Signed out successfully')
    window.location.href = '/'
  }

  return { user, loading, signOut }
} 