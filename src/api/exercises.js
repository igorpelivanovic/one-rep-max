import { authAxios } from '@/axios/auth'

function getExercises(params) {
  return authAxios.get('/exercises', {
    params,
  })
}

function removeById(id) {
  return authAxios.delete('/exercises/' + id)
}

function getById(id) {
  return authAxios.get('/exercises/' + id)
}

export default { getExercises, removeById, getById }
