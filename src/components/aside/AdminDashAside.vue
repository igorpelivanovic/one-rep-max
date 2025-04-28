<script setup>
import useClickOutside from '@/composables/clickOutside'
import { useLocalStorage } from '@/composables/localStorage'
import { watch } from 'vue'
import { useTemplateRef } from 'vue'
import { ref } from 'vue'

const { setValue, value: menuCollapseInit } = useLocalStorage('orm-menu-collapse')

const hideMenu = ref(menuCollapseInit === 'true')
const mobileHide = ref(true)

const toggleMenuStyle = () => {
  hideMenu.value = !hideMenu.value
  return
}
const containerRef = useTemplateRef('container')
const btnRef = useTemplateRef('btn')

watch(hideMenu, (newValue) => {
  setValue(newValue)
})
useClickOutside(containerRef, () => {
  if (window.innerWidth < 1025) {
    mobileHide.value = true
  }
}, [btnRef])
</script>

<template>
  <button type="button" class="menu-indicator" @click="mobileHide = false" ref="btn">
    <i class="fas fa-bars"></i>
  </button>
  <aside :class="{ hide: hideMenu, 'mobile-hide': mobileHide }">
    <div class="aside-content" ref="container">
      <ul>
        <li>
          <RouterLink :to="{ name: 'stats' }" @click="mobileHide = true">
            <span class="icon"><i class="fas fa-chart-simple"></i></span
            ><span class="title">statistika</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'dash-posts' }" @click="mobileHide = true">
            <span class="icon"><i class="fas fa-newspaper"></i></span
            ><span class="title">blogovi</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'dash-exercises' }" @click="mobileHide = true">
            <span class="icon"><i class="fas fa-dumbbell"></i></span
            ><span class="title">vežbe</span></RouterLink
          >
        </li>
        <li>
          <RouterLink :to="{ name: 'settings' }" @click="mobileHide = true">
            <span class="icon"><i class="fas fa-gear"></i></span>
            <span class="title">podešavanja</span></RouterLink
          >
        </li>
      </ul>
      <button type="button" class="toggle-menu" @click="toggleMenuStyle">
        <span class="icon">
          <i class="fas fa-angle-left"></i>
        </span>
      </button>
    </div>
  </aside>
</template>
<style scoped>
.menu-indicator {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: none;
  width: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  z-index: 1;
  font-size: 1.4rem;
  color: var(--gray);
  background-color: var(--blue-600);
  border: none;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.3s allow-discrete;
  &:has(~ aside.mobile-hide) {
    display: flex;
    opacity: 1;
  }
}
aside {
  position: fixed;
  z-index: 10;
  background-color: var(--transparent-gray);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &.mobile-hide {
    display: none;
    background-color: transparent;
    transition: 0.4s ease allow-discrete;

    .aside-content {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  &.hide {
    .aside-content {
      ul {
        li {
          a {
            span.title {
              opacity: 0;
              transition-delay: 0s;
            }
          }
        }
      }
      button {
        span.icon {
          transform: rotate(180deg);
        }
      }
    }
    flex: 0 0 60px;
  }
  .aside-content {
    transform: translateX(0);
    width: 80%;
    position: relative;
    /*top */
    margin-block: auto;
    flex: 1;
    background-color: var(--gray);
    border-radius: 0 20px 20px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    transition: 0.2s;
    ul {
      width: 100%;
      padding-top: 80px;
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      gap: 10px;
      li {
        a {
          overflow: hidden;
          border-radius: 15px 0 0 15px;
          display: block;
          padding: 10px 8px 10px 15px;
          text-decoration: none;
          font-size: 1.1rem;
          white-space: nowrap;
          transition: 0.1s;
          color: var(--blue-500);
          &.router-link-active {
            background-color: var(--blue-500) !important;
            color: var(--gray);
          }
          &:not(.router-link-active):hover {
            color: var(--blue-600);
          }
          &:hover {
            background-color: var(--blue-300);
          }
          span {
            display: inline-block;
            transition: color 0.1s;

            &.title {
              transition:
                color 0.1s,
                opacity 0.2s 0.2s;
              &::first-letter {
                text-transform: capitalize;
              }
              font-size: 1rem;
            }
            &.icon {
              width: 25px;
              text-align: center;
              margin-right: 10px;
            }
          }
        }
      }
    }
    button {
      display: none;
      margin: 10px;

      width: 40px;
      aspect-ratio: 1/1;
      background-color: var(--blue-300);
      border: 0;
      border-radius: 50%;
      font-size: 1.1rem;
      cursor: pointer;
      transition: 0.2s;

      span.icon {
        display: flex;
      }
      &:hover {
        color: var(--gray);
        background-color: var(--blue-600);
      }
    }
  }
}
@media screen and (min-width: 1025px) {
  .menu-indicator {
    &,
    &:has(~ aside.mobile-hide) {
      display: none;
    }
  }
  aside {
    position: relative;
    background-color: transparent;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    flex: 0 0 250px;
    &.mobile-hide {
      display: flex;
      transition: 0.4s ease allow-discrete;

      .aside-content {
        transform: initial;
        opacity: initial;
      }
    }
    .aside-content {
      width: 100%;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
