// src/pages/RealTime.tsx
import { useState } from "react";
import CameraComponent from "../components/CameraComponent";
import ResultsDisplay from "../components/ResultsDisplay";
import useEmotionDetection from "../hooks/useEmotionDetection";

const RealTimePage = () => {

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Real-time Emotion Analysis</p>
            </div>
            <div className="p-4">
              <div
                className="relative flex items-center justify-center bg-[#38e07b] bg-cover bg-center aspect-video rounded-lg p-4"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6-F7nTIKMLgar0Vtxv6XhkBY65LyjfuyzJMdXZbw9z2TfAxVbtEIo34a8thOkMn03bZQBIl8BdePA9E_FLRBAKEzNkZ9Bh_oN7RLHqFR6B_RFJpVcz79iJ7RO7_dp5iTipi8seyLEWTxbuk4RNv7x862Ub0ELR39wU11YA_0iUYP2GAOWNFOckR0cGJzhvbXlMbNcdczJslnBbcu57Lcm2tT7_t6hxV-xCUWe8ag4zUOVOo6tybfraHKYQMLl07549t-ujNxmD7w");'}}
              >
                <button className="flex shrink-0 items-center justify-center rounded-full size-16 bg-black/40 text-white">
                  <div className="text-inherit" data-icon="Play" data-size="24px" data-weight="fill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#38e07b] text-[#122118] text-sm font-bold leading-normal tracking-[0.015em] grow"
                >
                  <span className="truncate">Start Stream</span>
                </button>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#264532] text-white text-sm font-bold leading-normal tracking-[0.015em] grow"
                >
                  <span className="truncate">Capture Frame</span>
                </button>
              </div>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Emotion Distribution</h2>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#366348] p-6">
                <p className="text-white text-base font-medium leading-normal">Current Emotion</p>
                <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
                  <div className="border-[#96c5a9] bg-[#264532] border-t-2 w-full" style={{height: '100%;'}}></div>
                  <p className="text-[#96c5a9] text-[13px] font-bold leading-normal tracking-[0.015em]">Happy</p>
                  <div className="border-[#96c5a9] bg-[#264532] border-t-2 w-full" style={{height: '80%;'}}></div>
                  <p className="text-[#96c5a9] text-[13px] font-bold leading-normal tracking-[0.015em]">Sad</p>
                  <div className="border-[#96c5a9] bg-[#264532] border-t-2 w-full" style={{height: '40%;'}}></div>
                  <p className="text-[#96c5a9] text-[13px] font-bold leading-normal tracking-[0.015em]">Angry</p>
                  <div className="border-[#96c5a9] bg-[#264532] border-t-2 w-full" style={{height: '40%;'}}></div>
                  <p className="text-[#96c5a9] text-[13px] font-bold leading-normal tracking-[0.015em]">Neutral</p>
                  <div className="border-[#96c5a9] bg-[#264532] border-t-2 w-full" style={{height: '20%;'}}></div>
                  <p className="text-[#96c5a9] text-[13px] font-bold leading-normal tracking-[0.015em]">Surprised</p>
                </div>
              </div>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Key Metrics</h2>
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#366348]">
                <p className="text-white text-base font-medium leading-normal">Dominant Emotion</p>
                <p className="text-white tracking-light text-2xl font-bold leading-tight">Happy</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#366348]">
                <p className="text-white text-base font-medium leading-normal">Average Confidence</p>
                <p className="text-white tracking-light text-2xl font-bold leading-tight">85%</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#366348]">
                <p className="text-white text-base font-medium leading-normal">Total Frames Processed</p>
                <p className="text-white tracking-light text-2xl font-bold leading-tight">1200</p>
              </div>
            </div>
          </div>
        </div>
  );
};

export default RealTimePage;
