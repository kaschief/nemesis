import { useRef, useEffect } from "react";

export const useIsMount = (): boolean => {
  const isMountRef: React.MutableRefObject<boolean> = useRef(true);
  useEffect((): void => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
