import React from "react";
import chroma from "chroma-js";
import textColor from "./textColor";
import checkHex from "./checkHex";

const ColorBlockItem = ({
  hex,
  name,
  color,
}: {
  hex: string;
  name: string;
  color: string;
}) => (
  <div>
    <span className="label">{name}</span>
    <span className="color">{color}</span>
    <style jsx>{`
      div {
        display: flex;
        align-items: center;
        color: ${checkHex(hex) ? textColor(hex) : "rgba(0, 0, 0, .875)"};
      }

      .label {
        display: inline-block;
        font-size: 0.75rem;
        margin-right: 0.5rem;
        flex: 1;
      }

      .color {
        display: inline-block;
        font-size: 0.875rem;
        flex: 4;
      }
    `}</style>
  </div>
);

const ColorBlock = ({ color }: { color: string }) => (
  <div>
    <ColorBlockItem hex={color} name="Hex" color={color.toUpperCase()} />
    <ColorBlockItem hex={color} name="HSL" color={chroma(color).css("hsl")} />
    <ColorBlockItem hex={color} name="RGB" color={chroma(color).css()} />
    <style jsx>{`
      div {
        padding: 1rem 0;
      }
    `}</style>
  </div>
);

export default ColorBlock;
