<template>
  <div class="w-full flex flex-col justify-start items-start gap-10">
    <!-- 카카오톡 로그인 섹션 -->
    <div class="w-full flex flex-col justify-center items-center gap-3.5">
      <button
        class="w-full h-12 bg-amber-300 rounded-lg flex justify-center items-center gap-4 cursor-pointer"
        @click="handleKakaoLogin"
      >
        <svg
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 21.5L5.90625 17.3913C5.25 17 0.75 14.75 0.75 10.087C0.75 2.05217 7.3125 0.5 12.4688 0.5C12.4688 0.5 23.25 0.5 23.25 10.087C23.25 16.25 15.75 18.7609 10.5938 18.7609L4.5 21.5Z"
            fill="#503F33"
          />
        </svg>
        <div
          class="text-center text-gray-700 text-sm font-bold font-['Noto_Sans'] leading-none"
        >
          카카오톡 로그인
        </div>
      </button>
      <div
        class="text-center text-gray-700 text-xs font-normal font-['Noto_Sans'] leading-none"
      >
        본 서스티컵은 제로퀘스트와 같은<br />카카오톡 로그인 시 리워드가
        적립됩니다.
      </div>
    </div>

    <!-- 참여 방법 섹션 -->
    <div class="w-full flex flex-col justify-start items-start gap-2">
      <div
        class="w-full text-gray-700 text-base font-bold font-['Noto_Sans'] leading-normal"
      >
        참여 방법
      </div>
      <div class="w-full flex flex-col justify-start items-start gap-3">
        <!-- 1단계: NFC 터치 -->
        <div
          class="w-full p-3 relative rounded-xl border border-gray-200 flex justify-start items-center gap-4"
        >
          <div
            class="w-16 h-16 relative bg-gray-100 rounded-md overflow-hidden"
          >
            <div class="absolute left-[15.48px] top-[6.19px]">
              <svg
                width="35"
                height="54"
                viewBox="0 0 35 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9692 12.7599H16.0195C15.7772 12.7599 15.5808 12.9552 15.5808 13.1961C15.5808 13.4369 15.7772 13.6322 16.0195 13.6322H20.9692C21.2115 13.6322 21.4079 13.4369 21.4079 13.1961C21.4079 12.9552 21.2115 12.7599 20.9692 12.7599Z"
                  fill="#39383D"
                />
                <path
                  d="M26.2698 10.9844H11.1627C9.88854 10.9844 8.85561 12.0174 8.85561 13.2915V44.4296C8.85561 45.7038 9.88854 46.7367 11.1627 46.7367H26.2698C27.544 46.7367 28.5769 45.7038 28.5769 44.4296V13.2915C28.5769 12.0174 27.544 10.9844 26.2698 10.9844Z"
                  stroke="#39383D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M0.742073 48.0993C0.742073 48.0993 1.97562 46.3599 2.63111 44.2335C2.87885 43.4283 2.87369 42.5664 2.61562 41.7664C2.0582 40.0322 1.18078 35.5264 2.46594 26.267C2.96143 22.6851 5.14981 20.3315 5.98594 18.7109C8.09175 14.6386 9.24272 15.5522 9.24272 15.5522C9.24272 15.5522 13.3666 18.9844 8.31369 26.0244"
                  fill="#F6F6F6"
                />
                <path
                  d="M0.742073 48.0993C0.742073 48.0993 1.97562 46.3599 2.63111 44.2335C2.87885 43.4283 2.87369 42.5664 2.61562 41.7664C2.0582 40.0322 1.18078 35.5264 2.46594 26.267C2.96143 22.6851 5.14981 20.3315 5.98594 18.7109C8.09175 14.6386 9.24272 15.5522 9.24272 15.5522C9.24272 15.5522 13.3666 18.9844 8.31369 26.0244"
                  stroke="#39383D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.5769 17.7405L30.4505 16.285C31.3537 15.5882 32.6595 15.8308 33.2427 16.8114C33.7279 17.6218 33.5421 18.6643 32.8092 19.2579L28.5718 22.6901"
                  stroke="#39383D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.8092 26.7731H13.9911L15.5343 29.2299V26.7731H16.7266V31.217H15.5343L14.0014 28.7757V31.217H12.8143V26.7731H12.8092Z"
                  fill="#39383D"
                />
                <path
                  d="M17.5731 26.7731H20.7008V27.728H18.8428V28.5022H20.4273V29.4002H18.8428V31.217H17.5731V26.7731Z"
                  fill="#39383D"
                />
                <path
                  d="M24.1021 29.3949L25.2118 29.7562C25.1395 30.0917 25.0208 30.3756 24.8608 30.6027C24.7008 30.8298 24.5047 31.0001 24.2672 31.1137C24.0298 31.2272 23.7305 31.284 23.3589 31.284C22.915 31.284 22.5485 31.2117 22.2698 31.0724C21.986 30.933 21.7434 30.6853 21.5421 30.3343C21.3356 29.9833 21.2324 29.5291 21.2324 28.9769C21.2324 28.244 21.4131 27.6762 21.7743 27.284C22.1356 26.8917 22.6466 26.6904 23.3021 26.6904C23.8182 26.6904 24.2208 26.804 24.5201 27.0311C24.8143 27.2582 25.0363 27.604 25.1756 28.0737L24.0608 28.342C24.0195 28.2078 23.9782 28.1098 23.9369 28.0427C23.8647 27.9395 23.7821 27.8569 23.6789 27.8001C23.5756 27.7433 23.4621 27.7175 23.3331 27.7175C23.044 27.7175 22.8272 27.8414 22.6724 28.0943C22.5589 28.2801 22.4969 28.5691 22.4969 28.9717C22.4969 29.462 22.564 29.8027 22.7034 29.9833C22.8427 30.164 23.0337 30.2569 23.2814 30.2569C23.5292 30.2569 23.7047 30.1846 23.8285 30.0349C23.9524 29.8853 24.0401 29.6737 24.0969 29.3949H24.1021Z"
                  fill="#39383D"
                />
                <path
                  d="M21.4131 46.7367L14.8892 52.7186"
                  stroke="#39383D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M31.2068 28.7644C32.0606 28.1117 32.2235 26.8905 31.5708 26.0368C30.9181 25.1831 29.6969 25.0202 28.8432 25.6729L25.7762 28.0177C24.9225 28.6704 24.7596 29.8916 25.4123 30.7453C26.065 31.599 27.2862 31.762 28.1399 31.1093L31.2068 28.7644Z"
                  fill="#F6F6F6"
                  stroke="#39383D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M31.2221 33.8768C32.0758 33.2241 32.2387 32.0029 31.586 31.1492C30.9333 30.2955 29.7121 30.1325 28.8584 30.7852L25.7915 33.1301C24.9377 33.7828 24.7748 35.004 25.4275 35.8577C26.0802 36.7114 27.3014 36.8744 28.1551 36.2216L31.2221 33.8768Z"
                  fill="#F6F6F6"
                  stroke="#39383D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M31.4603 38.6893C32.314 38.0366 32.4769 36.8154 31.8242 35.9617C31.1715 35.108 29.9503 34.945 29.0966 35.5977L26.0297 37.9426C25.176 38.5953 25.013 39.8165 25.6657 40.6702C26.3184 41.5239 27.5396 41.6869 28.3933 41.0341L31.4603 38.6893Z"
                  fill="#F6F6F6"
                  stroke="#39383D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5925 8.1818C16.5925 8.1818 18.4608 5.97277 20.8402 8.1818"
                  stroke="#39383D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.5846 6.27729C14.5846 6.27729 18.2182 1.99342 22.8427 6.27729"
                  stroke="#39383D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.8504 4.20246C12.8504 4.20246 18.0117 -1.99109 24.5769 4.20246"
                  stroke="#39383D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="h-11 flex flex-col justify-between items-start">
            <div class="text-center">
              <span
                class="text-gray-700 text-xs font-normal font-['Noto_Sans'] leading-tight"
                >휴대폰으로
              </span>
              <span
                class="text-gray-700 text-xs font-bold font-['Noto_Sans'] leading-tight"
                >NFC</span
              >
              <span
                class="text-gray-700 text-xs font-normal font-['Noto_Sans'] leading-tight"
                >를 태그해주세요.</span
              >
            </div>
          </div>
          <div
            class="w-4 h-4 p-2 absolute left-2 top-2 bg-gray-800 rounded-full flex flex-col justify-center items-center gap-2"
          >
            <div
              class="text-center text-white text-[10px] font-bold font-['Noto_Sans'] leading-none"
            >
              1
            </div>
          </div>
        </div>

        <!-- 2단계: 카카오톡 로그인 -->
        <div
          class="w-full p-3 relative rounded-xl border border-gray-200 flex justify-start items-center gap-4"
        >
          <div
            class="w-16 h-16 relative bg-gray-100 rounded-md overflow-hidden"
          >
            <div class="absolute left-4 top-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="16" fill="#FFD664" />
                <path
                  d="M11.5 24L12.4375 21.2609C12 21 9 19.5 9 16.3913C9 11.0348 13.375 10 16.8125 10C16.8125 10 24 10 24 16.3913C24 20.5 19 22.1739 15.5625 22.1739L11.5 24Z"
                  fill="#503F33"
                />
              </svg>
            </div>
          </div>
          <div class="h-11 flex flex-col justify-between items-start">
            <div class="text-center">
              <span
                class="text-gray-700 text-xs font-normal font-['Noto_Sans'] leading-tight"
                >카카오톡
              </span>
              <span
                class="text-gray-700 text-xs font-bold font-['Noto_Sans'] leading-tight"
                >로그인</span
              >
              <span
                class="text-gray-700 text-xs font-normal font-['Noto_Sans'] leading-tight"
                >을 진행해주세요.</span
              >
            </div>
          </div>
          <div
            class="w-4 h-4 p-2 absolute left-2 top-2 bg-gray-800 rounded-full flex flex-col justify-center items-center gap-2"
          >
            <div
              class="text-center text-white text-[10px] font-bold font-['Noto_Sans'] leading-none"
            >
              2
            </div>
          </div>
        </div>

        <!-- 3단계: 사용횟수 확인 -->
        <div
          class="w-full p-3 relative rounded-xl border border-gray-200 flex justify-start items-center gap-4"
        >
          <div
            class="w-16 h-16 relative bg-gray-100 rounded-md overflow-hidden"
          >
            <div class="absolute left-2 top-2">
              <svg
                width="54"
                height="54"
                viewBox="0 0 54 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_2033_624)">
                  <path
                    d="M25.4453 5.14541C26.2119 4.08759 27.7881 4.08759 28.5547 5.14541L29.7017 6.72822C30.2907 7.54102 31.4064 7.76295 32.2616 7.23742L33.927 6.21403C35.0401 5.53008 36.4963 6.1333 36.7997 7.40395L37.2537 9.30522C37.4869 10.2816 38.4327 10.9135 39.4239 10.7553L41.3542 10.4471C42.6442 10.2412 43.7588 11.3558 43.5529 12.6458L43.2447 14.5761C43.0865 15.5673 43.7184 16.5131 44.6948 16.7463L46.5961 17.2003C47.8667 17.5037 48.4699 18.9599 47.786 20.073L46.7626 21.7384C46.2371 22.5936 46.459 23.7093 47.2718 24.2983L48.8546 25.4453C49.9124 26.2119 49.9124 27.7881 48.8546 28.5547L47.2718 29.7017C46.459 30.2907 46.2371 31.4064 46.7626 32.2616L47.786 33.927C48.4699 35.0401 47.8667 36.4963 46.5961 36.7997L44.6948 37.2537C43.7184 37.4869 43.0865 38.4327 43.2447 39.4239L43.5529 41.3542C43.7588 42.6442 42.6442 43.7588 41.3542 43.5529L39.4239 43.2447C38.4327 43.0865 37.4869 43.7184 37.2537 44.6948L36.7997 46.5961C36.4963 47.8667 35.0401 48.4699 33.927 47.786L32.2616 46.7626C31.4064 46.2371 30.2907 46.459 29.7017 47.2718L28.5547 48.8546C27.7881 49.9124 26.2119 49.9124 25.4453 48.8546L24.2983 47.2718C23.7093 46.459 22.5936 46.2371 21.7384 46.7626L20.073 47.786C18.9599 48.4699 17.5037 47.8667 17.2003 46.5961L16.7463 44.6948C16.5131 43.7184 15.5673 43.0865 14.5761 43.2447L12.6458 43.5529C11.3558 43.7588 10.2412 42.6442 10.4471 41.3542L10.7553 39.4239C10.9135 38.4327 10.2816 37.4869 9.30522 37.2537L7.40395 36.7997C6.1333 36.4963 5.53008 35.0401 6.21403 33.927L7.23742 32.2616C7.76295 31.4064 7.54102 30.2907 6.72822 29.7017L5.14541 28.5547C4.08759 27.7881 4.08759 26.2119 5.14541 25.4453L6.72822 24.2983C7.54102 23.7093 7.76295 22.5936 7.23742 21.7384L6.21403 20.073C5.53008 18.9599 6.1333 17.5037 7.40395 17.2003L9.30522 16.7463C10.2816 16.5131 10.9135 15.5673 10.7553 14.5761L10.4471 12.6458C10.2412 11.3558 11.3558 10.2412 12.6458 10.4471L14.5761 10.7553C15.5673 10.9135 16.5131 10.2816 16.7463 9.30522L17.2003 7.40395C17.5037 6.1333 18.9599 5.53008 20.073 6.21403L21.7384 7.23742C22.5936 7.76295 23.7093 7.54102 24.2983 6.72822L25.4453 5.14541Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_2033_624"
                    x="0.352043"
                    y="0.352051"
                    width="53.2959"
                    height="53.2959"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2033_624"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2033_624"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div
              class="absolute left-[22.44px] top-[21.20px] text-center text-gray-700 text-lg font-bold font-['Noto_Sans'] leading-tight"
            >
              {{ usageCount }}
            </div>
          </div>
          <div class="h-11 flex flex-col justify-between items-start">
            <div>
              <span
                class="text-gray-700 text-xs font-bold font-['Noto_Sans'] leading-tight"
                >서스티컵 사용횟수</span
              >
              <span
                class="text-gray-700 text-xs font-normal font-['Noto_Sans'] leading-tight"
                >와
              </span>
              <span
                class="text-gray-700 text-xs font-bold font-['Noto_Sans'] leading-tight"
                >탄소감축량</span
              >
              <span
                class="text-gray-700 text-xs font-normal font-['Noto_Sans'] leading-tight"
                >을<br />확인합니다.
              </span>
              <span
                class="text-gray-500 text-xs font-normal font-['Noto_Sans'] leading-none"
                >(제로퀘스트 데이터 연결확인)</span
              >
            </div>
          </div>
          <div
            class="w-4 h-4 p-2 absolute left-2 top-2 bg-gray-800 rounded-full flex flex-col justify-center items-center gap-2"
          >
            <div
              class="text-center text-white text-[10px] font-bold font-['Noto_Sans'] leading-none"
            >
              3
            </div>
          </div>
        </div>

        <!-- 4단계: NFT 리워드 -->
        <div
          class="w-full p-3 relative rounded-xl border border-gray-200 flex justify-start items-center gap-4"
        >
          <div
            class="w-16 h-16 relative bg-gray-100 rounded-md overflow-hidden"
          >
            <div class="absolute left-[18.25px] top-[13px]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0336 0.497976C6.4482 1.52825 3.32536 4.12757 1.71107 7.425C-2.16961 15.3533 2.00054 24.6377 10.4328 26.8436C12.2687 27.324 16.2416 27.2617 17.2216 26.7372C17.7657 26.4462 17.7848 26.3031 17.7848 22.5119V18.5877L22.0306 18.5181L26.2765 18.4485L26.6313 17.3049C27.2077 15.4474 27.1373 11.6455 26.4877 9.54298C24.3451 2.60884 16.9105 -1.4782 10.0336 0.497976ZM25.629 19.6195C24.4167 22.1363 22.1028 24.4217 19.3096 25.8606L17.9118 26.5809L21.9503 26.651C24.1712 26.6896 26.0328 26.6769 26.0867 26.6231C26.1408 26.5692 26.1533 24.7773 26.1146 22.6412C26.0458 18.8424 26.0351 18.7766 25.629 19.6195Z"
                  fill="#13524E"
                />
              </svg>
            </div>
            <div class="absolute left-[13.93px] top-[45.82px]">
              <svg
                width="39"
                height="6"
                viewBox="0 0 39 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2033_635)">
                  <path
                    d="M0.93182 0.889404H4.58554V1.76264L2.46625 4.15603H4.50655V5.10443H0.93182V4.26158L3.06708 1.88339H0.93182V0.889404Z"
                    fill="#13524E"
                  />
                  <path
                    d="M5.22671 0.889404V5.10443H8.38968V4.19361H6.27039V3.41074H7.80482V2.62867H6.28635V1.80022H8.38968V0.889404H5.22671Z"
                    fill="#13524E"
                  />
                  <path
                    d="M27.2919 0.889404V5.10443H30.4557V4.19361H28.3364V3.41074H29.8708V2.62867H28.3524V1.80022H30.4557V0.889404H27.2919Z"
                    fill="#13524E"
                  />
                  <path
                    d="M11.7905 3.44113C11.7905 3.44113 12.5022 3.23002 12.5022 2.14647C12.5022 1.57072 12.04 1.25165 11.6073 1.07972C11.2795 0.949379 10.9249 0.889404 10.5686 0.889404H9.03841V5.10443H10.0981V3.69702H10.5728L11.4905 5.10443H12.693L11.7913 3.44113H11.7905ZM11.3316 2.3272C11.3316 2.62627 11.077 2.86937 10.7619 2.86937H10.1291V1.78583H10.7619C11.0762 1.78583 11.3316 2.02812 11.3316 2.328V2.3272Z"
                    fill="#13524E"
                  />
                  <path
                    d="M15.1123 0.889404C13.8677 0.889404 12.8585 1.8498 12.8585 3.0341C12.8585 4.2184 13.8677 5.1788 15.1123 5.1788C16.3568 5.1788 17.366 4.2184 17.366 3.0341C17.366 1.8498 16.3576 0.889404 15.1123 0.889404ZM15.1123 4.17922C14.4484 4.17922 13.9098 3.66663 13.9098 3.0349C13.9098 2.40317 14.4484 1.89058 15.1123 1.89058C15.7761 1.89058 16.3148 2.40317 16.3148 3.0349C16.3148 3.66663 15.7761 4.17922 15.1123 4.17922Z"
                    fill="#13524E"
                  />
                  <path
                    d="M22.2298 3.03496C22.2298 1.85065 21.2206 0.890259 19.976 0.890259C18.7315 0.890259 17.7223 1.85065 17.7223 3.03496C17.7223 4.03453 18.4408 4.87498 19.4139 5.11248V6.00011H20.5391V5.11248C21.5122 4.87498 22.2306 4.03453 22.2306 3.03496H22.2298ZM19.9752 4.17927C19.3113 4.17927 18.7727 3.66669 18.7727 3.03496C18.7727 2.40322 19.3113 1.89064 19.9752 1.89064C20.6391 1.89064 21.1777 2.40322 21.1777 3.03496C21.1777 3.66669 20.6391 4.17927 19.9752 4.17927Z"
                    fill="#13524E"
                  />
                  <path
                    d="M22.8474 0.889404H23.923V3.53869C23.923 3.93372 24.2592 4.25359 24.6743 4.25359C25.0894 4.25359 25.4255 3.93372 25.4255 3.53869V0.889404H26.4852V3.63545C26.4852 4.48869 25.7583 5.1796 24.8625 5.1796H24.4701C23.5735 5.1796 22.8474 4.48789 22.8474 3.63545V0.889404Z"
                    fill="#13524E"
                  />
                  <path
                    d="M33.5086 2.15048L34.1733 1.47316C34.1733 1.47316 33.6397 0.818237 32.5952 0.818237C31.5507 0.818237 31.0885 1.6195 31.0885 2.0937C31.0885 2.5679 31.6935 3.12127 32.4053 3.29C33.117 3.45873 33.1288 3.74181 33.1288 3.84336C33.1288 3.94492 33.117 4.26079 32.5708 4.26079C32.0246 4.26079 31.5624 3.66264 31.5624 3.66264L30.8624 4.38554C30.8624 4.38554 31.6095 5.1796 32.654 5.1796C33.6985 5.1796 34.2792 4.58865 34.2792 3.67463C34.2792 2.50233 32.1397 2.69425 32.191 1.99214C32.2095 1.74505 32.6557 1.6211 33.0052 1.79063C33.3321 1.94896 33.5078 2.14968 33.5078 2.14968L33.5086 2.15048Z"
                    fill="#13524E"
                  />
                  <path
                    d="M34.6834 0.889404H38.0682V1.89058H36.9606V5.10443H35.7741V1.89058H34.6834V0.889404Z"
                    fill="#13524E"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2033_635">
                    <rect
                      width="37.1364"
                      height="5.18182"
                      fill="white"
                      transform="translate(0.93182 0.818237)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div class="h-16 flex flex-col justify-between items-start">
            <div>
              <span
                class="text-gray-700 text-xs font-normal font-['Noto_Sans'] leading-tight"
                >제로퀘스트
              </span>
              <span
                class="text-gray-700 text-xs font-bold font-['Noto_Sans'] leading-tight"
                >'서스티컵 NFT'</span
              >
              <span
                class="text-gray-700 text-xs font-normal font-['Noto_Sans'] leading-tight"
              >
                페이지에서<br
              /></span>
              <span
                class="text-gray-700 text-xs font-bold font-['Noto_Sans'] leading-tight"
                >리워드</span
              >
              <span
                class="text-gray-700 text-xs font-normal font-['Noto_Sans'] leading-tight"
                >를 확인해보세요!</span
              >
            </div>
          </div>
          <div
            class="w-4 h-4 p-2 absolute left-2 top-2 bg-gray-800 rounded-full flex flex-col justify-center items-center gap-2"
          >
            <div
              class="text-center text-white text-[10px] font-bold font-['Noto_Sans'] leading-none"
            >
              4
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 안내사항 섹션 -->
    <div class="w-full flex flex-col justify-start items-start gap-2">
      <div
        class="w-full text-gray-700 text-base font-bold font-['Noto_Sans'] leading-normal"
      >
        안내사항
      </div>
      <div
        class="w-full p-2 bg-gray-100 rounded-lg flex justify-center items-center gap-2"
      >
        <div class="flex-1">
          <span
            class="text-gray-600 text-xs font-normal font-['Noto_Sans'] leading-none"
            >서스티컵은
          </span>
          <span
            class="text-gray-600 text-xs font-bold font-['Noto_Sans'] leading-none"
            >10회</span
          >
          <span
            class="text-gray-600 text-xs font-normal font-['Noto_Sans'] leading-none"
          >
            이상 태그 시, 리워드가 지급됩니다.<br
          /></span>
          <span
            class="text-red-600 text-xs font-normal font-['Noto_Sans'] leading-none"
            >(※ 9회 이하 이용 시 리워드는 지급되지 않습니다.)<br
          /></span>
          <span
            class="text-gray-600 text-xs font-normal font-['Noto_Sans'] leading-none"
            >서스티컵의 리워드는
          </span>
          <span
            class="text-gray-600 text-xs font-bold font-['Noto_Sans'] leading-none"
            >1일 최대 2회</span
          >
          <span
            class="text-gray-600 text-xs font-normal font-['Noto_Sans'] leading-none"
          >
            지급됩니다.<br />리워드 적립은 제로퀘스트 앱과 서스티컵 NFT 모두
            연결되어야 지급됩니다.</span
          >
        </div>
      </div>
    </div>
  </div>

  <!-- 하단 로고 섹션 -->
  <div class="w-full flex justify-center items-center relative">
    <img
      :src="zqLogoMain"
      alt="ZeroQuest Logo"
      class="h-6 w-auto object-contain"
    />
  </div>
