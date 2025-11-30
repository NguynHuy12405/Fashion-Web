import { useEffect, useState } from "react";
import { slider } from "../mockData/data";
import { useNavigate } from "react-router";

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
    navigate("/");
  };

  // Auto slide
  useEffect(() => {
    if (pause) return;

    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [pause]);

  return (
    <div
      className="relative w-full h-[350px] md:h-[450px] overflow-hidden"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >

      {/* SLIDE ITEMS */}
      {slider.map((item, i) => {
        let position = "translate-x-full"; // vị trí default (right)

        if (i === index) {
          position = "translate-x-0"; // slide hiện tại
        } else if (
          i === (index - 1 + slider.length) % slider.length &&
          direction === "right"
        ) {
          position = "-translate-x-full"; // trượt từ trái sang
        } else if (
          i === (index + 1) % slider.length &&
          direction === "left"
        ) {
          position = "translate-x-full"; // trượt từ phải sang
        }

        return (
          <div
            key={i}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out text-center ${position}`}
          >
            <img src={item.img} className="w-full h-full object-cover" />

            {/* TEXT OVERLAY */}
            <div className="absolute right-10 md:right-12 bottom-12 z-20 text-white p-2 rounded-xl max-w-[75%]">
              <h2 className="text-xl md:text-3xl font-bold drop-shadow-lg">
                {item.title}
              </h2>
              <p className="mt-2 text-sm md:text-base drop-shadow-md">
                {item.subtitle}
              </p>
              <button onClick={handleTrans} className="my-3 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-all cursor-pointer">Xem Chi Tiết</button>
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
              ${index === i ? "bg-white scale-125" : "bg-gray-400/70"}
            `}
          ></div>
        ))}
      </div>
    </div>
  );
}
