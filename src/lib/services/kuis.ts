export const kuisServices = {
    getModules: () => ({url: '/modul-kuis', method: 'GET'}),
    getQuestions: (moduleId: string, quizNumber: number) => ({url: `/kuis/moduleId=${moduleId}/quizNumber=${quizNumber}`, method: 'GET'}),
    submitAnswers: (moduleId: string) => ({url: `/kuis/submit-kuis/moduleId=${moduleId}`, method: 'POST'}),
    getResult: (moduleId: string) => ({url: `/progress/kuis/moduleId=${moduleId}`, method: 'GET'}),
    // submitAnswers: (moduleId: string, answers: any) => ({url: `/submit-kuis/${moduleId}`, method: 'POST', data: answers})
}