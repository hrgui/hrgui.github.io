import React from "react"
import GithubProfileButton from "./GithubProfileButton"

const Hero = () => {
  return (
    <div className="p-8 flex flex-col justify-center items-start dark:text-gray-200 h-hero sm:h-hero-sm gplay-bg dark:dark-gplay-bg">
      <h1 className="text-4xl font-semibold md:text-6xl md:leading-tight xl:text-7xl xl:leading-tight 2xl:text-8xl 2xl:leading-tight">
        I ❤️ making{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-700 dark:from-green-500 dark:to-blue-400">
          cool and awesome{" "}
        </span>
        web/mobile apps.
      </h1>
      <GithubProfileButton
        href="https://www.github.com/hrgui"
        target="__blank"
        rel="noreferrer"
      >
        View Github Profile
      </GithubProfileButton>
    </div>
  )
}

export default Hero
