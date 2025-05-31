// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import EmotionChart from '../components/EmotionChart';
import EmotionStats from '../components/EmotionStats';
import { getEmotionHistory } from '../services/emotionService';
import type { EmotionHistory } from '../interfaces/types';

const DashboardPage = () => {
     
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Real-time Emotion Analysis</p>
            </div>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Upload an image to analyze the emotions of the people in it. Our advanced AI will detect faces and provide an emotional score for each person.
            </p>
            <div className="flex flex-col p-4">
              <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#366348] px-6 py-14">
                <div className="flex max-w-[480px] flex-col items-center gap-2">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Drag and drop an image here</p>
                  <p className="text-white text-sm font-normal leading-normal max-w-[480px] text-center">Or</p>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#264532] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Browse Files</span>
                </button>
              </div>
            </div>
            <div className="flex px-4 py-3 justify-center">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#38e07b] text-[#122118] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Analyze</span>
              </button>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Results</h2>
            <div className="flex w-full grow bg-[#122118] @container p-4">
              <div className="w-full gap-1 overflow-hidden bg-[#122118] @[480px]:gap-2 aspect-[3/2] rounded-lg flex">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnvrkV80AVidNmLuClJJLl58pv3RRpqq5pP-FwAosFhyHzpAokGY1ooc1wSdZiyaEglpZBqULc1yxvC99rMwUKwGIV70_wVJodgwIk2vI0HPKDq2dpsSTJjLkQvaoPexoJGW_4qi3aD0p1ExOzfs4QCBMR3PuaWvf3Doj6j5zT2ugZgxOZh8PNlsbTZ5YmefmEaVe8WDDKmS6wcgQngTaq51z50BQMoFe_z84hPAO6ZSkU3KVBuNeUs91V-II7X4g8T12qkb2sYBk");'}}
                ></div>
              </div>
            </div>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#366348] bg-[#122118]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#1b3124]">
                      <th className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-56 px-4 py-3 text-left text-white w-14 text-sm font-medium leading-normal">Face</th>
                      <th className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-176 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Emotion</th>
                      <th className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-296 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#366348]">
                      <td className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-56 h-[72px] px-4 py-2 w-14 text-sm font-normal leading-normal">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
                          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuACpqGhK3DFCAP7D9itzYPvomodxtGxziwpT2FzPf8ZY96qLQtOZDLW_QpMfFRaL8dKKFIquF2ChGDsKa1b5GdPmGL6oP-XAwiuDXUBXy2tDWdyKCmGJkmqFEgyauPfCA9yRmSiXTj5UAL6zzPpgSSetjKKd5irnK7_F55X64xA0i_LEy7q-YgxL6chEIBMG7B_BzKn6CDk2MhhKZjR2cfqEfZzC51neSbjgb7-hgtnbZ3IKbAXrETgDnuSERVcJXMZAKaexh4h3Fs");'}}
                        ></div>
                      </td>
                      <td className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-176 h-[72px] px-4 py-2 w-[400px] text-[#96c5a9] text-sm font-normal leading-normal">
                        Happiness
                      </td>
                      <td className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-296 h-[72px] px-4 py-2 w-[400px] text-[#96c5a9] text-sm font-normal leading-normal">0.95</td>
                    </tr>
                    <tr className="border-t border-t-[#366348]">
                      <td className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-56 h-[72px] px-4 py-2 w-14 text-sm font-normal leading-normal">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
                          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDufknFzruQ5-6hx-EAmOGpzARlPrY2MNd35Cr-Uu1YiaMNQI90aJ4ZHN4h6VnMpXIISljPn3CXN9tf5gxODzmr2ZPzBi7RlWofKqhHTWULYc9buMekX8gOsFG8xICZxLEr005JU2KX8FNiOy5oNS-SccVsWWcz2H-WpfwRDeAs1vw803dwIdrhn76N9XsDKAwF0-nEiV-HN_kYyqujTEiH2tjvUDeFbSAaIKAYS0r1jpTt5N3JuLJH_0RJfJ5Ejml1iEXOfKcc1fc");'}}
                        ></div>
                      </td>
                      <td className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-176 h-[72px] px-4 py-2 w-[400px] text-[#96c5a9] text-sm font-normal leading-normal">Neutral</td>
                      <td className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-296 h-[72px] px-4 py-2 w-[400px] text-[#96c5a9] text-sm font-normal leading-normal">0.88</td>
                    </tr>
                    <tr className="border-t border-t-[#366348]">
                      <td className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-56 h-[72px] px-4 py-2 w-14 text-sm font-normal leading-normal">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
                          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtpqq_BtJ7jNOMvspl6kz7xAsCI9BD-KNSk0LAx-rgHsplUW5g8Ob8DM7ySLS8z1filHLYYfZFIVATOE79a28NK_qm4COPMklZlcEYV0RhDzuwIxYItJMaSG0IE_7-9k5SX6qW-FRt6V9e04xYk9oLh80WivRIGnL6ycKB5ZlgHhw_a5xHIVNc9vOgWn9pkOhj3FUWkNb__djtiITPmBw7nRWQn8jjqVt1RLLOZ2eSAKvetLg_J6hRwq4u_AS0lEM2IYs1CCNdMdc");'}}
                        ></div>
                      </td>
                      <td className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-176 h-[72px] px-4 py-2 w-[400px] text-[#96c5a9] text-sm font-normal leading-normal">Surprise</td>
                      <td className="table-d7209287-1848-4a8b-9ada-0456c6c66db1-column-296 h-[72px] px-4 py-2 w-[400px] text-[#96c5a9] text-sm font-normal leading-normal">0.75</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

  );
};

export default DashboardPage;