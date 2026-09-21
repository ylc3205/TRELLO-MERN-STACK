// Allow overriding via environment variable
let apiRoot = import.meta.env?.VITE_API_ROOT || 'http://localhost:8017'

if (process.env.BUILD_MODE === 'production' && !import.meta.env?.VITE_API_ROOT) {
  apiRoot = 'https://trello-api-ttcs.onrender.com'
}

export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12

export const CARD_MEMBER_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}