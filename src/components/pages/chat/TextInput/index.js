import React, { useRef } from 'react'
import styled from 'styled-components'
import { Box } from '@rebass/grid'
import { Input } from '../../../../components'
import key from '../../../../utils/key'

export default ({ onSend }) => {
  const selfRef = useRef(null)

  const handleGenerate = () => {
    const value = selfRef.current.value
    if (value.length > 0) {
      selfRef.current.value = ''
      onSend && onSend(value)
    }
  }

  return (
    <Wrap>
      <Input
        style={{ position: 'absolute', bottom: '0' }}
        ref={selfRef}
        placeholder="Enter your text here"
        onKeyDown={e => key(e, 'Enter', handleGenerate)}
      />
    </Wrap>
  )
}

const Wrap = styled(Box)`
  height: 10vh;
  max-height: 10vh;
  position: relative;
`
