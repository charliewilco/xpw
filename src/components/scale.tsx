import { getTextColorFromCurrent } from "./utils";

interface IScaleProps {
  colors: string[];
}

export const Scale = ({ colors }: IScaleProps) => {
  return (
    <section>
      <h3 className="widget-title">Scale</h3>
      <div className="grid">
        {colors.map((color, i) => (
          <div
            className="block"
            style={{
              background: color,
            }}
            key={i}
          >
            <span style={{ color: getTextColorFromCurrent(color) }}>
              {color.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        .grid {
          --columns: 2;
          display: grid;
          grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
          width: 100%;
        }

        .block {
          flex: 120px;
          padding: 0.5rem;
          text-align: center;
        }

        span {
          font-size: 0.875rem;
          font-family: var(--monospace);
        }

        @media (min-width: 500px) {
          .grid {
            --columns: 4;
          }
        }
      `}</style>
    </section>
  );
};
