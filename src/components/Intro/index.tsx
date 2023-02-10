import React from "react";
import VideoPlayer from "./VideoPlayer";

const PageIntro = () => {
  return (
    <div className="w-full h-full max-h-screen md:mb-12 lg:mb-20 pl-5 relative sm:shadow-[0px_-12px_50px_0px] sm:shadow-secondary-900 ">
      {/* <div className="h-full flex flex-col justify-center"> */}
      {/* <h2 className="pt-5 text-2xl text-center text-text md:mb-5 tracking-wider leading-10 md:text-start md:text-3xl md:font-semibold mb-5">
          Intro
        </h2> */}
      <div className="w-[50%] h-full pb-5 pt-12 pr-5 flex flex-col justify-center my-auto">
        {/* <p>
          Trust<span className="text-secondary-600 leading-10">ME</span> is a
          decentralized platform that allows users to trade assets with each
          other in a secure and transparent manner. The platform is built on
          Ethereum and uses smart contracts to facilitate the exchange of
          assets.
        </p> */}
        <div className="text-[7.5vw] text-center font-extralight">
          <span className="text-primary-600 pr-1 font-semibold block">
            Trust
            <span className="text-secondary-600">ME</span>.
          </span>
          <span className="text-secondary-600 pr-1 text-[5vw]">
            It&apos;s Easy.{" "}
          </span>
          <span className="text-text-light pr-1 text-[5vw]"> Secure. </span>{" "}
          <span className="text-purplish-600 pr-1 text-[5vw]">Efficient.</span>
        </div>
      </div>
      {/* </div> */}
      <VideoPlayer />
    </div>
  );
};

export default PageIntro;
