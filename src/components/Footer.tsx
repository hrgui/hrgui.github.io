import React from "react"
import Logo from "./Logo"
import Link from "next/link"

interface Props {}

const Footer = (props: Props) => {
  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className=" bg-gray-200">
      <div className="p-5">
        <Logo />
        <p className="prose prose-sm mt-4 mb-4">
          Harman Goei (hrgui) is a developer that loves to make cool and awesome
          web applications. His strength is in HTML, CSS, JavaScript, but he is
          willing to code anywhere in the stack to make the web be awesome.
        </p>
        <div className="mb-4 mt-4">
          <nav className="flex flex-col">
            <Link href="/portfolio">
              <a className={"text-red-700 hover:underline font-medium"}>Home</a>
            </Link>
            <Link href="/posts">
              <a className={"text-red-700 hover-underline font-medium"}>Blog</a>
            </Link>
            <Link href="/portfolio">
              <a className={"text-red-700 hover-underline font-medium"}>
                Portfolio
              </a>
            </Link>
          </nav>
        </div>
      </div>
      <div className="p-5 border-t border-gray-400 flex justify-between">
        <div>&copy; {new Date().getFullYear()} Harman Goei</div>
        <div>
          <button
            onClick={handleBackToTop}
            className="text-red-700 hover-underline font-medium"
          >
            back to top?
          </button>
        </div>
      </div>
    </div>
  )
}

export default Footer
