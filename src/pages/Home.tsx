// src/pages/RealTime.tsx
import { useState } from "react";
import CameraComponent from "../components/CameraComponent";
import ResultsDisplay from "../components/ResultsDisplay";
import useEmotionDetection from "../hooks/useEmotionDetection";

const RealTimePage = () => {


  return (
    
    <div className="relative flex size-full min-h-screen flex-col bg-[#122118] dark group/design-root overflow-x-hidden" style={{fontFamily: '"Space Grotesk", "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="pb-3">
              <div className="flex border-b border-[#366348] px-4 gap-8">
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#38e07b] text-white pb-[13px] pt-4" href="#">
                  <p className="text-white text-sm font-bold leading-normal tracking-[0.015em]">Live Camera</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#96c5a9] pb-[13px] pt-4" href="#">
                  <p className="text-[#96c5a9] text-sm font-bold leading-normal tracking-[0.015em]">Upload Image</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#96c5a9] pb-[13px] pt-4" href="#">
                  <p className="text-[#96c5a9] text-sm font-bold leading-normal tracking-[0.015em]">History</p>
                </a>
              </div>
            </div>
            <div className="p-4">
              <div
                className="relative flex items-center justify-center bg-[#38e07b] bg-cover bg-center aspect-video rounded-lg p-4"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAuGYCcfiA1jcmwxl6N3JOvQoCACbL_hLmjLANPavEut-bB8mGh85E7X7OQhxbIJb3pfYszxxno23awGxyTuTgmnzz900QaSupgbfIAzJ3mgD_70X-fnHmCaFh9R3lss_jtoLhKyh1rC4db3mj7849pqL9F9oRqJkSxnff4m1f-4i2GGkwWq_-xrAwEsy5_43eBJ6A4GA33CBxvKoEMb66gBuZl0XWu_DdHPNL3m3teLdDM_F305IFnVCbv-CEWFubO9WBeCNW4sxA")',}}
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
          </div>
        </div>
      </div>
    </div>

  );
};

export default RealTimePage;
