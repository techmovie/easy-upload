import { CONFIG } from './media.config';
/**
 * get bd type based on size e.g BD25, BD50
 *
 * @param {number} size
 * @returns {string}
 */
export const getBDTypeBasedOnSize = (size: number) => {
  const GBSize = size / 1e9;

  const DISK_TYPES = [
    { maxSize: 5, type: 'DVD5' },
    { maxSize: 9, type: 'DVD9' },
    { maxSize: 25, type: 'BD25' },
    { maxSize: 50, type: 'BD50' },
    { maxSize: 66, type: 'BD66' },
    { maxSize: 100, type: 'BD100' },
  ];

  for (const { maxSize, type } of DISK_TYPES) {
    if (GBSize < maxSize) {
      return type;
    }
  }

  return 'Unknown';
};

/**
 * get audio codec from given source
 *
 * @param {string} source
 * @returns {string}
 */
export const getAudioCodecFromSource = (source:string) => {
  if (!source) {
    return '';
  }
  const formattedSource = source.replace(/:|-|\s|\./g, '');
  const { CODEC_RULES } = CONFIG;
  for (const { codec, regex } of CODEC_RULES) {
    if (regex.test(formattedSource)) {
      return codec;
    }
  }
  return '';
};
