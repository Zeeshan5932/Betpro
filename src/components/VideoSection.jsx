import { useState, useRef } from "react";

export default function VideoSection() {
  const videoRef = useRef(null);

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-[416px] mx-auto">
        {/* Title */}
        <h3 className="text-center text-2xl font-semibold text-gray-900 mb-6">
          How to activate Betpro{" "}
          <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded text-sm ml-2 align-middle">
            🆔
          </span>
        </h3>

        {/* Video Container */}
        <div className="relative w-full rounded-lg overflow-hidden bg-black shadow-lg">
          <video
            ref={videoRef}
            controls
            className="w-full h-auto max-h-[400px] rounded-lg"
        
          >
            <source
              src="/images/Betpro ID _ Simple Deposit Method - BetproWallet.pk.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>


      </div>
    </div>
  );
}