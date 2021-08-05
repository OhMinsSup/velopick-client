import React from "react";

const MemberPage: React.FC = () => {
  return (
    <div className="w-full mb-24 overflow-hidden">
      <div className="flex flex-row flex-wrap items-start p-4 bg-white border-b">
        <div className="mr-3 lg:mr-5">
          <a
            href="https://blog.greenroots.info"
            rel="noopener"
            className="block w-12 h-12 overflow-hidden rounded-full lg:w-20 lg:h-20 bg-gray-100"
          >
            <img
              data-sizes="auto"
              loading="lazy"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1600664833703/2v2e239Ft.jpeg?w=200&amp;h=200&amp;fit=crop&amp;crop=faces&amp;auto=compress"
              data-src="https://cdn.hashnode.com/res/hashnode/image/upload/v1600664833703/2v2e239Ft.jpeg?w=200&amp;h=200&amp;fit=crop&amp;crop=faces&amp;auto=compress"
              data-width="200"
              data-height="200"
              alt=""
              className="block w-full lazyautosizes lazyloaded"
              sizes="80px"
            />
          </a>
        </div>
        <div className="w-full my-4 mr-5 lg:w-auto lg:my-0 lg:flex-1">
          <h1 className="text-xl font-bold">
            <a href="https://blog.greenroots.info" rel="noopener">
              GreenRoots Blog - Tapas Adhikary
            </a>
          </h1>
          <p className="text-sm text-brand-gray-900">
            <a href="https://blog.greenroots.info" rel="noopener">
              blog.greenroots.info
            </a>
          </p>
          <div className="flex flex-col my-4 text-sm text-brand-blue">????</div>
          <div className="flex flex-row flex-wrap items-center mt-2 -ml-1 text-xs text-brand-grey-600">
            <a
              href="/n/javascript"
              className="block p-1 mr-2 rounded-lg hover:bg-gray-100"
            >
              JavaScript
            </a>
            <a
              href="/n/programming"
              className="block p-1 mr-2 rounded-lg hover:bg-gray-100"
            >
              General Programming
            </a>
            <a
              href="/n/reactjs"
              className="block p-1 mr-2 rounded-lg hover:bg-gray-100"
            >
              React
            </a>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center lg:flex-row">
          <div className="mr-5 text-sm font-medium text-gray-900">
            2.9K followers
          </div>
          <div>
            <button className="blog-follow-button" data-title="Follow blog">
              <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 384 512">
                <path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
              </svg>
              <span>Follow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
