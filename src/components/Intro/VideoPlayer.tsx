import React, { useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const videoRef = React.useRef<React.MutableRefObject<null>>(null);
  // useEffect(() => {
  //   videoRef.current.seekTo(0);
  // }, []);
  return (
    <div className="w-full h-[500px] z-50 transition duration-300 text-right">
      <div className="absolute top-0 right-0 z-50  w-[50%] h-full">
        <ReactPlayer
          url="https://youtu.be/X0JGvYOian4"
          config={{
            youtube: {
              playerVars: { showinfo: 0 },
            },
          }}
          info={false}
          width="100%"
          height="100%"
          controls={false}
          loop={false}
          autoplay
          // ref={videoRef}
        />
      </div>
      {/* 
      <video controls className="w-full">
        <source src="/public/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
    </div>
  );
};

export default VideoPlayer;
