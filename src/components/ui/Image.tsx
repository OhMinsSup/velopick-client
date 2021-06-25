import React from "react";
import cn from "classnames";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}
const Image: React.FC<ImageProps> = ({ src, className, alt }) => {
  return <img className={cn(className)} src={src} alt={alt} />;
};

export default React.memo(Image);
