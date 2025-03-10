import { $t, urlToFile, GMFetch } from '@/common/utils';
import { CONFIG } from './image.config';
import { UrlTransformStrategy } from './image.types';
export class ImageUploadError extends Error {
  constructor (message: string, public readonly originalError?: unknown) {
    super(message);
    this.name = 'ImageUploadError';
  }
}

export const throwUploadError = (message?: string, originalError?: unknown): never => {
  const errorMessage = message || $t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED);
  throw new ImageUploadError(errorMessage, originalError);
};

export const createFormData = <T extends Record<string, unknown>>(fields: T, files?: {fieldName: string, file: File | File[]}[]): FormData => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  if (files) {
    files.forEach(({ fieldName, file }) => {
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

const urlFileCache = new Map<string, Promise<File>>();

export const cachedUrlToFile = async (url: string): Promise<File> => {
  if (!urlFileCache.has(url)) {
    urlFileCache.set(url, urlToFile(url));
  }
  return urlFileCache.get(url)!;
};

class HdBitsStrategy implements UrlTransformStrategy {
  matches (url: string): boolean {
    return url.includes('img.hdbits.org');
  }

  async transform (url: string): Promise<string> {
    const data = await GMFetch<string>(url, { responseType: undefined });
    const doc = new DOMParser().parseFromString(data, 'text/html');
    const imgElem = doc.querySelector('#viewimage');
    return imgElem ? imgElem.getAttribute('src') || '' : '';
  }
}

class PterClubStrategy implements UrlTransformStrategy {
  matches (url: string): boolean {
    return url.includes('img.pterclub.com');
  }

  async transform (url: string): Promise<string> {
    const imgUrl = url.match(/img\](([^[])+)/)?.[1] ?? '';
    return imgUrl.replace(/\.th/g, '');
  }
}

class ImageBoxStrategy implements UrlTransformStrategy {
  matches (url: string): boolean {
    return url.includes('imgbox.com');
  }

  async transform (url: string): Promise<string> {
    const imgUrl = url.match(/img\](([^[])+)/)?.[1] ?? '';
    return imgUrl
      .replace(/thumbs(\d)/, 'images$1')
      .replace(/_t(\.png)/, '_o.png');
  }
}

class ImageBamStrategy implements UrlTransformStrategy {
  matches (url: string): boolean {
    return url.includes('imagebam.com');
  }

  async transform (url: string): Promise<string> {
    const originalPage = await GMFetch<string>(url, { responseType: undefined });
    const doc = new DOMParser().parseFromString(originalPage, 'text/html');
    const imgElem = doc.querySelector('.main-image');
    return imgElem ? imgElem.getAttribute('src') || '' : '';
  }
}

class BeyondHdStrategy implements UrlTransformStrategy {
  matches (url: string): boolean {
    return url.includes('beyondhd.co');
  }

  async transform (url: string): Promise<string> {
    const imgUrl = url.match(/img\](([^[])+)/)?.[1] ?? '';
    return imgUrl.replace(/\.(th|md)\.(png|jpg|gif)/, '.$2');
  }
}

class PixHostStrategy implements UrlTransformStrategy {
  matches (url: string): boolean {
    return url.includes('pixhost.to');
  }

  async transform (url: string): Promise<string> {
    const hostNumber = url.match(/img\]https:\/\/t(\d+)\./)?.[1];
    return url.replace(
      /(pixhost\.to)\/show/,
      `img${hostNumber}.$1/images`,
    );
  }
}

export const URLStrategies: UrlTransformStrategy[] = [
  new HdBitsStrategy(),
  new PterClubStrategy(),
  new ImageBoxStrategy(),
  new ImageBamStrategy(),
  new BeyondHdStrategy(),
  new PixHostStrategy(),
];

/**
 * Base image upload handler with error handling and validation
 *
 * @template P - Types of parameters for the upload function
 * @template R - Type of results returned by the upload function
 * @param {((...args: P) => Promise<R>)} uploadFn - Actual upload implementation
 * @param {string} serviceName - Name of upload service for error context
 * @param {object} options - Additional options
 * @param {boolean} options.validateFirstArg - Whether to validate the first argument (default: true)
 * @param {R} options.defaultResult - Default result to return on error
 * @returns {(...args: P) => Promise<R>} Wrapped function with error handling
 */
export const withUploadErrorHandling = async<P extends unknown[], R>(
  uploadFn: (...args: P) => Promise<R>,
  serviceName: string,
  options: {
    validateFirstArg?: boolean;
    defaultResult?: R;
  } = {},
): Promise<(...args: P) => Promise<R>> => {
  const { validateFirstArg = true, defaultResult = ([] as unknown as R) } = options;

  return async (...args: P): Promise<R> => {
    try {
      if (validateFirstArg) {
        const firstArg = args[0];
        if (firstArg === undefined || firstArg === null ||
            (Array.isArray(firstArg) && firstArg.length === 0)) {
          return defaultResult;
        }
      }

      return await uploadFn(...args);
    } catch (error) {
      if (error instanceof ImageUploadError) {
        throw error;
      }
      const errorMessage = (error instanceof Error) ? `${error.name}: ${error.message}` : 'Unknown error';
      throwUploadError(`${$t(CONFIG.ERROR_MESSAGES.UPLOAD_FAILED)} - ${serviceName}. ${errorMessage}`, error);

      return defaultResult;
    }
  };
};
