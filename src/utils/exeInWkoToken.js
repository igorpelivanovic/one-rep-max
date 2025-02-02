import { exercises, usedWeights } from '@/data/storageKeys'

function getExercises() {
  return localStorage.getItem(exercises)
}

function setExercises(exeArr = []) {
  localStorage.setItem(exercises, exeArr.toString())
  return
}

function removeExercises() {
  CURR_EXE_ID = ''
  localStorage.removeItem(exercises)
  return
}

let CURR_EXE_ID = ''
function currExerciseId(id = null) {
  if (id != null) {
    CURR_EXE_ID = id
  }
  return CURR_EXE_ID
}

function nextExercise() {
  const nextExeStartIndex =
    getExercises().indexOf(CURR_EXE_ID) + CURR_EXE_ID.length + (CURR_EXE_ID.length ? 1 : 0)
  const nextExeEndIndex =
    getExercises().indexOf(',', nextExeStartIndex) != -1
      ? getExercises().indexOf(',', nextExeStartIndex)
      : getExercises().length
  currExerciseId(getExercises().slice(nextExeStartIndex, nextExeEndIndex))
}

function getUsedWeights() {
  return localStorage.getItem(usedWeights)
}

function setUsedWeights(value = []) {
  localStorage.setItem(usedWeights, JSON.stringify(value))
  return
}

function removeUsedWeights() {
  localStorage.removeItem(usedWeights)
  return
}

function addUsedWeightForExe(id, weight) {
  const tokenValue = getUsedWeights()
  if (!tokenValue) {
    setUsedWeights()
  }
  let usedWeightsArr = JSON.parse(getUsedWeights())
  const alreadyExists = JSON.parse(getUsedWeights()).find(({ exeId }) => exeId === +id)
  if (alreadyExists) {
    usedWeightsArr[usedWeightsArr.findIndex(({ exeId }) => exeId === +id)].weight = +weight
  } else {
    usedWeightsArr.push({ exeId: +id, weight: +weight })
  }
  setUsedWeights(usedWeightsArr)
}

function getUsedWeightByExeId(id) {
  if (getUsedWeights()) {
    const found = JSON.parse(getUsedWeights()).find(({ exeId }) => exeId === +id)
    if (!found) {
      return null
    }
    return found.weight
  }
  return null
}

export {
  getExercises,
  setExercises,
  removeExercises,
  currExerciseId,
  nextExercise,
  getUsedWeights,
  setUsedWeights,
  removeUsedWeights,
  addUsedWeightForExe,
  getUsedWeightByExeId,
}
