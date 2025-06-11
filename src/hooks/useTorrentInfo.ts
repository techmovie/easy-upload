import { useState, useEffect } from 'preact/hooks';
import { torrentInfoStore } from '@/components/torrentInfoStore';

export const useTorrentInfo = () => {
  const [torrentInfo, setTorrentInfo] = useState<TorrentInfo.Info>(() =>
    torrentInfoStore.getInfo(),
  );

  useEffect(() => {
    const unsubscribe = torrentInfoStore.subscribe(setTorrentInfo);
    return unsubscribe;
  }, []);

  const updateTorrentInfo = (
    updater:
      | Partial<TorrentInfo.Info>
      | ((info: TorrentInfo.Info) => TorrentInfo.Info),
  ) => {
    torrentInfoStore.updateInfo(updater);
  };

  return {
    torrentInfo,
    updateTorrentInfo,
    setTorrentInfo: (info: TorrentInfo.Info) => torrentInfoStore.setInfo(info),
  };
};
