import React, { Component } from "react";
import { css } from "glamor";
import { Flex, Block, InlineBlock as InBl } from "glamor/jsxstyle";
import Media from "react-media";
import Scale from "./Scale";
import History from "./History";
import ColorBlock from "./ColorBlock";
import checkHex from "./checkHex";
import textColor from "./textColor";

const baseInp = css({
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
  appearance: `none`,
  fontWeight: 700,
  fontSize: 16,
  fontFamily: `inherit`,
  paddingTop: 4,
  paddingBottom: 4,
  display: "block",
  width: `100%`,
  background: `none`
});

const inp = hex =>
  css({
    color: textColor(hex),
    borderBottom: `2px solid ${textColor(hex)}`
  });

const invalidInp = css({
  color: "rgba(0, 0, 0, .875)",
  borderBottom: `2px solid rgba(0, 0, 0, .5)`
});

const Input = ({ value, onChange }) => (
  <input
    className={css(baseInp, checkHex(value) ? inp(value) : invalidInp)}
    type="text"
    value={value}
    onChange={onChange}
  />
);

const HangOn = ({ color }) => (
  <Block>
    <InBl>
      Hang On, doesn't look like {color.toUpperCase()} is a valid hex color,
      let's try again.
    </InBl>
  </Block>
);

class App extends Component {
  state = {
    color: "#ffba00",
    history: []
  };

  componentDidMount() {
    let colors = [];
    let storage = localStorage.getItem("colors");
    colors = JSON.parse(storage) || [];

    this.setState({ history: colors });
  }

  toStorage = () => {
    const { color, history } = this.state;

    if (checkHex(color)) {
      let newColors = [...history, color];
      localStorage.setItem("colors", JSON.stringify(newColors));

      this.setState({ history: newColors });
    }
  };

  clearStorage = () => {
    localStorage.clear();
    this.setState({ history: [] });
  };

  render() {
    const { color, history } = this.state;
    return (
      <Block fontFamily="Roboto Mono" height="100%">
        <Media query="(min-width: 500px)">
          {matches => (
            <Flex
              flexDirection={matches ? "row" : "column"}
              justifyContent={matches ? "center" : "space-around"}
              alignItems={matches && "center"}
              backgroundColor={color}
              transition="background-color 250ms ease-in-out"
              height="100%"
              paddingTop={!matches && 120}
            >
              <History
                clear={this.clearStorage}
                current={color}
                history={history}
                onChange={c => this.setState({ color: c })}
              />
              <Block width="100%" maxWidth={395} padding={16}>
                <Input
                  value={color}
                  onChange={e =>
                    this.setState({ color: e.target.value }, this.toStorage)
                  }
                />
                {checkHex(color) ? (
                  <ColorBlock color={color} />
                ) : (
                  <HangOn color={color} />
                )}
              </Block>
              {checkHex(color) && (
                <Scale fixed={matches} depth={matches ? 12 : 6} color={color} />
              )}
            </Flex>
          )}
        </Media>
      </Block>
    );
  }
}

export default App;
