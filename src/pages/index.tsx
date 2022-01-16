import { useEffect, useCallback, useMemo, useState } from "react";
import Head from "next/head";
import chroma from "chroma-js";
import { Scale } from "../components/scale";
import { History } from "../components/history";
import { ColorBlock } from "../components/color-block";
import { getTextColorFromCurrent, isHexColor } from "../components/utils";

const __IS_BROWSER__: boolean = typeof window !== "undefined";
const KEY = "XPW_COLORS";

const IndexPage = () => {
  const [color, setColor] = useState("#147aab");

  const [history, setHistory] = useState<string[]>([]);

  const updateStorage = useCallback(
    (color: string) => {
      if (isHexColor(color)) {
        setHistory((prev) => {
          let newColors = Array.from(new Set([...prev, color]));
          localStorage.setItem(KEY, JSON.stringify(newColors));

          return newColors;
        });
      }
    },
    [setHistory]
  );

  useEffect(() => {
    if (__IS_BROWSER__) {
      const value = localStorage.getItem(KEY);
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        setHistory(Array.from(new Set(...parsed)));
      }
    }
  }, [setHistory]);

  useEffect(() => {
    if (__IS_BROWSER__) {
      updateStorage(color);
    }
  }, [color, updateStorage]);

  const handleClear = useCallback(() => {
    localStorage.clear();

    setHistory([]);
  }, [setHistory]);

  const handleChange = useCallback((e) => setColor(e.target.value), [setColor]);

  const isValidHex = useMemo(() => isHexColor(color), [color]);

  const definitions = useMemo(() => {
    try {
      const hsl = chroma(color).css("hsl");
      const rgb = chroma(color).css();

      return {
        hsl,
        rgb,
      };
    } catch (error) {
      console.log(error);

      return {
        hsl: "...",
        rgb: "...",
      };
    }
  }, [color]);

  const scale = useMemo(() => {
    try {
      return chroma
        .scale([chroma(color).brighten(), color, chroma(color).darken(2.6)])
        .colors(12);
    } catch (error) {
      return [
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
        "#fff",
      ];
    }
  }, [color]);

  return (
    <div className="outer">
      <header>
        <h1>🩸 🖼 🎨</h1>
        <Head>
          <title>xpw</title>
        </Head>
      </header>

      <section>
        <input type="text" value={color} onChange={handleChange} />

        <History
          clear={handleClear}
          current={color}
          history={history}
          onChange={setColor}
        />

        {!isValidHex && (
          <div>
            <p>
              Hang On, doesn&apos;t look like {color.toUpperCase()} is a valid
              hex color, let&apos;s try again.
            </p>
          </div>
        )}
      </section>
      <section>
        {isValidHex && (
          <div>
            <ColorBlock color={color} {...definitions} />
            <Scale colors={scale} />
          </div>
        )}
      </section>

      <style jsx>{`
          input {
            background: none;
            margin-bottom: 2rem;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            appearance: none;
            font-weight: 700;
            font-family: inherit;
            font-size: 1rem;
            padding: 0.25rem 0;
            width: 100%;
            display: block;
            color: ${
              isHexColor(color)
                ? getTextColorFromCurrent(color)
                : "rgba(0, 0, 0, 0.875)"
            }
            border-bottom: 2px solid
              ${
                isHexColor(color)
                  ? getTextColorFromCurrent(color)
                  : "rgba(0, 0, 0, 0.5)"
              };
          }

          .outer {
            padding: 0 .5rem 2rem;
            display: grid;
            gap: 2rem;
            max-width: 72ch;
            margin: 2rem auto 0;
            --columns: 3;
            grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
          }

          h1 {
            font-weight: 700;
            font-family: var(--monospace);
            font-size: 1.875rem;
          }

          header {
            grid-column: 1 / -1;
            padding: .5rem 0;
          }

          section {
            grid-column: span 3 / span 3;
          }

          @media (min-width: 40rem) {
            .outer {
              --columns: 6;
            }
          }
        `}</style>
      <style jsx global>{`
        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
        }

        :root {
          --monospace: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
            Liberation Mono, monospace;
          --sans-serif: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
        }

        html {
          -webkit-font-smoothing: antialiased;
          font: 400 100% / 1.6 var(--sans-serif);
          box-sizing: border-box;
        }

        html,
        body,
        #__next {
          height: 100%;
        }

        .widget-title {
          font-size: 1.125rem;
          font-weight: 400;
          opacity: 0.75;
          margin: 0 0 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
