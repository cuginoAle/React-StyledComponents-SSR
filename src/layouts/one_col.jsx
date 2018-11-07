import React from 'react'
import s from 'styled-components'

const Div = s.div`
  border:1px solid red;
`
const OneCol = (props) => (
  <Div className='one_col'>
    {props.children}
  </Div>
)
// export default OneCol
export default OneCol
