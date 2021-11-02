import React from "react"
import { NextSeo } from "next-seo"

interface Props {
  title: string
  description: string
}

const Seo = (props: Props) => {
  return (
    <NextSeo
      titleTemplate="hrgui | %s"
      title={props.title}
      description={props.description}
    />
  )
}

export default Seo
