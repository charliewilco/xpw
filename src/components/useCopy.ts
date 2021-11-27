import { useCallback, useReducer, useRef } from "react";

const messageReducer = (_state: string | null, action: string | null) => action;

export const useCopy = (timeout: number = 3000) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useReducer(messageReducer, null);

  const handleCopy = useCallback(
    async (value: string) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      try {
        await navigator.clipboard.writeText(value);
        setMessage("Copied to clipboard");
      } catch (err: any) {
        setMessage(`Failed to copy: ${err.message}`);
      }

      timeoutRef.current = setTimeout(() => {
        setMessage(null);
      }, timeout);
    },
    [setMessage, timeout]
  );

  return [message, handleCopy] as const;
};
