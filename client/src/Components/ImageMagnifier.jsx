import { useState } from "react";
import serverURL from "../../serverURL";

// eslint-disable-next-line react/prop-types
function ImageMagnifier({ image }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  function handleMouseHover(e) {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  }

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => {
          setShowMagnifier(true);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
        onMouseMove={handleMouseHover}
      >
        <img src={image} alt="" className="h-[30rem]" />

        {showMagnifier && (
          <div
            style={{
              position: "absolute",
              left: `${cursorPosition.x - 100}px`,
              top: `${cursorPosition.y - 100}px`,
              pointerEvents: "none",
            }}
          >
            <div
              className="w-32 h-32 "
              style={{
                backgroundImage: `url(${image}) `,
                backgroundPosition: `${position.x}% ${position.y}%`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ImageMagnifier;
