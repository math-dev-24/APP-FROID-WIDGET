import { useState, useEffect } from "react"
import type { Fluid } from "@/types/fluid"

export function useFluids() {
  const [fluids, setFluids] = useState<Fluid[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    chrome.runtime.sendMessage(
      { type: "FLUIDS_REQUEST" },
      (response: { success: boolean; data?: Fluid[]; error?: string }) => {
        if (chrome.runtime.lastError) {
          setError(chrome.runtime.lastError.message ?? "Erreur inconnue")
          setLoading(false)
          return
        }
        if (response.success && response.data) {
          setFluids(response.data)
        } else {
          setError(response.error ?? "Erreur inconnue")
        }
        setLoading(false)
      }
    )
  }, [])

  return { fluids, loading, error }
}
