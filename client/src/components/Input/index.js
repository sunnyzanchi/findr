import styled from 'astroturf'

// We have a separate `invalid` class instead of just using the selector
// because the browser is too eager to highlight invalid input
const Input = styled.input`
  color: #222;
  border: 0;
  border-bottom: 1px solid #ddd;
  font-family: 'Raleway', sans-serif;
  font-size: 18px;
  font-weight: 300;
  height: 28px;
  margin-bottom: 6px;
  padding: 0 12px 7px;
  width: 100%;

  &.invalid {
    border-bottom: 1px solid #ff5959;
  }

  &:invalid {
    box-shadow: none;
  }

  &:not(:only-of-type) {
  }
`

export default Input
