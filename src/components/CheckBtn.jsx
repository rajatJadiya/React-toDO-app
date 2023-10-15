import React from 'react'
import {FiCircle,FiCheckCircle} from 'react-icons/fi'

const CheckBtn = ({complete}) => {
  return (
    <>
       { !complete ? <FiCircle size={35} color={"#0d9488"} /> :
        <FiCheckCircle size={35} color={"#0d9488"} />}
    </>
  )
}

export default CheckBtn