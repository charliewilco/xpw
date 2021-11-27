import { useCallback, useState } from "react";
import Head from "next/head";
import Scale from "../components/Scale";
import History from "../components/History";
import ColorBlock from "../components/ColorBlock";
import checkHex from "../components/checkHex";
import textColor from "../components/textColor";
import { useMediaQuery } from "../components/useMediaQuery";

const App = () => {
  const [color, setColor] = useState("#ffba00");
  const [history, setHistory] = useState<string[]>([]);

  const updateStorage = useCallback(() => {
    if (checkHex(color)) {
      let newColors = [...history, color];
      localStorage.setItem("colors", JSON.stringify(newColors));

      setHistory(newColors);
    }
  }, [color, history]);

  const handleClear = useCallback(() => {
    localStorage.clear();

    setHistory([]);
  }, [setHistory]);
  const matches = useMediaQuery("(min-width: 500px)");
  return (
    <div className="outer">
      <Head>
        <title>xpw</title>
      </Head>

      <div className="flex">
        <History
          clear={handleClear}
          current={color}
          history={history}
          onChange={(c) => setColor(c)}
        />
        <div className="inputContainer">
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          {checkHex(color) ? (
            <ColorBlock color={color} />
          ) : (
            <div>
              <p>
                Hang On, doesn't look like {color.toUpperCase()} is a valid hex
                color, let's try again.
              </p>
            </div>
          )}
        </div>
        {checkHex(color) && <Scale depth={matches ? 12 : 6} color={color} />}
      </div>

      <style jsx>{`
          input {
            background: none;
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
              checkHex(color) ? textColor(color) : "rgba(0, 0, 0, 0.875)"
            }
            border-bottom: 2px solid
              ${checkHex(color) ? textColor(color) : "rgba(0, 0, 0, 0.5)"};
          }

          .flex {
            display: flex;
          flex-direction: column;
          justify-content: space-around;
          background:  ${color};
          height: 100%;
          transition: background-color 250ms ease-in-out;
          padding-top: 7.5rem

          }

          .inputContainer {
            max-width: 25rem;
            padding: 1rem;
            width: 100%;
          }


          @media (min-width: 500px) {
            .flex {
              flex-direction: row;
              justify-content: center;
              align-items: center;
              padding-top: 0;
            }
          }

          .outer {
            height: 100%;
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

        html {
          -webkit-font-smoothing: antialiased;
          font: 400 100% / 1.6 inherit;
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

export default App;
