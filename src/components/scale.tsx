import { getTextColorFromCurrent } from "./utils";

const ScaleBlock = ({ color }: { color: string }) => (
  <div>
    <span>{color.toUpperCase()}</span>
    <style jsx>{`
      div {
        flex: 120px;
        background-color: ${color};
        padding: 0.5rem;
        text-align: center;
      }

      span {
        font-size: 0.875rem;
        font-family: var(--monospace);
        color: ${getTextColorFromCurrent(color)};
      }
    `}</style>
  </div>
);

interface IScaleProps {
  colors: string[];
}

export const Scale = ({ colors }: IScaleProps) => {
  return (
    <section>
      <h3 className="widget-title">Scale</h3>
      <div>
        {colors.map((color, i) => (
          <ScaleBlock color={color} key={i} />
        ))}
      </div>
      <style jsx>{`
        div {
          --columns: 2;
          display: grid;
          grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
          width: 100%;
        }

        @media (min-width: 500px) {
          div {
            --columns: 4;
          }
        }
      `}</style>
    </section>
  );
};
