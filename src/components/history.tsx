import { FiTrash2 } from "react-icons/fi";
import { getTextColorFromCurrent, isHexColor } from "./utils";

interface IHistoryColorProps {
  color: string;
  current: string;
  onClick(): void;
}

export const HistoryColor = (props: IHistoryColorProps) => {
  return (
    <div onClick={props.onClick}>
      <style jsx>{`
        div {
          padding: 0.5rem;
          cursor: pointer;
          background-color: ${props.color};
          border: 2px solid;
          border-color: ${props.current === props.color &&
          isHexColor(props.current)
            ? getTextColorFromCurrent(props.color)
            : "transparent"};
          border-radius: 100%;
          margin: 0 0.5rem 0.25rem 0;
        }
      `}</style>
    </div>
  );
};

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
}) => {
  return (
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
};
