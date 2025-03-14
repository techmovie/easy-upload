export const CONFIG = {
  URLS: {
    TMDB_API: 'https://api.themoviedb.org',
    DOUBAN_SEARCH_API: 'https://omit.mkrobot.org/movie/infos',
    DOUBAN_SUGGEST_API: (query: string) =>
      `https://www.douban.com/search?cat=1002&q=${query}`,
    DOUBAN_SUBJECT: (id: string) =>
      `https://movie.douban.com/subject/${id}/`,
    IMDB_URL: (id: string) => `https://www.imdb.com/title/${id}/`,
    DOUBAN_MOBILE_API: 'https://m.douban.com/rexxar/api/v2',
    PT_GEN_API: (url: string) => `https://media.pttool.workers.dev?url=${url}`,
    DOUBAN_AWARDS: (id: string) =>
      `https://movie.douban.com/subject/${id}/awards/`,
    IMDB_RATING_API: (id: string) =>
      `https://p.media-imdb.com/static-content/documents/v1/title/${id}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json`,
  },
  KEY: {
    TMDB_API_KEY: '4a06eb7286be2d481fdb30e0a6b4ad77',
  },
};
