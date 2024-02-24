import { Track } from '../app/types';

//get track duration
export const duration = (track: Track) => {
  const trackDuration = Math.round(track.duration as number);
  var minutes = Math.floor(trackDuration / 60);
  var seconds = trackDuration % 60;
  return `${minutes}:${seconds}`;
};
