import { FiTrash2 } from "react-icons/fi";
import { getTextColorFromCurrent, isHexColor } from "./utils";

export const Logo = ({ color, size }: { color: string; size: number }) => (
  <svg fill={color} width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const HistoryColor = ({
  color,
  onClick,
  current,
}: {
  color: string;
  current: string;
  onClick(): void;
}) => (
  <div onClick={onClick}>
    <style jsx>{`
      div {
        padding: 0.5rem;
        cursor: pointer;
        background-color: ${color};
        border: 2px solid;
        border-color: ${current === color && isHexColor(current)
          ? getTextColorFromCurrent(color)
          : "transparent"};
        border-radius: 100%;
        margin: 0 0.5rem 0.25rem 0;
      }
    `}</style>
  </div>
);

interface IHistoryProps {
  history: string[];
  onChange(color: string): void;
  current: string;
  clear(): void;
}

export const History: React.FC<IHistoryProps> = ({
  history,
  onChange,
  current,
  clear,
  children,
}) => (
  <div className="outer">
    <header>{children}</header>
    <div className="block">
      <section className="wrap">
        {history.length > 0 &&
          history.map((color, i) => (
            <HistoryColor
              key={i}
              color={color}
              current={current}
              onClick={() => onChange(color)}
            />
          ))}
      </section>
    </div>
    <footer>
      <button onClick={() => clear()}>
        <FiTrash2 />
      </button>
    </footer>
    <style jsx>{`

      .outer {
      }

      .wrap {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 0.25rem;
      }
  
      span {
        margin: 0 .25rem .25rem;
      }
      
      footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      button {

      }

      span,
      button {
        opacity: 50%:
        font-size: .875rem;
      }
    `}</style>
  </div>
);
