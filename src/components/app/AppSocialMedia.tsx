import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { GITHUB_URL, LINKEDIN_URL } from "@/constants"
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string
}

const AppSocialMedia = ({ className }: Props) => {
  return (
    <div className={twMerge("flex gap-2", className)}>
      <a
        title="View My Github Profile"
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-50 hover:opacity-100 transition-all"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        title="View My LinkedIn Profile"
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-50 hover:opacity-100 transition-all"
      >
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
    </div>
  )
}

export default AppSocialMedia
