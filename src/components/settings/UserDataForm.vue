<script setup>
import { ref } from 'vue'
import { useAuthUserStore } from '@/stores/auth'
import ChangeUserDataInput from './ChangeUserDataInput.vue'

const authUserStore = useAuthUserStore()
const newUsername = ref(authUserStore.user.name)
const newPassword = ref('')
const newFullname = ref(authUserStore.user.usr_fullname)

function validateUsername(username) {
  console.log('username')
  if (username.length < 3 || username.length > 60) {
    return false
  }
  return username
}

function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/gim
  if (!regex.test(password)) {
    return false
  }
  return password
}

function validateFullname(fullname) {
  if (fullname.length < 3 || fullname.length > 60) {
    return false
  }
  return fullname
}

async function submitForm(event) {
  try {
    if (
      newPassword.value === '' &&
      newUsername.value === authUserStore.user.name &&
      newFullname.value === authUserStore.user.usr_fullname
    ) {
      return
    }
    event.target.disabled = true
    if (
      newPassword.value === '' &&
      (newUsername.value != authUserStore.user.name ||
        newFullname.value != authUserStore.user.usr_fullname)
    ) {
      await authUserStore.changeAuthData({
        name: newUsername.value,
        fullname: newFullname.value,
      })
    }
    if (newPassword.value.length) {
      await authUserStore.changeAuthData({
        name: newUsername,
        password: newPassword,
        fullname: newFullname,
      })
    }
    event.target.disabled = false
  } catch (error) {
    console.log(error)
    event.target.disabled = false
  }
}
</script>

<template>
  <div class="user-data-form-wrapper">
    <h2>Moji podaci</h2>
    <ChangeUserDataInput
      title="username"
      i-label="Korisničko ime"
      :i-value="newUsername"
      :validator="validateUsername"
      @input-change="(val) => (newUsername = val)"
    ></ChangeUserDataInput>
    <ChangeUserDataInput
      title="fullname"
      i-label="Ime i prezime"
      :i-value="newFullname"
      :validator="validateFullname"
      @input-change="(val) => (newFullname = val)"
    ></ChangeUserDataInput>
    <ChangeUserDataInput
      title="password"
      i-label="Lozinka"
      type="password"
      :i-value="newPassword"
      :validator="validatePassword"
      @input-change="(val) => (newPassword = val)"
    ></ChangeUserDataInput>
    <button @click="submitForm">SAČUVAJ IZMENE</button>
  </div>
</template>

<style scoped>
.user-data-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: baseline;
}
</style>
