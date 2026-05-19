import { useEffect, useRef, useState } from "react";

export default function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const wordsRef = useRef(words);
  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    const current = wordsRef.current[wordIdx] ?? "";
    let timeout;

    if (!deleting && charIdx < current.length) {
      // Still typing — advance one character
      timeout = setTimeout(() => {
        setCharIdx((c) => c + 1);
        setDisplay(current.slice(0, charIdx + 1));
      }, speed);
    } else if (!deleting && charIdx === current.length) {
      // Fully typed — pause, then start deleting
      timeout = setTimeout(() => {
        setDeleting(true);
      }, pause);
    } else if (deleting && charIdx > 0) {
      // Deleting — remove one character
      timeout = setTimeout(() => {
        setCharIdx((c) => c - 1);
        setDisplay(current.slice(0, charIdx - 1));
      }, speed / 2);
    } else {
      // Deletion complete — move to next word after a brief gap
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % wordsRef.current.length);
        setCharIdx(0);
        setDisplay("");
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, speed, pause]);

  return display;
}
