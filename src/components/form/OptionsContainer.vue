<script setup>
const { options } = defineProps({
  options: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['checked', 'close'])
</script>

<template>
  <div class="options-wrapper">
    <div class="options-container body-disable-scroll" v-if="true">
      <ul>
        <template v-for="option of options" :key="option.value">
          <li @click="emit('checked', option.value)">
            {{ option.title }}
          </li>
        </template>
      </ul>
      <button class="close" type="button" @click="emit('close')">close</button>
    </div>
  </div>
</template>

<style scoped>
.options-wrapper {
  /* position: absolute;
  left: 0;
  right: 4px;
  top: calc(100% + 5px);
  max-height: 250px;
  overflow-y: auto; */
  /**/
  z-index: 5;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 15px 20px;
  background-color: var(--transparent-gray);
  .options-container {
    height: 100%;
    border-radius: 10px;
    /**/
    display: flex;
    flex-direction: column;
    cursor: auto;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.16);
    z-index: 1;
    border: 1px solid;
    border-top: none;
    border-color: var(--gray-600);
    background-color: var(--white);
    border-end-start-radius: 10px;
    border-end-end-radius: 10px;
    padding-block: 20px 10px;
    gap: 25px;
    ul {
      flex: 1 0px;
      overflow: auto;
      border-bottom: 1px solid var(--gray);
      /* 8*/

      li {
        border-bottom: 1px solid var(--gray);
        position: relative;
        &::first-letter {
          text-transform: capitalize;
        }
        cursor: pointer;
        padding: 3px 12px;
        &:hover {
          background-color: var(--blue-300);
        }
      }
    }
    button[type='button'].close {
      text-align: center;
      display: block;
      margin-inline: auto;
      background-color: var(--blue-500);
      text-transform: capitalize;
      color: var(--gray);
      padding: 5px 15px;
      border-radius: 10px;
    }
  }
}
@media screen and (min-width: 1025px) {
  .options-wrapper {
    position: absolute;
    left: 0;
    right: 4px;
    top: calc(100% + 5px);
    height: initial;
    max-height: 250px;
    overflow-y: auto;
    /**/
    padding: 0px;
    background-color: transparent;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    border: 1px solid;
    border-top: none;
    border-color: var(--gray-600);
    .options-container {
      height: initial;
      border-radius: 0px;
      border: none;
      display: block;
      box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.16);
      z-index: 1;
      background-color: var(--white);
      padding-block: 8px 10px;
      ul {
        flex: 1 0px;
        overflow: auto;
        border-bottom: none;

        li {
          border-bottom: none;
          position: relative;
          &::first-letter {
            text-transform: capitalize;
          }
          cursor: pointer;
          padding: 3px 12px;
          &:hover {
            background-color: var(--blue-300);
          }
        }
      }
      button[type='button'].close {
        display: none;
      }
    }
  }
}
</style>
