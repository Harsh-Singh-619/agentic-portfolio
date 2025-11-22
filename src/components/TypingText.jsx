import { useState, useEffect } from "react";

const TypingText = ({ text, speed = 80 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className="whitespace-pre-wrap font-medium tracking-normal">
      {text.slice(0, index)}
      <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-pulse align-middle"></span>
    </span>
  );
};

export default TypingText;
