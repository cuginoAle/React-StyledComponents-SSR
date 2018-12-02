import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  
`
const OneCol = (props) => (
  <Div className={`${props.className} one_col`}>
    {props.children}
  </Div>
)

export default OneCol
