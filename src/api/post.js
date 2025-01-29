import { authAxios } from '@/axios/auth'
import { baseAxios } from '@/axios/base'
function add(data) {
  return authAxios.post('/posts/add', data, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=ExampleBoundaryString',
    },
  })
}

function getById(id) {
  return baseAxios.get('/posts/' + id)
}

function getPosts(params) {
  return baseAxios.get('/posts', {
    params,
  })
}

function getPostsByCategory(categoryName, params) {
  return baseAxios.get('/posts/category/' + categoryName, { params })
}

function updateData(data) {
  const { id, ...formData } = data
  return authAxios.put('/posts/' + id, formData)
}

function updateImage(data) {
  const { id, ...formData } = data
  return authAxios.put('/posts/image/' + id, formData, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=ExampleBoundaryString',
    },
  })
}

function removeById(id) {
  return authAxios.delete('/posts/' + id)
}

export default { add, getById, updateData, updateImage, removeById, getPosts, getPostsByCategory }
