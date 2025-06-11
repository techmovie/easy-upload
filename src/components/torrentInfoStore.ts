class TorrentInfoStore {
  private info: TorrentInfo.Info;
  private listeners: Set<(info: TorrentInfo.Info) => void> = new Set();

  constructor() {
    const cached = GM_getValue<TorrentInfo.Info>('cachedTorrentInfo');
    this.info = cached;
  }

  getInfo(): TorrentInfo.Info {
    return this.info;
  }

  setInfo(info: TorrentInfo.Info) {
    if (info && info.title) {
      this.info = info;
      GM_setValue('cachedTorrentInfo', info);
      this.listeners.forEach((listener) => listener(info));
    }
  }

  updateInfo(
    updater:
      | Partial<TorrentInfo.Info>
      | ((info: TorrentInfo.Info) => TorrentInfo.Info),
  ) {
    if (!this.info) return;

    const newInfo =
      typeof updater === 'function'
        ? updater(this.info)
        : { ...this.info, ...updater };

    this.setInfo(newInfo);
  }

  subscribe(listener: (info: TorrentInfo.Info) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const torrentInfoStore = new TorrentInfoStore();
