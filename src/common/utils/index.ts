import { BROWSER_LANGUAGE, CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';
import i18nConfig from '@/i18n.json';
import { SupportedLanguage, TranslationKey, RequestOptions } from '@/common/utils/utils.types';
import { HTMLToBBCodeConverter, TimeoutError, NetworkError } from './utils.helpers';

export * from './utils.types';

/**
 * Retrieves the value of a URL parameter by its key.
 *
 * @param {string} key - The key of the URL parameter to retrieve.
 * @returns The value of the URL parameter if found, otherwise an empty string.
 */
export const getLocationSearchValueByKey = (key:string) => {
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  const regArray = window.location.search.substring(1).match(reg);
  if (regArray) {
    return decodeURIComponent(regArray[2]);
  }
  return '';
};

/**
 * Converts a size string (e.g., "10K", "5M", "2G", "1T") to its equivalent size in Bytes.
 *
 * @param {string} size - The size string to convert. It can be suffixed with 'K', 'M', 'G', or 'T' to indicate kilobytes, megabytes, gigabytes, or terabytes respectively.
 * @returns The size in bytes. Returns 0 if the input string is empty or invalid.
 */
export const convertSizeStringToBytes = (size: string) => {
  if (!size) {
    return 0;
  }
  const sizeFloat = parseFloat(size);
  if (isNaN(sizeFloat)) {
    return 0;
  }
  if (size.match(/bytes/)) {
    return sizeFloat;
  } else if (size.match(/T/i)) {
    return (sizeFloat * 1024 ** 4);
  } else if (size.match(/G/i)) {
    return (sizeFloat * 1024 ** 3);
  } else if (size.match(/M/i)) {
    return (sizeFloat * 1024 ** 2);
  } else if (size.match(/K/i)) {
    return (sizeFloat * 1024);
  }
  return sizeFloat;
};

/**
 * Returns the translation of the given key in the current browser language.
 *
 * @param {string} key
 * @returns {*} The translation of the given key
 */
export const $t = <L extends SupportedLanguage> (key: string) => {
  const languageKey = BROWSER_LANGUAGE as L;
  const translations = i18nConfig[languageKey];
  if (!translations) {
    return key;
  }
  return key in translations
    ? translations[key as TranslationKey<L>]
    : key;
};

/**
 * Convert HTML to BBCode
 *
 * @param {Element} node
 * @returns {string}
 */
export const htmlToBBCode = (node: Element): string => {
  const converter = new HTMLToBBCodeConverter({
    siteType: CURRENT_SITE_INFO.siteType,
    siteName: CURRENT_SITE_NAME,
  });

  return converter.convert(node);
};

/**
 * Create a FormData object from a given object.
 *
 * @template T
 * @param {T} fields
 * @param {{ fieldName: string; file: File | File[] }[]} [files]
 * @returns {FormData}
 */
export const createFormData = <T extends Record<string, unknown>>(
  fields: T,
  files?: { fieldName: string; file: File | File[] }[],
): FormData => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value instanceof File) {
      throw new Error('Files should be passed as a separate argument');
    }
    formData.append(key, String(value));
  });

  if (files) {
    files.forEach(({ fieldName, file }) => {
      if (fieldName.match(/\[.*\]/)) {
        throw new Error('FieldName should not include []');
      }
      if (Array.isArray(file)) {
        file.forEach((f, index) => {
          formData.append(`${fieldName}[${index}]`, f);
        });
      } else {
        formData.append(fieldName, file);
      }
    });
  }

  return formData;
};

/**
 *
 * @template T type of return data
 * @param {string} url
 * @param {RequestOptions} [options] RequestOptions
 * @returns {Promise<T>} returned promise
 */
export const GMFetch = <T = unknown>(
  url: string,
  options?: RequestOptions,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const finalOptions: RequestOptions = {
      method: 'GET',
      ...options,
    };

    GM_xmlhttpRequest({
      url,
      ...finalOptions,
      onload: (res) => {
        const { statusText, status, response, responseText } = res;
        if (status >= 200 && status < 300) {
          if (finalOptions.responseType === 'json' && typeof response === 'undefined' && responseText) {
            try {
              resolve(JSON.parse(responseText) as T);
            } catch (e) {
              reject(new Error(`Failed to parse JSON: ${e instanceof Error ? e.message : String(e)}`));
            }
          } else {
            resolve(response);
          }
        } else {
          reject(new NetworkError(
            statusText || `Request failed with status ${status}`,
            status,
          ));
        }
      },
      ontimeout: () => {
        reject(new TimeoutError(`Request to ${url} timed out after ${finalOptions.timeout}ms`));
      },
      onprogress: finalOptions?.onprogress,
      onerror: (error) => {
        const errorMessage = error.error || error.statusText || 'Unknown network error';
        reject(new NetworkError(
          errorMessage,
          error.status,
          error.statusText,
        ));
      },
    });
  });
};
