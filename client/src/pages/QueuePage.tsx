import React from 'react';
import PlaylistTracks from '../components/Playlist/PlaylistTrackList';
import { useAppSelector } from '../app/hooks';
import { Track } from '../app/types';

const QueuePage = () => {
  const currentSong = useAppSelector((state) => state.player.currentSong);
  const queue = useAppSelector((state) => state.player.queue);
  const playerQueue = useAppSelector((state) => state.player.playerQueue);
  return (
    <div className="px-9 pt-20 text-linkwater">
      <h2 className="text-2xl font-bold">Queue</h2>
      <p className="my-4 text-lg font-semibold opacity-50">Now playing</p>

      {/* {playerQueue.length > 1 && playerQueue.length != queue + 1 && (
        <p className="my-4 text-lg font-semibold opacity-50">Next in queue</p>
      )}
      {playerQueue.slice(queue + 1).map((track, index) => )} */}
    </div>
  );
};

export default QueuePage;
