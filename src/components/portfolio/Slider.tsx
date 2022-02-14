import React from "react"
import classnames from "classnames"

interface Props extends React.HTMLProps<HTMLDivElement> {
  isAutoPlay?: boolean
  className?: string
}

export default function Slider({
  className,
  children,
  isAutoPlay: defaultIsAutoPlay = true,
}: Props) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlay, setIsAutoPlay] = React.useState(defaultIsAutoPlay)
  const images = React.Children.toArray(children)

  const handleChangeImage = React.useCallback(
    function(newIndex) {
      if (newIndex > images.length - 1) {
        newIndex = 0
      }

      if (newIndex < 0) {
        newIndex = images.length - 1
      }

      setCurrentIndex(newIndex)
    },
    [setCurrentIndex, images.length]
  )

  React.useEffect(() => {
    if (!isAutoPlay) {
      return
    }

    const interval = setInterval(() => {
      handleChangeImage(currentIndex + 1)
    }, 10000)
    return () => clearInterval(interval)
  }, [currentIndex, handleChangeImage, isAutoPlay])

  function handleChangeAutoPlay() {
    setIsAutoPlay(!isAutoPlay)
  }

  return (
    <div className={className}>
      <div className="container mx-auto flex items-center justify-center relative overflow-hidden h-56 lg:h-hero">
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
              "p-2 transition duration-1000 text-gray-500 hover:font-medium",
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
