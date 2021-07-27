import React, { CSSProperties, createContext, useState } from 'react';
import classNames from 'classnames'
import { IMenuItemProps } from './menu-item'

export enum MenuMode {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

const MENU = 'menu'

interface IMenuProp {
 mode: MenuMode;
 className: string;
 defaultIndex: string;
 onSelect: (selectedIndex: string) => void;
 style: CSSProperties;
 defaultOpenSubMenus: string[]
}

interface IMenuContext {
  index: string;
  onSelect?: (index: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({
  index: '0', 
})

const Menu: React.FC<Partial<IMenuProp>> = (props) => {
  const {mode, style, className, children, defaultIndex, onSelect} = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames(MENU, className, {
    [`${MENU}-${MenuMode.VERTICAL}`]: mode === MenuMode.VERTICAL,
    [`${MENU}-${MenuMode.HORIZONTAL}`]: mode !== MenuMode.VERTICAL,
  })
  const handleClick = (index: string) => {
    setActive(index)
    onSelect && onSelect(index)
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }
  const menuContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={ menuContext }>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu