import { ReactNode } from "react";
import "react-multi-carousel/lib/styles.css";
import CarouselComponent from "react-multi-carousel";

interface CarouselProps {
  classes?: string;
  showDots?: boolean;
  children: ReactNode;
  itemsToDisplay: number[];
}
function Carousel({
  classes,
  showDots,
  children,
  itemsToDisplay,
}: CarouselProps) {
  const speed = 5000;

  const defaultBreakpointItems = {
    desktop: {
      breakpoint: { max: 5000, min: 1366 },
      items: itemsToDisplay[3],
    },
    smallLaptop: {
      breakpoint: { max: 1366, min: 768 },
      items: itemsToDisplay[2],
    },
    tablet: {
      breakpoint: { max: 768, min: 375 },
      items: itemsToDisplay[1],
    },
    mobile: {
      breakpoint: { max: 375, min: 0 },
      items: itemsToDisplay[0],
    },
  };
  return (
    <div className="wrapper">
      <div
        className={[
          "carousel",
          !showDots ? "carousel__no-dots" : "",
          classes,
        ].join(" ")}
      >
        <CarouselComponent
          responsive={defaultBreakpointItems}
          renderDotsOutside={true}
          autoPlay
          infinite={true}
          showDots={showDots}
          arrows={false}
          renderButtonGroupOutside={true}
          autoPlaySpeed={speed}
          slidesToSlide={1}
        >
          {children}
        </CarouselComponent>
      </div>
    </div>
  );
}

export default Carousel;
