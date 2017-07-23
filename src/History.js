import React from 'react'
import { Flex, Block, InlineBlock as InBl } from 'glamor/jsxstyle'
import textColor from './textColor'
import checkHex from './checkHex'

const Logo = ({ color, size }) => (
  <svg fill={color} width={size} height={size} viewBox='0 0 24 24'>
    <path d='M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'/>
    <path d='M0 0h24v24H0z' fill='none' />
  </svg>
)

const HistoryColor = ({ color, onClick, current }) => (
  <InBl
    cursor='pointer'
    backgroundColor={color}
    padding={8}
    border='2px solid'
    borderColor={(current === color && checkHex(current)) ? textColor(color) : 'transparent'}
    borderRadius='100%'
    marginRight={8}
    marginBottom={4}
    onClick={onClick}
  />
)

const checkValidHex = current => checkHex(current) ? textColor(current) : '#fff'

const History = ({ history, onChange, current, clear }) => (
  <Flex justifyContent='space-between' alignItems='center' position='fixed' left={0} right={0} top={0} padding={16}>
    <Logo size={36} color={checkValidHex(current)} />
    <Block textAlign='right' maxWidth='87.5%'>
      <Flex flexWrap='wrap' justifyContent='flex-end' marginBottom={4}>
        {
          history.length > 0
          && (
            history.map((color, i) => (
              <HistoryColor
                key={i}
                color={color}
                current={current}
                onClick={() => onChange(color)}
              />
            ))
          )
        }
      </Flex>
      <Block>
        <InBl opacity='.5' color={checkValidHex(current)} fontSize='14' marginRight={16}>
          History
        </InBl>
        <InBl opacity='.5' color={checkValidHex(current)} fontSize='14' onClick={() => clear()}>
          Clear
        </InBl>
      </Block>
    </Block>
  </Flex>
)

export default History
