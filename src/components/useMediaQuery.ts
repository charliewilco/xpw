import { useEffect, useState } from "react";
 const __IS_BROWSER__: boolean = typeof window !== "undefined";

/**
 * Accepts a media query string then uses the
 * [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it
 * matches with the current document.<br />
 * It also monitor the document changes to detect when it matches or stops matching the media query.<br />
 * Returns the validity state of the given media query.
 *
 */
export const useMediaQuery = (mediaQuery: string): boolean => {
  const [isVerified, setIsVerified] = useState(
    __IS_BROWSER__ ? !!window.matchMedia(mediaQuery).matches : false
  );

  useEffect(() => {
    if (__IS_BROWSER__) {
      const mediaQueryList = window.matchMedia(mediaQuery);
      const documentChangeHandler = () =>
        setIsVerified(!!mediaQueryList.matches);

      try {
        mediaQueryList.addEventListener("change", documentChangeHandler);
      } catch (e) {
        // Safari isn't supporting mediaQueryList.addEventListener
        mediaQueryList.addListener(documentChangeHandler);
      }

      documentChangeHandler();
      return () => {
        try {
          mediaQueryList.removeEventListener("change", documentChangeHandler);
        } catch (e) {
          // Safari isn't supporting mediaQueryList.removeEventListener
          mediaQueryList.removeListener(documentChangeHandler);
        }
      };
    }
  }, [mediaQuery]);

  return isVerified;
};
