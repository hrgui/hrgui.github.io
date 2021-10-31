import React from "react"
import Image from "next/image"

interface Props {}

const Education = (props: Props) => {
  return (
    <div className="p-4 pt-8 pb-8 bg-blue-100 border-t-4 border-black">
      <h1 className="text-3xl font-medium mb-8">Education</h1>
      <div className="flex items-center">
        <div className="w-28 pr-4">
          <img
            alt="University of Southern California"
            src="https://www.harmanradix.com/static/usc-391742c924d04cd12285e3acca6da6d1.png"
            className="w-20"
          />
        </div>
        <div className="prose">
          <h3 className="uppercase">University of Southern California</h3>
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
