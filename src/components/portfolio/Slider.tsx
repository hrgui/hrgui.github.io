import React from "react"
import classnames from "classnames"

interface Props extends React.HTMLProps<HTMLDivElement> {
  isAutoPlay?: boolean
  className?: string
}

export default function Slider({
  className,
  children,
  isAutoPlay: defaultIsAutoPlay,
}: Props) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlay, setIsAutoPlay] = React.useState(defaultIsAutoPlay)
  const images = React.Children.toArray(children)

  React.useEffect(() => {
    if (!isAutoPlay) {
      return
    }

    const interval = setInterval(() => {
      handleChangeImage(currentIndex + 1)
    }, 3000)
    return () => clearInterval(interval)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isAutoPlay])

  function handleChangeImage(newIndex) {
    if (newIndex > images.length - 1) {
      newIndex = 0
    }

    if (newIndex < 0) {
      newIndex = images.length - 1
    }

    setCurrentIndex(newIndex)
  }

  function handleChangeAutoPlay() {
    setIsAutoPlay(!isAutoPlay)
  }

  return (
    <div className={className}>
      <div className="bg-black h-52 relative">
        {React.Children.map(children, (child, i) => {
          return React.cloneElement(child as React.ReactElement, {
            className: classnames("absolute transition duration-500", {
              "opacity-100": currentIndex === i,
              "opacity-0": currentIndex !== i,
            }),
          })
        })}
      </div>
      <div className="flex items-center justify-center w-full">
        <button
          className={classnames("p-2 text-gray-500", {
            "font-medium": isAutoPlay,
          })}
          onClick={handleChangeAutoPlay}
        >
          {isAutoPlay ? "AutoPlay" : "Manual"}
        </button>
        <button
          className="text-gray-500"
          onClick={() => handleChangeImage(currentIndex - 1)}
        >
          Prev
        </button>
        {images.map((img, i) => (
          <button
            onClick={() => handleChangeImage(i)}
            className={classnames(
              "p-2 transition duration-150 text-gray-500 hover:font-medium",
              {
                "font-semibold": currentIndex === i,
              }
            )}
            key={i}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="text-gray-500"
          onClick={() => handleChangeImage(currentIndex + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
