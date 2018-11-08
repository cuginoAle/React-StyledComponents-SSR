import React from 'react'
import s from 'styled-components'

const Div = s.div`
  border:1px dotted red;
`
const OneCol = (props) => (
  <Div className={`${props.className} one_col`}>
    {props.children}
  </Div>
)

export default OneCol
