import React from "react"
import Header from "./Header"
import Head from "next/head"
import Footer from "./Footer"

interface Props {
  children?: React.ReactNode
}

const AppLayout = (props: Props) => {
  return (
    <div className="font-inter dark:bg-stone-900 dark:text-gray-200">
      <Header />
      <Head>
        <title>hrgui</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="min-h-screen">{props.children}</div>
      <Footer />
    </div>
  )
}

export default AppLayout
