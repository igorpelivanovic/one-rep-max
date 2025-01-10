import AuthToken from '@/utils/authToken'
import { REQUIRED_AUTH_STATUS } from './data'

function authGuard(to) {
  // Destruct auth param
  const {
    meta: { auth },
  } = to

  // Check Required Auth
  if (auth === REQUIRED_AUTH_STATUS.get('authRequired') && !AuthToken.getAuthToken()) {
    return {
      name: 'login',
    }
  }

  // Check Required noAuth
  if (auth === REQUIRED_AUTH_STATUS.get('noAuthRequired') && AuthToken.getAuthToken()) {
    return {
      name: 'home',
    }
  }
  return
}

export { authGuard }
