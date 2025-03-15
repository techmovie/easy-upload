import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';
import {
  getLocationSearchValueByKey,
  convertSizeStringToBytes,
  $t,
  GMFetch,
  htmlToBBCode,
  createFormData,
} from '@/common/utils';
import * as constants from '@/const';
import type { SiteName } from '@/const';
import { NetworkError, TimeoutError, HTMLToBBCodeConverter } from '../utils.helpers';

vi.mock(import('@/const'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    BROWSER_LANGUAGE: 'en',
    CURRENT_SITE_INFO: {
      ...actual.CURRENT_SITE_INFO,
      siteType: 'siteName',
    },
    CURRENT_SITE_NAME: 'siteName' as SiteName,
  };
});

vi.mock('@/i18n.json', () => {
  return {
    default: {
      en: {
        hello: 'Hello',
        welcome: 'Welcome',
      },
      zh: {
        hello: '你好',
        welcome: '欢迎',
      },
    },
  };
});

describe('utils function', () => {
  describe('getLocationSearchValueByKey', () => {
    const originalLocation = window.location;
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          search: '',
        },
      });
    });
    afterEach(() => {
      Object.defineProperty(window, 'location', {
        value: originalLocation,
      });
    });
    it('should return the value of the URL parameter by its key', () => {
      window.location.search = '?key=value&foo=bar';
      expect(getLocationSearchValueByKey('key')).toBe('value');
      expect(getLocationSearchValueByKey('foo')).toBe('bar');
    });
    it('should return the value of the URL parameter by its key even if it contains special characters', () => {
      window.location.search = '?query=hello%20world&redirect=https%3A%2F%2Fexample.com';
      expect(getLocationSearchValueByKey('query')).toBe('hello world');
      expect(getLocationSearchValueByKey('redirect')).toBe('https://example.com');
    });
    it('should return an empty string if the key is not found', () => {
      window.location.search = '?key=value';
      expect(getLocationSearchValueByKey('notFound')).toBe('');
    });
    it("should return an empty string if the key's value is empty", () => {
      window.location.search = '?key=';
      expect(getLocationSearchValueByKey('key')).toBe('');
    });
    it('should return an empty string if the search is empty', () => {
      window.location.search = '';
      expect(getLocationSearchValueByKey('key')).toBe('');
    });
    it('should return correct value when the key is being part of another key', () => {
      window.location.search = '?name=John&username=Jane';

      expect(getLocationSearchValueByKey('name')).toBe('John');
      expect(getLocationSearchValueByKey('username')).toBe('Jane');
    });
  });

  describe('convertSizeStringToBytes', () => {
    it('should convert size string to bytes', () => {
      expect(convertSizeStringToBytes('10K')).toBe(10 * 1024);
      expect(convertSizeStringToBytes('5M')).toBe(5 * 1024 * 1024);
      expect(convertSizeStringToBytes('2G')).toBe(2 * 1024 * 1024 * 1024);
      expect(convertSizeStringToBytes('1T')).toBe(1 * 1024 * 1024 * 1024 * 1024);
    });
    it('should return 0 if the input string is empty', () => {
      expect(convertSizeStringToBytes('')).toBe(0);
    });
    it('should return 0 if the input string is invalid', () => {
      expect(convertSizeStringToBytes('invalid')).toBe(0);
    });
    it('should return 0 if the input string is not suffixed with K, M, G, or T', () => {
      expect(convertSizeStringToBytes('10')).toBe(0);
    });
    it('should return 0 if the input string is not a number', () => {
      expect(convertSizeStringToBytes('invalidK')).toBe(0);
      expect(convertSizeStringToBytes('K20')).toBe(0);
    });
    it('spaces should make no difference ', () => {
      expect(convertSizeStringToBytes('  10K  ')).toBe(10 * 1024);
    });
  });

  describe('$t', () => {
    it('should return the translation of the given key in the current browser language', () => {
      vi.mocked(constants, { partial: true }).BROWSER_LANGUAGE = 'zh';
      expect($t('hello')).toBe('你好');
      expect($t('welcome')).toBe('欢迎');
      vi.mocked(constants, { partial: true }).BROWSER_LANGUAGE = 'en';
      expect($t('hello')).toBe('Hello');
      expect($t('welcome')).toBe('Welcome');
    });
    it('should return the key if the translation is not found', () => {
      vi.mocked(constants, { partial: true }).BROWSER_LANGUAGE = 'en';
      expect($t('not_found')).toBe('not_found');
      expect($t('你好')).toBe('你好');
    });
    it("should return the key if the translation is not found in the current browser language's translations", () => {
      vi.mocked(constants, { partial: true }).BROWSER_LANGUAGE = 'jp';
      expect($t('hello')).toBe('hello');
    });
    it('should return the key if BROWSER_LANGUAGE is empty', () => {
      vi.mocked(constants, { partial: true }).BROWSER_LANGUAGE = '';
      expect($t('hello')).toBe('hello');
      expect($t('你好')).toBe('你好');
    });
  });
  describe('GMFetch', () => {
    beforeEach(() => {
      vi.stubGlobal('GM_xmlhttpRequest', vi.fn());
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it('should return valid json data when responseType is json', async () => {
      const mockResponseText = '{"foo": "bar"}';
      const gmXHR = vi.fn((request) => {
        request.onload({
          status: 200,
          statusText: 'OK',
          response: undefined,
          responseText: mockResponseText,
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      const result = await GMFetch('http://example.com', { responseType: 'json' });
      expect(result).toEqual({ foo: 'bar' });
      expect(gmXHR).toHaveBeenCalled();
    });
    it('should return valid text data when responseType is undefined', async () => {
      const mockResponseText = 'plain text response';
      const gmXHR = vi.fn((request) => {
        request.onload({
          status: 200,
          statusText: 'OK',
          response: mockResponseText,
          responseText: '',
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      const result = await GMFetch('http://example.com');
      expect(result).toBe(mockResponseText);
      expect(gmXHR).toHaveBeenCalled();
    });
    it('should reject the promise when the status code is not in the range of 200-299', async () => {
      const gmXHR = vi.fn((request) => {
        request.onload({
          status: 404,
          statusText: 'Not Found',
          response: undefined,
          responseText: '',
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      try {
        await GMFetch('http://example.com');
        expect.fail('The promise should be rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as Error).message).toBe('Not Found');
        expect(gmXHR).toHaveBeenCalled();
      }
    });
    it('should reject the promise when returned response is not valid json', async () => {
      const gmXHR = vi.fn((request) => {
        request.onload({
          status: 200,
          statusText: 'OK',
          response: undefined,
          responseText: 'invalid json',
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      try {
        await GMFetch('http://example.com', { responseType: 'json' });
        expect.fail('The promise should be rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('Failed to parse JSON');
        expect(gmXHR).toHaveBeenCalled();
      }
    });
    it('should reject the promise when an error occurs while parsing json and the error instance is not Error', async () => {
      const gmXHR = vi.fn((request) => {
        request.onload({
          status: 200,
          statusText: 'OK',
          response: undefined,
          responseText: 'invalid json',
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      vi.spyOn(JSON, 'parse').mockImplementation(() => {
        // eslint-disable-next-line no-throw-literal
        throw 'Invalid JSON';
      });
      try {
        await GMFetch('http://example.com', { responseType: 'json' });
        expect.fail('The promise should be rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('Invalid JSON');
        expect(gmXHR).toHaveBeenCalled();
      }
    });
    it('should reject the promise when the request times out', async () => {
      const gmXHR = vi.fn((request) => {
        request.ontimeout();
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      try {
        await GMFetch('http://example.com');
        expect.fail('The promise should be rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(TimeoutError);
        expect((error as Error).message).toContain('timed out');
        expect(gmXHR).toHaveBeenCalled();
      }
    });
    it('should reject the promise when an error occurs', async () => {
      const gmXHR = vi.fn((request) => {
        request.onerror({
          error: 'Network error',
          status: 500,
          statusText: 'Internal Server Error',
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      try {
        await GMFetch('http://example.com');
        expect.fail('The promise should be rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as Error).message).toBe('Network error');
        expect(gmXHR).toHaveBeenCalled();
      }
    });
    it('should reject the promise when an error occurs and error object does not have error property', async () => {
      const gmXHR = vi.fn((request) => {
        request.onerror({
          status: 500,
          statusText: 'Internal Server Error',
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      try {
        await GMFetch('http://example.com');
        expect.fail('The promise should be rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as Error).message).toBe('Internal Server Error');
        expect(gmXHR).toHaveBeenCalled();
      }
    });
    it('should reject the promise when an error occurs and error object does not have statusText property', async () => {
      const gmXHR = vi.fn((request) => {
        request.onerror({
          error: 'Network error',
          status: 500,
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      try {
        await GMFetch('http://example.com');
        expect.fail('The promise should be rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as Error).message).toBe('Network error');
        expect(error as NetworkError).toHaveProperty('status', 500);
        expect(gmXHR).toHaveBeenCalled();
      }
    });
    it('should reject the promise when error occurs in response ', async () => {
      const gmXHR = vi.fn((request) => {
        request.onload({
          status: 500,
          statusText: 'Internal Server Error',
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      try {
        await GMFetch('http://example.com');
        expect.fail('The promise should be rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as NetworkError).message).toBe('Internal Server Error');
        expect(gmXHR).toHaveBeenCalled();
      }
    });
    it('should reject the promise when error occurs in response and there is no statusText property ', async () => {
      const gmXHR = vi.fn((request) => {
        request.onload({
          status: 500,
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      try {
        await GMFetch('http://example.com');
        expect.fail('The promise should be rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as NetworkError).message).toBe('Request failed with status 500');
        expect(gmXHR).toHaveBeenCalled();
      }
    });

    it('should reject the promise when an error occurs and error object is empty', async () => {
      const gmXHR = vi.fn((request) => {
        request.onerror({});
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      try {
        await GMFetch('http://example.com');
        expect.fail('The promise should be rejected');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as Error).message).toBe('Unknown network error');
        expect(gmXHR).toHaveBeenCalled();
      }
    });
    it('should handle onprogress when options.onprogress in defined', async () => {
      const onprogress = vi.fn();
      const gmXHR = vi.fn((request) => {
        request.onprogress();
        request.onload({
          status: 200,
          statusText: 'OK',
          response: undefined,
          responseText: 'upload complete',
        });
      });
      vi.stubGlobal('GM_xmlhttpRequest', gmXHR);
      await GMFetch('http://example.com', { onprogress });
      expect(onprogress).toHaveBeenCalled();
    });
  });
  describe('htmlToBBCode', () => {
    it('should convert html to bbcode', () => {
      const html = '<div style="font-weight:600;">Hello World</div>';
      const container = document.createElement('div');
      container.innerHTML = html;
      const bbcode = '\n\n[b]Hello World[/b]\n\n';
      const convertSpy = vi
        .spyOn(HTMLToBBCodeConverter.prototype, 'convert')
        .mockReturnValue(bbcode);
      const result = htmlToBBCode(container);
      expect(convertSpy).toHaveBeenCalledWith(container);
      expect(result).toBe(bbcode);

      convertSpy.mockRestore();
    });
  });
});

describe('createFormData', () => {
  it('should create FormData object from object', () => {
    const formData = createFormData({ key1: 'value1', key2: 'value2' });
    expect(formData instanceof FormData).toBe(true);
    expect(formData.get('key1')).toBe('value1');
    expect(formData.get('key2')).toBe('value2');
  });
  it('should handle empty object', () => {
    const formData = createFormData({});
    expect(formData instanceof FormData).toBe(true);
    expect(formData.get('key1')).toBeNull();
  });
  it("should handle FormData's append method", () => {
    const formData = createFormData({});
    formData.append('key1', 'value1');
    expect(formData.get('key1')).toBe('value1');
  });
  it('should handle multiple values for the same key', () => {
    const formData = createFormData({ key1: ['value1', 'value2'] });
    expect(formData.get('key1')).toBe('value1,value2');
  });
  it('should handle File objects', () => {
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    const formData = createFormData({ key1: 'value1' }, [{
      fieldName: 'file',
      file,
    }]);
    expect(formData.get('file')).toBe(file);
    expect(formData.get('key1')).toBe('value1');
  });
  it('should handle multiple File objects', () => {
    const file1 = new File(['file content'], 'file1.txt', { type: 'text/plain' });
    const file2 = new File(['file content'], 'file2.txt', { type: 'text/plain' });
    const formData = createFormData({ key1: 'value1' }, [{ fieldName: 'file', file: [file1, file2] }]);
    expect(formData.get('file[0]')).toBe(file1);
    expect(formData.get('file[1]')).toBe(file2);
  });

  it('should throw error when filedName includes brackets', () => {
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    expect(() => createFormData({ key1: 'value1' }, [{ fieldName: 'file[0]', file }])).toThrow('FieldName should not include []');
    expect(() => createFormData({ key1: 'value1' }, [{ fieldName: 'file[]', file }])).toThrow('FieldName should not include []');
  });

  it('should throw error when File is passed from object', () => {
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    expect(() => createFormData({ file, key1: 'value1' })).toThrow('Files should be passed as a separate argument');
  });
});
