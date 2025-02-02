import planAxios from '../axios/personal_plan'

export default {
  getActivePlan: () => planAxios.get('/personal_plan'),
  createPlan: (params) => planAxios.post('/personal_plan', params),
  changePlanState: (params) => planAxios.patch('/personal_plan', params),
  getWeeklyPlan: (params) => planAxios.get('/weekly_plan', { params }),
  checkActiveWeek: (params) => planAxios.patch('/weekly_plan', params),
  getWorkout: (params) => planAxios.get('/workout', { params }),
  swapExerciseRequest: (params) => planAxios.get('/workout/swap_exercise', { params }),
  swapExercise: (params) => planAxios.put('/workout/swap_exercise', params),
  getExerciseInWorkout: (params) => planAxios.get('/workout/exercise', { params }),
  setWorkoutStats: (params) => planAxios.patch('/workout/stats', params),
  finishWorkout: (params) => planAxios.patch('/workout', params),
  getChallenge: () => planAxios.get('/challenge'),
  addChallenge: () => planAxios.patch('/challenge'),
  getUserPlanParams: () => planAxios.get('/user_plan_params'),
  changeUserPlanParams: (params) => planAxios.put('/user_plan_params', params),
  getUserOrmParams: () => planAxios.get('/user_orm_params'),
  setUserOrmParams: (params) => planAxios.post('/user_orm_params', params),
  deactivateUserOrmParams: () => planAxios.patch('/user_orm_params'),
}
