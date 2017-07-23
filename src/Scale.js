import React from 'react';
import { Flex, Block, InlineBlock as InBl } from 'glamor/jsxstyle'
import chroma from 'chroma-js'
import textColor from './textColor'

const ScaleBlock = ({ color }) => (
  <Block flex='120px' padding={8} backgroundColor={color} textAlign='center'>
    <InBl color={textColor(color)}>{color.toUpperCase()}</InBl>
  </Block>
)


const Scale = ({ color, depth, fixed }) => (
  <Flex position={fixed && 'fixed'} flexWrap={!fixed && 'wrap'} left={0} right={0} bottom={0}>
  {
    chroma.scale([chroma(color).brighten(), color, chroma(color).darken(2.6)]).colors(depth).map(
      (color, i) => (<ScaleBlock color={color} key={i} />)
    )
  }
  </Flex>
)

export default Scale
