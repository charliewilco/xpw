import { useState } from "react";
import Head from "next/head";
import { Scale } from "../components/current-color-scale";
import { History } from "../components/color-history";
import { ColorBlock } from "../components/color-block";

import { useMediaQuery } from "../components/useMediaQuery";
import { getTextColorFromCurrent, isHexColor } from "../components/utils";
import { usePersistedHistory } from "../components/usePersistedHistory";

const IndexPage = () => {
  const [color, setColor] = useState("#ffba00");
  const [history, handleClear] = usePersistedHistory(color);

  const matches = useMediaQuery("(min-width: 500px)");
  const isValidHex = isHexColor(color);
  return (
    <div className="outer">
      <header>
        <h1>xpw</h1>
        <Head>
          <title>xpw</title>
        </Head>
      </header>

      <section>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <History
          clear={handleClear}
          current={color}
          history={history}
          onChange={(c) => setColor(c)}
        >
          <h3>History</h3>
        </History>

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
          <>
            <ColorBlock color={color} />

            <h3>Scale</h3>
            <Scale depth={matches ? 12 : 6} color={color} />
          </>
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
            font-size: 1rem;
          }

          h3 {
            font-size: 1.125rem;
            font-weight: 400;
            opacity: .75;
            margin: 0 0 .5rem
          }

          header {
            grid-column: 1 / -1;
            padding: .5rem;
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
      `}</style>
    </div>
  );
};

export default IndexPage;
