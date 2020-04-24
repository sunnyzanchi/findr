import { h } from 'preact'
import { useState } from 'preact/hooks'

import Input from '.'

export default {
  title: 'Input',
  component: Input,
}

export const Default = () => {
  const [value, setValue] = useState('')

  return <Input onInput={e => setValue(e.target.value)} value={value} />
}
