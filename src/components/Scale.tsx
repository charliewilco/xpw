import React from "react";
import chroma from "chroma-js";
import textColor from "./textColor";

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
        color: ${textColor(color)};
      }
    `}</style>
  </div>
);

const Scale = ({ color, depth }: { depth: number; color: string }) => (
  <div>
    {chroma
      .scale([chroma(color).brighten(), color, chroma(color).darken(2.6)])
      .colors(depth)
      .map((color, i) => (
        <ScaleBlock color={color} key={i} />
      ))}
    <style jsx>{`
      div {
        --columns: 4;
        display: grid;
        grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
        width: 100%;
      }

      @media (min-width: 500px) {
        div {
          --columns: 12;
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
    `}</style>
  </div>
);

export default Scale;
