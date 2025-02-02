<script setup lang="ts">
import { computed } from 'vue'
import ArticleContainer from './ArticleContainer.vue'
import CheckOption from './CheckOption.vue'
import MuscleGroupsExercise from '@/components/muscle_group_selector/MuscleGroupsExercise.vue'

const { data } = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const formatExerciseText = computed(() => data.text.split('\n'))
const activeMuscleGroups = computed(() =>
  (({ primaryGroup, seconderyGroup }) => ({
    primary: { id: primaryGroup.mgr_id },
    secondary: seconderyGroup.map((group) => ({ id: group.mgr_id })),
  }))(data),
)

const formatSeconderyGroups = computed(() =>
  data.seconderyGroup.map((group) => group.mgr_name).join(', '),
)
</script>

<template>
  <div class="body-container">
    <div class="body-section">
      <ArticleContainer class="type-article">
        <template #body>
          <p>
            <span class="title">tip vežbe:</span>
            <span class="value">{{ data.type }}</span>
          </p>
        </template>
      </ArticleContainer>
      <ArticleContainer>
        <template #header>
          <h2>opis:</h2>
        </template>
        <template #body>
          <p class="desc" v-for="(part, index) of formatExerciseText" :key="index">{{ part }}</p>
        </template>
      </ArticleContainer>
      <ArticleContainer v-if="data.videoUrl" class="video-article">
        <template #body>
          <iframe :src="data.videoUrl" frameborder="0"></iframe>
        </template>
      </ArticleContainer>
      <ArticleContainer>
        <template #header>
          <h2>ostalo:</h2>
        </template>
        <template #body>
          <div class="other-options-container">
            <CheckOption title="koristi tegove" :value="data.useWeight" />
            <CheckOption title="vežba je challenge" :value="data.isChallenge" />
            <CheckOption title="izvodi se jednostrano" :value="data.isUnilateral" />
            <CheckOption title="koristi više tegova" :value="data.isUseMultiple_weights" />
            <CheckOption title="vežba je specijalna" :value="data.isSpecial" />
          </div>
        </template>
      </ArticleContainer>
    </div>
    <div class="body-section side-section">
      <div class="muscle-group-container">
        <MuscleGroupsExercise :activeMuscleGroups />
      </div>
      <div class="muscle-group-label-container">
        <table>
          <tr>
            <td class="main-group title">glavna grupa:</td>
            <td>{{ data.primaryGroup.mgr_name }}</td>
          </tr>
          <tr v-if="data.seconderyGroup.length > 0">
            <td class="secondery-group title">pod grupe:</td>
            <td>{{ formatSeconderyGroups }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style>
.type-article.article-container {
  .article-body {
    margin-left: 0;
  }
}
</style>
<style scoped>
iframe {
  width: 100%;
  aspect-ratio: 16/9;
}

.body-container {
  display: flex;
  flex-direction: column;
  gap: 50px;
  .body-section {
    flex: 1;
    gap: 20px;
    &.side-section {
      flex: 0 40%;
    }
    h2 {
      color: var(--blue-700);
      font-size: 1.1rem;
      &::first-letter {
        text-transform: capitalize;
      }
    }
    p {
      margin-top: 5px;
    }
    .video-article {
      max-width: 450px;
      margin-inline: auto;
      margin-bottom: 20px;
    }
    .other-options-container {
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px 30px;
    }
    .type-article {
      p {
        span {
          display: inline-block;
          &::first-letter {
            text-transform: capitalize;
          }
          &.title {
            color: var(--blue-700);
            font-size: 1.1rem;
            font-weight: 700;
            margin-right: 5px;
          }
        }
      }
    }
    .muscle-group-container {
      max-width: 90%;
      margin: auto;
    }
    table {
      margin: 10px auto;
      td {
        &.title {
          &.main-group {
            color: var(--blue-600);
          }
          &.secondery-group {
            color: var(--blue-500);
          }
        }
        &::first-letter {
          text-transform: capitalize;
        }
        padding-inline: 5px;
      }
    }
  }
}

@media screen and (min-width: 601px) {
  .body-container {
    .body-section {
      .muscle-group-container {
        width: 70%;
      }
      .video-article {
        max-width: 400px;
        margin-inline: auto;
      }
    }
  }
}

@media screen and (min-width: 1025px) {
  .body-container {
    .body-section {
      .muscle-group-container {
        width: 50%;
      }
      .video-article {
        max-width: 450px;
        margin-inline: initial;
      }
    }
  }
}
@media screen and (min-width: 1281px) {
  .body-container {
    gap: 40px;
    flex-direction: row;
  }
}
</style>
