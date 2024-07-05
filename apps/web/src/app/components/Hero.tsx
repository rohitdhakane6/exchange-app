import { Carousel } from "flowbite-react";

export function Hero() {
  return (
    <div className="flex flex-row mx-[24px] overflow-hidden rounded-xl">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-full max-w-[1280px] py-5">
      <Carousel>
        <img src="./banner.jpg" alt="..." />
        <img src="./banner.jpg" alt="..." />
      </Carousel>
    </div>
    </div>
    
  );
}
