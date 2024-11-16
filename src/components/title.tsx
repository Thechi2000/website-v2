import { doom, useAsciiText } from "react-ascii-text";

export default function Title({ text }: { text: string }) {
  const asciiTextRef = useAsciiText({
    isAnimated: true,
    animationLoop: false,
    fadeInOnly: true,
    font: doom,
    text: [text],
  });

  return <pre className="title" ref={asciiTextRef as any} />;
}
