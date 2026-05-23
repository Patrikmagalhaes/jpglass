import React, { useEffect, useState } from "react";

type TalkingSpriteProps = {
  closedMouthSrc: string;
  openMouthSrc: string;
  isTalking?: boolean;
  size?: number;
  interval?: number;
};

export default function TalkingSprite({
  closedMouthSrc,
  openMouthSrc,
  isTalking = true,
  size = 500,
  interval = 20000,
}: TalkingSpriteProps) {
  const [mouthOpen, setMouthOpen] = useState(false);

  useEffect(() => {
    if (!isTalking) {
      setMouthOpen(false);
      return;
    }

    const timer = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, interval);

    return () => clearInterval(timer);
  }, [isTalking, interval]);

  return (
    <img
      src={mouthOpen ? openMouthSrc : closedMouthSrc}
      alt="Talking Character"
      width={size}
      height={size}
      style={{
        imageRendering: "pixelated",
        objectFit: "contain",
        userSelect: "none",
      }}
      draggable={false}
    />
  );
}