export const kuisServices = {
    getModules: () => ({url: '/modul-kuis', method: 'GET'}),
    getQuestions: (moduleId: string) => ({url: `/soal-kuis/${moduleId}`, method: 'GET'}),
    // submitAnswers: (moduleId: string, answers: any) => ({url: `/submit-kuis/${moduleId}`, method: 'POST', data: answers})
}