<template>
  <div class="dash-content-wrapper">
    <slot></slot>
  </div>
</template>
<style scoped>
.dash-content-wrapper {
  padding: 20px;
  border-radius: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 60px;
  overflow: auto;
  width: 100%;
  height: 100%;
  margin-inline: auto;
  width: 95%;
}
@media screen and (min-width: 601px) {
  .dash-content-wrapper {
    max-width: 590px;
  }
}
@media screen and (min-width: 769px) {
  .dash-content-wrapper {
    max-width: 750px;
  }
}
@media screen and (min-width: 1025px) {
  .dash-content-wrapper {
    background-color: var(--gray);

    max-width: 100%;
    width: 100%;
  }
}
</style>
