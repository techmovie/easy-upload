import i18nConfig from '@/i18n.json';

export type SupportedLanguage = 'en' | 'zh' | 'ko'

export type TranslationKey<L extends SupportedLanguage> = keyof typeof i18nConfig[L];

export interface RequestOptions<T = unknown> {
  method?: 'GET' | 'POST'
  responseType?: 'json' | 'blob' | 'arraybuffer'
  headers?: Tampermonkey.RequestHeaders
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  timeout?: number,
  anonymous?: boolean,
  onprogress?: (progressEvent: Tampermonkey.ProgressResponse<T>) => void;
}
