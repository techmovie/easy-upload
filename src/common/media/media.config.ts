export const CONFIG = {
  CODEC_RULES: [
    { codec: 'atmos', regex: /atmos/i },
    { codec: 'dtshdma', regex: /dtshdma|DTSHD Master/i },
    { codec: 'dtsx', regex: /dtsx/i },
    { codec: 'dts', regex: /dts/i },
    { codec: 'truehd', regex: /truehd/i },
    { codec: 'lpcm', regex: /lpcm/i },
    { codec: 'flac', regex: /flac/i },
    { codec: 'aac', regex: /aac/i },
    { codec: 'dd+', regex: /DD\+|DDP|DolbyDigitalPlus/i },
    { codec: 'dd', regex: /DD|DolbyDigital/i },
    { codec: 'ac3', regex: /ac3/i },
  ],
};
