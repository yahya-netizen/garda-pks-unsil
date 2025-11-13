export const kuisServices = {
    getModules: () => ({url: '/modul-kuis', method: 'GET'}),
    getQuestions: (moduleId: string, quizNumber: number) => ({url: `/kuis/moduleId=${moduleId}/quizNumber=${quizNumber}`, method: 'GET'}),
    // submitAnswers: (moduleId: string, answers: any) => ({url: `/submit-kuis/${moduleId}`, method: 'POST', data: answers})
}