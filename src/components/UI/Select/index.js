import styled from 'styled-components'

export default styled.button`
  padding: 2.2vh 1em;
  background: #fd8a25;
  opacity: ${props => (props.selected ? '1' : '0.5')};
  color: #fff;
  font-weight: bold;
  border: none;
`
