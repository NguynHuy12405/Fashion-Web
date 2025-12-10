import { useEffect, useState } from "react";
import { slider } from "../mockData/data";
import { useNavigate } from "react-router";
import ButtonLink from "./Button/ButtonLink";

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [direction, setDirection] = useState("right");
  const navigate = useNavigate();

  const nextSlide = () => {
    setDirection("right");
    setIndex((prev) => (prev + 1) % slider.length);
  };

  const handleTrans = () => {
    navigate("/products");
  };

  useEffect(() => {
    if (pause) return;

    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [pause]);

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >

      {slider.map((item, i) => {
        let position = "translate-x-full";

        if (i === index) {
          position = "translate-x-0";
        } else if (
          i === (index - 1 + slider.length) % slider.length &&
          direction === "right"
        ) {
          position = "-translate-x-full";
        } else if (
          i === (index + 1) % slider.length &&
          direction === "left"
        ) {
          position = "translate-x-full";
        }

        return (
          <div key={i}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out text-center ${position}`}
          >
            <img src={item.img} className="w-full h-full object-cover" />
            <div className="absolute right-10 md:right-12 bottom-12 z-20 text-[#0a0d1a] p-2 rounded-xl max-w-[75%]">
              <h2 className="text-xl md:text-3xl font-bold drop-shadow-lg">
                {item.title}
              </h2>
              <p className="mt-2 text-[18px] md:text-base drop-shadow-md">
                {item.subtitle}
              </p>
              <ButtonLink onClick={handleTrans} title="Mua Ngay" offIcon={false}/>
            </div>
          </div>
        );
      })}

      {/* DOTS */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2 z-20">
        {slider.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-4 h-1 rounded-full cursor-pointer transition-all 
              ${index === i ? "bg-[#E7D7BD] scale-125" : "bg-[#D2B48C]"}
            `}
          ></div>
        ))}
      </div>
    </div>
  );
}
