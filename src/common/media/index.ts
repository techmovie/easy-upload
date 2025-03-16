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
