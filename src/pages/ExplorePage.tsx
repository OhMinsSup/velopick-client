import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="bg-white w-full border-b py-5 px-4 md:px-5">
      <div className="flex flex-row items-center flex-1 mb-5">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-2 rounded-full bg-gray-200">
          <Link to="/@snappyguy" className="block relative w-full h-full ">
            <img
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1627565932767/FNQ1u6YbV.png?w=500&amp;h=500&amp;fit=crop&amp;crop=entropy&amp;auto=compress"
              data-width="500"
              data-height="500"
              alt="Alex Streza's"
              className="block w-full relative z-20 overflow-hidden rounded-full"
              sizes="40px"
            />
          </Link>
        </div>
        <div className="flex flex-col leading-snug">
          <div className="flex flex-row flex-wrap items-center mb-px">
            <Link
              to="/@snappyguy"
              className="inline-block font-semibold text-gray-800"
            >
              Alex Streza
            </Link>
          </div>
          <Link
            to="https://alexstreza.hashnode.dev/master-github-copilot"
            className="text-sm text-gray-700"
          >
            Aug 3, 2021
          </Link>
        </div>
      </div>
      <div className="flex flex-row flex-wrap flex-grow-0">
        <div className="flex-auto w-full pr-0 xl:w-auto xl:flex-1 xl:pr-5">
          <h1 className="mb-1 text-3xl font-semibold leading-tight tracking-tight text-black">
            <Link
              to="https://tirthaguha.hashnode.dev/micro-frontends-not-a-silver-bullet"
              className="block"
            >
              Micro Frontends: not a silver bullet
            </Link>
          </h1>
          <p className="mb-2 text-base font-medium text-gray-600">
            <Link
              aria-label="Blog url"
              to="https://tirthaguha.hashnode.dev/micro-frontends-not-a-silver-bullet"
              className="flex flex-row items-center"
            >
              <span className="flex-1 truncate">tirthaguha.hashnode.dev</span>
            </Link>
          </p>
          <p className="max-w-full min-w-full mb-2 text-lg leading-snug tracking-tight break-words text-gray-700">
            <Link
              aria-label="Post brief"
              to="https://tirthaguha.hashnode.dev/micro-frontends-not-a-silver-bullet"
              className="block"
            >
              Micro frontends are a great feat of engineering. If you were able
              to move your 3 year old React repository to module-federation
              based micro frontends, it is indeed a great achievement. However,
              I feel there are a few situations, where micr…
            </Link>
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center mt-2 text-xs text-gray-600">
        <Link to="/" className="block p-1 mr-2 rounded-lg hover:bg-gray-100">
          JavaScript
        </Link>
        <Link to="/" className="block p-1 mr-2 rounded-lg hover:bg-gray-100">
          TypeScript
        </Link>
      </div>
      <div className="flex flex-row items-center justify-between pt-4">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center">
            <Link
              to="https://tirthaguha.hashnode.dev/micro-frontends-not-a-silver-bullet"
              aria-label="Total number of likes"
              className="flex flex-row items-center mr-8 font-semibold text-brand-grey-700 dark:text-brand-grey-300"
            >
              <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 512 512">
                <path d="M496.656 285.683C506.583 272.809 512 256 512 235.468c-.001-37.674-32.073-72.571-72.727-72.571h-70.15c8.72-17.368 20.695-38.911 20.695-69.817C389.819 34.672 366.518 0 306.91 0c-29.995 0-41.126 37.918-46.829 67.228-3.407 17.511-6.626 34.052-16.525 43.951C219.986 134.75 184 192 162.382 203.625c-2.189.922-4.986 1.648-8.032 2.223C148.577 197.484 138.931 192 128 192H32c-17.673 0-32 14.327-32 32v256c0 17.673 14.327 32 32 32h96c17.673 0 32-14.327 32-32v-8.74c32.495 0 100.687 40.747 177.455 40.726 5.505.003 37.65.03 41.013 0 59.282.014 92.255-35.887 90.335-89.793 15.127-17.727 22.539-43.337 18.225-67.105 12.456-19.526 15.126-47.07 9.628-69.405zM32 480V224h96v256H32zm424.017-203.648C472 288 472 336 450.41 347.017c13.522 22.76 1.352 53.216-15.015 61.996 8.293 52.54-18.961 70.606-57.212 70.974-3.312.03-37.247 0-40.727 0-72.929 0-134.742-40.727-177.455-40.727V235.625c37.708 0 72.305-67.939 106.183-101.818 30.545-30.545 20.363-81.454 40.727-101.817 50.909 0 50.909 35.517 50.909 61.091 0 42.189-30.545 61.09-30.545 101.817h111.999c22.73 0 40.627 20.364 40.727 40.727.099 20.363-8.001 36.375-23.984 40.727zM104 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"></path>
              </svg>
              <span>36</span>
            </Link>
            <div className="flex flex-row items-center mr-4">
              <div className="flex-row items-center hidden mr-2 md:flex">
                <Link
                  to="/"
                  className="w-8 h-8 border-4 rounded-full -mr-2 overflow-hidden bg-gray-200 border-white"
                >
                  <img
                    data-sizes="auto"
                    loading="lazy"
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1603629474967/i5t4dV_pX.jpeg?w=50&amp;h=50&amp;fit=crop&amp;crop=faces&amp;auto=compress"
                    data-src="https://cdn.hashnode.com/res/hashnode/image/upload/v1603629474967/i5t4dV_pX.jpeg?w=50&amp;h=50&amp;fit=crop&amp;crop=faces&amp;auto=compress"
                    data-width="50"
                    data-height="50"
                    alt="Yogesh Chavan"
                    className="block w-full"
                    sizes="24px"
                  ></img>
                </Link>
                <Link
                  to="/"
                  className="w-8 h-8 border-4 rounded-full -mr-2 overflow-hidden bg-gray-200 border-white"
                >
                  <img
                    data-sizes="auto"
                    loading="lazy"
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1601811303397/FoVTz79an.png?w=50&amp;h=50&amp;fit=crop&amp;crop=faces&amp;auto=compress"
                    data-src="https://cdn.hashnode.com/res/hashnode/image/upload/v1601811303397/FoVTz79an.png?w=50&amp;h=50&amp;fit=crop&amp;crop=faces&amp;auto=compress"
                    data-width="50"
                    data-height="50"
                    alt="Suprabha Supi"
                    className="block w-full  lazyautosizes lazyloaded"
                    sizes="24px"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExplorePage = () => {
  return (
    <div className="flex flex-col flex-grow-0 w-full pb-24">
      <div className="pt-3 mb-2 bg-white">
        <div className="flex flex-row flex-wrap">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
