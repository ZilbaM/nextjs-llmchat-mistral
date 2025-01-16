import React from 'react'

type Props = {
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant: 'contained' | 'outlined'
}

const Button : React.FC<React.PropsWithChildren<Props>> = function({
    onClick,
    disabled,
    loading,
    children,
    variant = 'contained'
}: React.PropsWithChildren<Props>) {
  return (
        <button
            className={`${loading ? 'opacity-50' : ''} ${disabled ? 'opacity-50' : ''} ${variant === 'contained' ? 'bg-amber-400 text-white' : 'border border-black text-black enabled:hover:bg-black disabled:cursor-not-allowed enabled:hover:text-white  transition-all' } px-4 py-2 rounded-sm`}
            disabled={disabled || loading}
            role="button"
            onClick={onClick}
            >
            {loading ? '...' : children}
        </button>
  )
}

export default Button