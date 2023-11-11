import "./image-loading.scss";

import { useEffect, useRef, useState } from "react";

interface ImageLoadingProps {
  image?: string;
  placeholder?: string;
  classes?: string;
}

/**
 * ImageLoading
 *
 * Image loading component
 */
export function ImageLoading({
  image,
  placeholder,
  classes,
}: ImageLoadingProps) {
  const imgEl = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  const onImageLoaded = () => setLoaded(true);

  useEffect(() => {
    const imgElCurrent = imgEl.current;

    if (imgElCurrent) {
      imgElCurrent.addEventListener("load", onImageLoaded);
      return () => imgElCurrent.removeEventListener("load", onImageLoaded);
    }

    return () => {};
  }, [imgEl]);

  return (
    <div className={["image-loading", classes].join(" ")}>
      <img
        className="image-loading__img"
        src={loaded ? image || placeholder : placeholder}
        alt={placeholder || "image"}
        ref={imgEl}
      />
    </div>
  );
}

export default ImageLoading;
