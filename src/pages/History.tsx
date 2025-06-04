// src/pages/History.tsx

const HistoryPage = () => {
  return (
    <div className="px-40 flex flex-1 bg-[#1b2427] justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight">
              Historial
            </p>
            <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Revisar capturas de análisis de emociones pasadas
            </p>
          </div>
        </div>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-2">
            <p className="text-white text-sm font-medium leading-normal">
              Tipo
            </p>
            <div
              className="text-white"
              data-icon="CaretDown"
              data-size="20px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </div>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-2">
            <p className="text-white text-sm font-medium leading-normal">
              Emoción Dominante
            </p>
            <div
              className="text-white"
              data-icon="CaretDown"
              data-size="20px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQl_cSRHQIQLI0sf-yq7UQLIXasTIOPF83shuIshX9x-O9X0pJKgOYxkZ7Kmlla88shu4q1VFxtGTw1XjtOE1H0m7FTM9eYWdHoR6q3Xvx8BKRDMm6JIEGol1kybHfvEc0OLPM3yS-zvgdauORv096XTskky7oiRaTYq0XsObVxUHKksIfSyubkG_ThJQCP9vVt1W09hB2dTzhzexe7uDP9h8o8x5QL55g6OrfnXUJGgsdQNr96lZyn8jtLN5F4I2Ac3rdaYXPun8")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 1
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Image - Happy
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmqJW7KHtLRTRFipR28EDhBKuU1ulT2VRRNEAnDawnFy6ekc2E4v6d5SSbYjfCinxtg-F2SS2FQbCtk0U-u5kguWcuE_gi00zFxSM8nIJ4l6_v3CKB_tr1AxzS4ClwPYgyezTyKHhB4d5KTivkt5htQg55LEEH9FC0CdLt9yqTH9MJQxYpS4-aFZBf2tmR1bFZey0hUXNZJlgy623zeAmRKgV0S1Xt1ejBKxB2cSv9ZcTwlA1QF-ur4u2EUu1nnJ5JfARPJfeDyb4")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 2
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Video - Sad
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7s3fjk-MI0jw2S4mK6gXjlrUAklnk37_3OJSmPu7UZNMtV5LJRKMEV-TQqziYX-EP3cTY-eTdXECUV_rrhtOADV12762-6NJsRb2jEpcvlWssUTan_fMoDpJKvJI_oCJapbnHhJRIxC3D7pVRUBHViA9raA6B-1f0YYqwrcYOW11oEBCIZ_8Wbrkko1gyqqjFP3u3O1p2IsQIJYCNFe5zA_yThMzo3kDOlLxrqxeRm77umeiINhJRsKcIHx2depD20JR1an0ZvGQ")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 3
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Image - Neutral
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCiqw_C0qnAVV70kLK5apTjzqPsWJRBmDkthegx7291vAX-QdMOjzPkbk9Y0yE9bfigS5jFMHGUOOC2XAV4RPZlFZBz4SYK9fO2M1Nrk_hxlNudl-KUgfnzE-hzunGTMyuiM0w9c1cASgrzEIUtismaZyCKrzblsp08vB5l4IdjwdOzgo3mBoxDC8XLUVuKyF6Kxln07KPSrMohuEk6AcvG_0m5FWxL57isbfHGKN9At_K-REaO945A-RUEd2zJHPhcoPA5TzDPVNQ")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 4
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Video - Angry
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKUSKF4ySfKkWf_PSdOWpUJnMOUkrKXhOudZ-JgP8niZmuVM_H90VstdNwZaLzuYqW8o44W3uItNM7t-NnBKeRGOQ6RnhUZHc1-kcKuu83IT5EwVlZvFSt9xVcH_JJn7SF10MlmW1CaU1LIKKFR8VqTWFgV51aqqcPSMb58Jg0jEBHOBWsT7mMQsZCO7XvUTvcaLEYj4Y1jzd8RfiDc_pp4OkBwY_WYcvxBBzZe3UVywCIJFeQTYjiGODqXgN2jnffpdNYK8gTNFs")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 5
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Image - Surprised
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDVdqzbfTRm0jub8p2-JKUmMfdJO5CfITlPkiGlBbncee8ZGjfanaXwHSvCsdyHg6jRiJ-h8O4QAixu3KHkMiXxdFyEoXYccag3Bb9XWtxKB7ZGauRf2tFRvtJLJ_5deVl8FyAjVc1b3lUoiLbUnk0uivPzHETUgR-xOp9ZdftZhAVucdAR4EMj4-jPUFlVcjG8VNWz5-vPjS-PAR47zg5uNtE2ps7EcunbqaVWO9ew-lxu0yM_0oZEyhdzneFGNnVOUgVivoI4dlY")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 6
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Video - Fearful
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGuoQPg76mSTFMCWSjoaU2xKXQPmUW5Ct0S5pEnBBSaZfu3KTq2f1wFAxd-sJRjjR3Tu3Sf3LTlOxndsT86WU8KGVkGKh_sTDmMMUAw361IaXw4-ss7KAWDJDPX5mXncmTv5k_KEm5x0thyBDRwxyVYznzhLO9wz1kjCENoTAv7TFfe9BL97aSk3hgHdY-LNAdckGfME-con9juo4tDxxucMs_pZauZY7X_H5fA5CIflGRDO00YBdVAAc1Irg9YEgK_UTMUV3RMq8")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 7
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Image - Disgusted
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC92RKDq0wTWNDRkgxQ8IE-kJ0DXHELizOXZVMBajgX_2x2lJ11vN2QI8dfu-zcLptnoPVyexaXXBSLM84Q3K2OdZKAKQhN1f6If6M8OrGD87h64rlkJgdigvj8H9t_BOlPL7aw4bNTv4QrpoIurKvm7bQcYiQgpgNB_rABMxBxMZ6UEeUkeXmn3D8jN4AdDcbrG3SvQWrt095HDvSGFHpWi-d6zcFEpEuCSzsmC_oD8ddpwKvlstSfPPgEkAZZtiHbfo6iIFk31aI")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 8
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Video - Happy
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuRrWOmmIJLlyDI07QYVX30Z2rIrRz2ysjR1a4Lmot-GzRmi_15LppX5FuX7ZUZ6mC-smBm56RTvw4Jy3RfiFXSajLfWfH1ftw9SMk6V1XxTiFQGUzHXywTtGMtvjER06dRE8zslorZyNRAwO15H9HjE1_bQol-2_Krm80Dvf50npHIz7fdZpJv7Lqd1hbwCU-28gLHBDIRHPFM1DkLzYP-lZ9TobLo73MKqknUC385WxhnrQ_khc7Evk7jqC0HW8eIxfh11QkPCk")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 9
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Image - Sad
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHOIJ9TqFF7MUovOO_M748EgywS3nANpUrkDMv6cT-GnwcurJI89qQHUNIkdhjK_ngxJMpA4JXHIUtmXkd4EGahAU2evdxoUz0RVWhQSUWPfA0JDhWWNcUAhhqTsuBTwLvjym-cV2nB-t4lIfnUYatbhuxXcs9VXGtEMMx_prJsW3srJ6eo4_07HuV_ivrmIWXWHoBYJzRBNjBdcpYVVdyt1MQuDsYkefYPTrSMwsO8_eod2s19eusH2F21TfzdAb3xPq_DzlZZUE")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 10
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Video - Neutral
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSwkwlh6nI1fq_DNh1J1CXkGrhiooD3SLECevlhaHCYXK52M0BC-tHqhCsrT-BYYZUpqn2R7qlc78IsYiAUTjHSAWnXjmLXcJyUOJp2PWjb3TquLK3TY3VS9zwODzPcPWMN2Iq4sQ2qthV8mis4ULfdtGFRnD7llIoFVqEyYuVpfkHzQWlETN1DY40S1CNrAgmYJKmWgzJ7RmmJBusAUTG0BzPG0kRmbgxKe9iFqgXIOHuVS70K5YOJpG_siM64pgqSbMBwspsDyc")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 11
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Image - Angry
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgxIqKvv4ou3zRYpUM3KFv03VDBbfqNCWaqRa4Zqcxvs3QCclcuOu4P2oXnjR9S10N1g96_CckhXhSD10gbWZ1wzfG3Grtvs5q0W1VEz2yhOldkb1-5HIdR6qLX5eX2mWH-EaW68h4xM0t0u5-FofTScbmcQKZ038qzWADYtrXmhxpiJTBv6LV9oeK6gGabHxwDvvTMvqG9dK9ezTXtD_8NGAfCWhxWOzXryJtcSANZrUB3J0RC8eEydpxmZLZM-38z6GaLTmMHNc")',
              }}
            ></div>
            <div>
              <p className="text-white text-base font-medium leading-normal">
                Captura 12
              </p>
              <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                Video - Surprised
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-4">
          <a href="#" className="flex size-10 items-center justify-center">
            <div
              className="text-white"
              data-icon="CaretLeft"
              data-size="18px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
              </svg>
            </div>
          </a>
          <a
            className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-[#264532]"
            href="#"
          >
            1
          </a>
          <a
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
            href="#"
          >
            2
          </a>
          <a
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
            href="#"
          >
            3
          </a>
          <a
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
            href="#"
          >
            4
          </a>
          <a
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
            href="#"
          >
            5
          </a>
          <a href="#" className="flex size-10 items-center justify-center">
            <div
              className="text-white"
              data-icon="CaretRight"
              data-size="18px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
