import './video-player.scss';

import ReactPlayer from 'react-player';

interface IVideoPlayer {
  url?: string;
  classes?: string;
}

/**
 * VideoPlayer
 *
 * Video player component
 */
export function VideoPlayer({ url, classes }: IVideoPlayer) {
  return (
    <div className={['video-player', classes].join(' ')}>
      <div className="video-player__player">
        <ReactPlayer width="100%" height="100%" url={url} />
      </div>
    </div>
  );
}

export default VideoPlayer;
