import { useState } from "preact/hooks";
import Slider from "~/components/portfolio/Slider/Slider";

interface Image {
  src: string;
  alt: string;
}

interface Props {
  images: Image[];
  caption?: string;
}

export default function ImageGallery({ images, caption }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="my-8">
      <Slider isAutoPlay={false} onIndexChange={setCurrentIndex}>
        {images.map((img, i) => (
          <div
            key={i}
            className="flex items-center justify-center bg-surface-container p-4"
          >
            <img
              src={img.src}
              title={img.alt}
              alt={img.alt}
              className="max-h-[500px] w-auto object-contain cursor-pointer"
            />
          </div>
        ))}
      </Slider>
      <div className="mt-4 text-center">
        {images[currentIndex] && (
          <p className="text-sm text-on-surface/70">
            {images[currentIndex].alt}
          </p>
        )}
        {caption && (
          <p className="text-sm text-on-surface/50 mt-1">{caption}</p>
        )}
      </div>
    </div>
  );
}
