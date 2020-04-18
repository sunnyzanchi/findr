import { h } from 'preact'
import styled from 'astroturf'

const Wrapper = styled.div`
  align-items: center;
  background: #1ac8ff;
  border-radius: 50%;
  bottom: 22px;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-family: sans-serif;
  font-size: 48px;
  height: 64px;
  justify-content: center;
  position: absolute;
  right: 20px;
  width: 64px;
`

const FULL_WIDTH_PLUS = '\uFF0B'

const FAB = ({ ...props }) => <Wrapper {...props}>{FULL_WIDTH_PLUS}</Wrapper>

export default FAB
