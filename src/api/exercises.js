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

function add(data) {
  return authAxios.post('/exercises', data)
}

function update(data) {
  console.log(data)
  const { id, ...formData } = data
  return authAxios.put('/exercises/' + id, formData)
}

export default { getExercises, removeById, getById, add, update }