</template>

<script setup lang="ts">
import { useCupStats } from "@/composables/useCupStats";
import zqLogoMain from "@/assets/images/logo/zq_logo_main.png";
import { useRouter } from "vue-router";
import { onMounted, onUnmounted } from "vue";
import { authStorage } from "@/api/auth";

const router = useRouter();
const { usageCount } = useCupStats();

// 서버로부터 로그인 결과를 받기 위한 메시지 리스너
const handleLoginResult = (event: MessageEvent) => {
  // 보안: 올바른 origin인지 확인
  if (event.origin !== "http://localhost:3008") return;

  const { type, data } = event.data;

  if (type === "KAKAO_LOGIN_SUCCESS") {
    // 로그인 성공 처리
    console.log("로그인 성공:", data);

    // 토큰 저장
    if (data.token) {
      localStorage.setItem("auth_token", data.token);
    }

    // 사용자 정보 저장
    if (data.userInfo) {
      localStorage.setItem("user_info", JSON.stringify(data.userInfo));
    }

    // 대시보드로 이동
    router.push("/dashboard");
  } else if (type === "KAKAO_LOGIN_ERROR") {
    // 로그인 실패 처리
    console.error("로그인 실패:", data);
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
  }
};

// 컴포넌트 마운트 시 리스너 등록
onMounted(() => {
  window.addEventListener("message", handleLoginResult);
});

// 컴포넌트 언마운트 시 리스너 제거
onUnmounted(() => {
  window.removeEventListener("message", handleLoginResult);
});

const handleKakaoLogin = () => {
  // 서버의 카카오 로그인 엔드포인트로 직접 이동
  // 서버에서 res.redirect()로 카카오 로그인 페이지로 보내줌
  window.location.href = "http://localhost:3008/auth/kakao/login";
};
</script>

<style scoped>
/* Tailwind CSS 사용으로 별도 스타일 불필요 */
</style>
