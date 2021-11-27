import chroma from "chroma-js";
import { FiCopy } from "react-icons/fi";
import { useCopy } from "./useCopy";

const ColorBlockItem = ({
  hex,
  name,
  color,
}: {
  hex: string;
  name: string;
  color: string;
}) => {
  const [, handleCopy] = useCopy();
  return (
    <div className="root">
      <div>
        <dt>{name}</dt>
        <dd>{color}</dd>
      </div>
      <button onClick={() => handleCopy(color)}>
        <FiCopy />
      </button>

      <style jsx>{`
        .root {
          padding: 0 0 0.5rem;
          display: flex;
          align-items: center;
        }

        .root > div {
          flex: 1;
        }

        dt {
          display: block;
          font-size: 0.75rem;
          margin-right: 0.25rem;
        }

        dd {
          display: block;
          font-size: 0.875rem;
          font-family: var(--monospace);
        }

        button {
          appearance: none;
          background: none;
          border-radius: 0;
          border: 0;
          color: inherit;
        }
      `}</style>
    </div>
  );
};

export const ColorBlock = ({ color }: { color: string }) => (
  <figure>
    <object />
    <figcaption>
      <dl>
        <ColorBlockItem hex={color} name="Hex" color={color.toUpperCase()} />
        <ColorBlockItem
          hex={color}
          name="HSL"
          color={chroma(color).css("hsl")}
        />
        <ColorBlockItem hex={color} name="RGB" color={chroma(color).css()} />
      </dl>
    </figcaption>

    <style jsx>{`
      figure {
        border-radius: 0.25rem;
        overflow: hidden;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
        margin-bottom: 2rem;
      }

      object {
        aspect-ratio: 16 / 9;
        background: ${color};
        width: 100%;
      }
      dl {
        padding: 0.5rem;
      }
    `}</style>
  </figure>
);
