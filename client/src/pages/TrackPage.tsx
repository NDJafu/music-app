import { useParams } from 'react-router-dom';
import { duration } from '../utils/utils';
import { useGetTrackQuery } from '../features/track/trackApiSlice';
import { DynamicBackground } from '../components/ui/DynamicBackground';
import TrackOptions from '../components/Track/TrackOptions';

const TrackPage = () => {
  const { id } = useParams();
  const { data: track, isLoading } = useGetTrackQuery(id!);
  // fetching track
  const publicDate = new Date(track?.publicDate as Date);
  const year = publicDate.getFullYear();

  if (!isLoading && track)
    return (
      <div className="w-full text-linkwater">
        <DynamicBackground
          image={track.image}
          topOpacity={0}
          bottomOpacity={0.5}
          className="relative h-88 px-9"
        >
          <div className="absolute bottom-9 flex items-end gap-4">
            <div className="relative">
              <img
                src={track.image}
                alt="avatar"
                className="h-60 w-60 object-cover shadow-lg shadow-black/50"
              />
            </div>
            <div className="flex flex-col gap-2 font-bold">
              <p className="text-sm">Song</p>
              <h1 className="text-6xl">{track?.title}</h1>
              <p className="mt-10 text-sm">
                {track.artist} &#8226;{' '}
                <span className="font-normal">
                  {track.title} &#8226; {year} &#8226; {duration(track)}
                </span>
              </p>
            </div>
          </div>
        </DynamicBackground>
        <div className="relative">
          <DynamicBackground
            image={track.image}
            topOpacity={0.6}
            bottomOpacity={1}
            className="absolute h-56 w-full opacity-50"
          />
          <div className="relative px-9 py-4">
            <TrackOptions {...track} />
            <h2 className="my-4 text-2xl font-bold">Lyrics</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: track?.lyrics?.replace(/\n/g, '<br/>') as string,
              }}
              className="text-linkwater/50"
            />
            quite obvious since this shit ain't free
          </div>
        </div>
      </div>
    );
};

export default TrackPage;
