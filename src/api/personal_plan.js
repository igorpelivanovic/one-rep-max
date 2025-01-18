import planAxios from '../axios/personal_plan'

export default {
  getActivePlan: () => planAxios.get('/personal_plan'),
  createPlan: (params) => planAxios.post('/personal_plan', params),
  changePlanState: (params) => planAxios.patch('/personal_plan', params),
  getWeeklyPlan: (params) => planAxios.get('weekly_plan', params),
  checkActiveWeek: (params) => planAxios.patch('/weekly_plan', params),
}
