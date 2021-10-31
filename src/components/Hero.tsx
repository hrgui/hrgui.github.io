import React from "react"
import GithubProfileButton from "./GithubProfileButton"

const Hero = () => {
  return (
    <div className="hero">
      <h1 className="text-4xl font-semibold sm:text-7xl">
        I ♥ MAKING COOL AND AWESOME WEB/MOBILE APPS.
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
