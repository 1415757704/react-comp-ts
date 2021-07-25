import React, {ButtonHTMLAttributes, AnchorHTMLAttributes} from "react";
import classNames from 'classnames'

export type TButtonSize = 'lg' | 'sm'
export type TButtonType = 'primary' | 'default' | 'danger' | 'link'

interface IBaseButtonProps {
    className?: string;
    disabled?: boolean;
    btnType?: TButtonType;
    children?: React.ReactNode;
    size?: TButtonSize;
    href?: string;
}

type NativeButtonProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = IBaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    const { className, btnType, size, disabled, href, children, ...restProps } = props
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': btnType === 'link' && disabled
    })
    
    if (btnType === 'link' && href) {
        return (
          <a
            className={classes}
            href={href}
            {...restProps}
          >
            {children}
          </a>
        )
    } else {
      return (
        <button
          className={classes}
          disabled={disabled}
          {...restProps}
        >
          {children}
        </button>
      )
    }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button