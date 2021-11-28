import chroma from "chroma-js";
import { useCallback } from "react";
import { FiCopy } from "react-icons/fi";

interface IBlockItemProps {
  hex: string;
  name: string;
  color: string;
  onCopy(value: string): void;
}

const ColorBlockItem = ({ name, color, onCopy }: IBlockItemProps) => {
  return (
    <div className="root">
      <div>
        <dt>{name}</dt>
        <dd>{color}</dd>
      </div>
      <button onClick={() => onCopy(color)}>
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

interface IColorBlockProps {
  color: string;
  hsl: string;
  rgb: string;
}

export const ColorBlock = ({ color }: IColorBlockProps) => {
  const handleCopy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err: any) {
      console.log(`Failed to copy: ${err.message}`);
    }
  }, []);

  return (
    <figure>
      <object />
      <figcaption>
        <dl>
          <ColorBlockItem
            onCopy={handleCopy}
            hex={color}
            name="Hex"
            color={color.toUpperCase()}
          />
          <ColorBlockItem
            onCopy={handleCopy}
            hex={color}
            name="HSL"
            color={chroma(color).css("hsl")}
          />
          <ColorBlockItem
            onCopy={handleCopy}
            hex={color}
            name="RGB"
            color={chroma(color).css()}
          />
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
};
