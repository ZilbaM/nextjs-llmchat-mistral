import React, { useState } from 'react'

type Props = {
    type: 'text' | 'number' | 'password'
    placeholder: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    fullWidth?: boolean
}

const InputText : React.FC<Props> = function({
    type= 'text',
    placeholder= '',
    value = '',
    onChange,
    fullWidth = false
}: Props) {

    const [state, setState] = useState<string | number | undefined>(value)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value)
        onChange?.(e)
    }

  return (
    <div className={' ' + (fullWidth ? 'w-full' : '')}>
      <input className='focus:outline-none w-full py-2' type={type} placeholder={placeholder} value={state} onChange={handleChange} />
    </div>
  )
}

export default InputText