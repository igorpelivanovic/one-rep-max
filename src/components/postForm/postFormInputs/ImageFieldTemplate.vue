<template>
  <div class="no-image-placeholder-container">
    <div class="no-image-placeholder-content">
      <div class="icon-container">
        <i class="fas fa-camera icon"></i>
      </div>
      <p class="title">
        <span class="main">dodaj sliku</span>
        <span>(maksimalna veličina 5MB)</span>
      </p>
    </div>
  </div>
</template>
<style scoped>
.no-image-placeholder-container {
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  align-self: stretch;
  .no-image-placeholder-content {
    height: 60%;
    .icon-container {
      margin: auto;
      background-color: var(--gray-620);
      width: 50px;
      aspect-ratio: 1/1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      .icon {
        color: var(--gray);
        font-size: 1.4rem;
      }
    }
    p.title {
      font-size: 0.85rem;
      span {
        display: block;
        &.main {
          font-size: 0.95rem;
          text-transform: capitalize;
          margin-bottom: 5px;
        }
        &:not(.main) {
          font-style: italic;
        }
      }
    }
    text-align: center;
  }
}
</style>
