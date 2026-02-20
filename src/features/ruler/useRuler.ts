import type { ConfigUnit } from "@/types/settings"
import type { DataIntRuler, RulerPayload } from "@/types/ruler"

export type { DataIntRuler }

export const useRuler = () => {
  const send = (configUnit: ConfigUnit, data: DataIntRuler): Promise<unknown> =>
    new Promise((resolve, reject) => {
      const payload: RulerPayload = {
        config_unit: configUnit,
        data,
      }

      chrome.runtime.sendMessage(
        { type: "RULER_REQUEST", data: payload },
        (response: { success: boolean; data?: unknown; error?: string }) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message))
            return
          }
          if (response.success) {
            resolve(response.data)
          } else {
            reject(new Error(response.error ?? "Unknown error"))
          }
        }
      )
    })

  return { send }
}
