<script setup>
const emit = defineEmits(['denide', 'accept'])
</script>

<template>
  <div class="pop-up-content">
    <div class="icon-container">
      <i class="fas fa-circle-xmark"></i>
    </div>
    <div class="messages-container">
      <p class="main-message">da li si siguran?</p>
      <p class="second-message">nakon brisanja podatka nije moguće vratiti.</p>
    </div>
    <div class="action-btns">
      <button type="button" @click="emit('denide')">odustani</button>
      <button type="button" @click="emit('accept')" class="accept-btn">potvrdi</button>
    </div>
  </div>
</template>

<style scoped>
.pop-up-content {
  padding-block: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  .icon-container {
    color: var(--alert-red-dark);
    i {
      display: inline-flex;
    }
    font-size: 3rem;
  }
  .messages-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
      margin: 0;
      &.main-message {
        font-size: 1.3rem;
        &::first-letter {
          text-transform: capitalize;
        }
      }
      &.second-message {
        font-size: 0.9rem;
        color: var(--gray-700);
        &::first-letter {
          text-transform: capitalize;
        }
      }
    }
  }
  .action-btns {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 0px;
    button {
      display: block;
      border: none;
      color: var(--gray);
      background-color: var(--gray-620);
      font-size: 1.05rem;
      cursor: pointer;
      flex-basis: 120px;
      padding: 8px 20px;
      text-transform: capitalize;
      border-radius: 5px;
      &.accept-btn {
        background-color: var(--alert-red-dark);
      }
    }
  }
}
</style>
