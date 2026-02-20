import type { ConfigUnit } from "@/types/settings"
import type { SimpleApiInput, SimplePayload, SimpleApiOutput } from "@/types/simple"

export function useSimple() {
  const send = (configUnit: ConfigUnit, data: SimpleApiInput): Promise<SimpleApiOutput> =>
    new Promise((resolve, reject) => {
      const payload: SimplePayload = {
        config_unit: configUnit,
        data,
      }

      chrome.runtime.sendMessage(
        { type: "SIMPLE_REQUEST", data: payload },
        (response: { success: boolean; data?: SimpleApiOutput; error?: string }) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message))
            return
          }
          if (response.success && response.data) {
            resolve(response.data)
          } else {
            reject(new Error(response.error ?? "Erreur inconnue"))
          }
        }
      )
    })

  return { send }
}
