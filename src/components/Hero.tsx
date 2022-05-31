import React from "react"
import GithubProfileButton from "./GithubProfileButton"

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-start dark:text-gray-200 h-hero sm:h-hero-sm gplay-bg dark:dark-gplay-bg">
      <div className="p-6 xl:p-0 flex flex-col justify-center items-start container mx-auto">
        <h1 className="text-4xl font-semibold leading-tight md:text-6xl md:leading-snug  xl:text-7xl xl:leading-snug 2xl:text-8xl 2xl:leading-snug">
          I ❤️ making{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-saltpan-400 to-malibu-500 dark:from-saltpan-500 dark:to-malibu-400">
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
    </div>
  )
}

export default Hero
