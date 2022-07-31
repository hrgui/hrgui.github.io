import React from "react";

const Education = () => {
  return (
    <div
      className="p-6 pt-8 pb-10  dark:bg-neutral-900 dark:text-gray-100  dark:border-stone-700"
      data-testid="section-education"
    >
      <div className="container mx-auto">
        <h1 className="text-3xl font-medium mb-6">Education</h1>
        <div className="flex items-center">
          <div className="w-28 pr-4">
            <a href="https://www.usc.edu" target="__blank">
              <img
                loading="lazy"
                alt="Open www.usc.edu in a new tab"
                src="/images/usc.png"
                className="w-20 h-20"
              />
            </a>
          </div>
          <div className="dark:text-gray-200">
            <h3 className="uppercase dark:text-gray-100 mb-2 font-semibold tracking-wide">
              University of Southern California
            </h3>
            <p>
              Bachelor of Science (B.S.), Computer Science and Engineering,
              Magna Cum Laude
            </p>
            <p className="text-gray-700 dark:text-gray-100">2010 - 2013</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
