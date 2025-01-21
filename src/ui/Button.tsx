import clsx from 'clsx';
import React from 'react'

type Props = {
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant: 'contained' | 'outlined'
    buttonId?: string
}

const Button : React.FC<React.PropsWithChildren<Props>> = function({
    onClick,
    disabled,
    loading,
    children,
    variant = 'contained',
    buttonId
}: React.PropsWithChildren<Props>) {
  return (
        <button
            id={buttonId}
            className={clsx({
                'opacity-50': loading || disabled,
                'bg-amber-400 text-white enabled:hover:bg-transparent enabled:hover:text-amber-600': variant === 'contained',
                'border border-black text-black enabled:hover:bg-black enabled:hover:text-white': variant === 'outlined',
                'disabled:cursor-not-allowed transition-all px-4 py-2 rounded-sm' : true

            })}
            disabled={disabled || loading}
            role="button"
            onClick={onClick}
            >
            {loading ? '...' : children}
        </button>
  )
}

export default Button