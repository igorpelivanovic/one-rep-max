import AuthToken from '@/utils/authToken'
import { REQUIRED_AUTH_STATUS } from './data'
import { useAuthUserStore } from '@/stores/auth'

async function getUserData() {
  const { me } = useAuthUserStore()
  return me()
}

function noAuthRequired(to) {
  const { meta } = to
  if (meta.auth === REQUIRED_AUTH_STATUS.get('noAuthRequired') && AuthToken.getAuthToken())
    throw { name: 'home' }
  return
}

function authRequired(to) {
  const { meta } = to
  if (meta.auth === REQUIRED_AUTH_STATUS.get('authRequired') && !AuthToken.getAuthToken())
    throw { name: 'auth' }
  return
}

function rolePremission(to) {
  const { meta } = to
  const { getUser } = useAuthUserStore()
  if (meta.roles && getUser.role && !meta.roles.includes(getUser.role)) throw { name: 'profile' }
  return
}

export { noAuthRequired, authRequired, getUserData, rolePremission }
