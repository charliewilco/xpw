import React from 'react'
import { Flex, Block, InlineBlock as InBl } from 'glamor/jsxstyle'
import chroma from 'chroma-js'
import textColor from './textColor'
import checkHex from './checkHex'

const Label = ({ name }) => (
  <InBl marginRight={8} fontSize={12} flex={1}>
    {name}
  </InBl>
)

const Color = ({ color }) => (
  <InBl fontSize={14} flex={4}>
    {color}
  </InBl>
)

const ColorBlockItem = ({ hex, name, color }) => (
  <Flex color={checkHex(hex) ? textColor(hex) : 'rgba(0, 0, 0, .875)'} alignItems='center'>
    <Label name={name} />
    <Color color={color} />
  </Flex>
)

const ColorBlock = ({ color }) => (
  <Block paddingTop={16} paddingBottom={16}>
    <ColorBlockItem hex={color} name='Hex' color={color.toUpperCase()} />
    <ColorBlockItem hex={color} name='HSL' color={chroma(color).css('hsl')} />
    <ColorBlockItem hex={color} name='RGB' color={chroma(color).css()} />
  </Block>
)


export default ColorBlock
