export const newsServices = {
    getNews: (take: number, skip: number) => ({url: `/news/${take}/${skip}`, method: 'GET'}),
    getNewsBySlug: (slug: string) => ({url: `/berita/${slug}`, method: 'GET'}),
}