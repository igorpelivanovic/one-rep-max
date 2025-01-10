import { AUTH_TOKEN_KEY } from '@/data/storageKeys'

function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

function setAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  return
}

function removeAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  return
}

export default { getAuthToken, setAuthToken, removeAuthToken }
