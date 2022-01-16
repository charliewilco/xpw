import { FiTrash2 } from "react-icons/fi";
import { getTextColorFromCurrent, isHexColor } from "./utils";

interface IHistoryColorProps {
  color: string;
  current: string;
  onClick(): void;
}

export const HistoryColor: React.VFC<IHistoryColorProps> = (props) => {
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

export const History: React.VFC<IHistoryProps> = (props) => {
  return (
    <div className="outer">
      <header>
        <h3 className="widget-title">History</h3>
      </header>
      <div className="block">
        <section className="wrap">
          {props.history.length > 0 &&
            props.history.map((color, i) => (
              <HistoryColor
                key={i}
                color={color}
                current={props.current}
                onClick={() => props.onChange(color)}
              />
            ))}
        </section>
      </div>
      <footer>
        <button onClick={() => props.clear()}>
          <FiTrash2 size={24} />
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
          appearance: none;
          background: none;
          border: 0;
  
  
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
