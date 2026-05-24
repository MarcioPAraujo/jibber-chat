"use client";

import { useEffect } from "react";

interface IUseClickOutsideProps {
  ref: React.RefObject<HTMLElement>;
  onClickOutside: () => void;
  dependencyList?: any[];
}
const useClickOutside = ({
  ref,
  onClickOutside,
  dependencyList,
}: IUseClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, dependencyList || []);
};
export default useClickOutside;
