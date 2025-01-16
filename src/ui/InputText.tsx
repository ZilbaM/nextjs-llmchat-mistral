import React, { useState } from 'react'

type Props = {
    type: 'text' | 'number' | 'password'
    placeholder: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    fullWidth?: boolean
    inputId?: string
}

const InputText : React.FC<Props> = function({
    type= 'text',
    placeholder= '',
    value = '',
    onChange,
    onKeyDown,
    fullWidth = false,
    inputId
}: Props) {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
    }

  return (
    <div className={' ' + (fullWidth ? 'w-full' : '')}>
      <input onKeyDown={onKeyDown} id={inputId} className='focus:outline-none w-full py-2' type={type} placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  )
}

export default InputText