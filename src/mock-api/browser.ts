// src/mock-api/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export const startMockAPI = async () => {
  try {
    await worker.start({ onUnhandledRequest: 'bypass' })
  } catch (err) {
    console.warn('[MSW] Failed to start mock API. Continuing without mocks.', err)
  }
}
