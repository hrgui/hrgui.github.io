import React from "react"

const Education = () => {
  return (
    <div className="p-6 pt-8 pb-8  dark:bg-stone-900 dark:text-gray-100 border-t-4 border-black dark:border-stone-700">
      <h1 className="text-3xl font-medium mb-8">Education</h1>
      <div className="flex items-center">
        <div className="w-28 pr-4">
          <a href="https://www.usc.edu" target="__blank">
            <img
              alt="Open www.usc.edu in a new tab"
              src="/images/usc.png"
              className="w-20"
            />
          </a>
        </div>
        <div className="prose dark:text-gray-200">
          <h3 className="uppercase dark:text-gray-100">
            University of Southern California
          </h3>
          <p>
            Bachelor of Science (B.S.), Computer Science and Engineering, Magna
            Cum Laude
          </p>
          <p>2010 - 2013</p>
        </div>
      </div>
    </div>
  )
}

export default Education
