import React from "react"
import Header from "./Header"
import Head from "next/head"
import Footer from "./Footer"

interface Props {
  children?
}

const AppLayout = (props: Props) => {
  return (
    <div className="font-inter">
      <Header />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      {props.children}
      <Footer />
    </div>
  )
}

export default AppLayout
