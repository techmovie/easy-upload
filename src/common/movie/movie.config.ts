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
    ROTTEN_TOMATOES_API: 'https://79frdp12pn-1.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.24.0)%3B%20Browser%20(lite)&x-algolia-api-key=175588f6e5f8319b27702e4cc4013561&x-algolia-application-id=79FRDP12PN',
  },
  KEY: {
    TMDB_API_KEY: '4a06eb7286be2d481fdb30e0a6b4ad77',
  },
  REGION_PATTERNS: {
    US: /USA|US|Canada|CA|美国|加拿大|United States/i,
    EU: /欧|英|法|德|俄|意|苏联|EU/i,
    JP: /Japan|日本|JP/i,
    KR: /Korea|韩国|KR/i,
    TW: /Taiwan|台湾|TW/i,
    HK: /Hong\s?Kong|香港|HK/i,
    CN: /CN|China|大陆|中|内地|Mainland/i,
  },
};
