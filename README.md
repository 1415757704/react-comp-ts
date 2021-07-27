### 组件库开发 --react typescript
#### Button
+ 利用classnames整个class
```
const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': btnType === 'link' && disabled
})
```
+ Partial将所有的属性都变成可选

```
// 按钮默认属性
type NativeButtonProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
// a标签默认属性
type AnchorButtonProps = IBaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
```
+ 函数组件的声明方式
```
const Button: React.FC<ButtonProps> = (props) => {}
```
+ 声明属性默认值
```
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}
```
+ scss对于文件的分割，将文件使用_开头进行命名，在打包编译的时候，不会将文件进行单独打包，所有这些文件都导入到单个主SCSS文件，即是不以_开头的scss文件
+ 对于原生button的其他属性，使用...restProps挂载到button上即可
+ jest单元测试 + testing-library

#### Menu
+ 对于组件，使用类似插槽的方式而不是使用json的方式来控制children的显示
+ 利用context从父组件中传递值到子组件中，引入是引用类似插槽的方式，在父组件中的children是无法通过props传递属性值到子组件的，所以必须利用context的方式进行传递
+ flex box布局的使用

#### context得使用
+ 在高阶组件中，使用context进行父子组件得数据传递

```
import { createContext } from 'react'

interface IContext {
  index: string
}

const defaultContext = {
  index: 0
}
const MenuContext = createContext<Partial<IContext>>(defaultContext)

render() {
  const context = {
    index
  }
  return (
    <MenuContext.Provider value={context}>
      <SubMenu />
    </MenuContext.Provider>
  )
}
```

#### 对于children进行定制，传入自定义的props
```
const { children } = this.props;
React.Children.map(children, (child, index) => {
  const childElement = child as React.FunctionComponentElement<IMenuItemProps>
  const { displayName } = childrenElement.type
  // 需要在子组件中声明displayName
  if (displayName === 'MenuItem') {
    return React.cloneElement(children, {
      index: 0
    })
  } else {
    console.error("Warning: Menu has a child which is not a MenuItem component")
  }
})
```

+ hook api的对比  
  
  > https://zhuanlan.zhihu.com/p/117577458
  + createRef、useRef
```
    1.useRef 在 react hook 中的作用, 正如官网说的, 它像一个变量, 类似于 this , 它就像一个盒子, 你可以存放任何东西.

    2.createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用(persist)。

    const UseCreateRef = () => {
      let inputElement = createRef<HTMLInputElement>();
      const focusHandle = () => {
          // if(inputElement.current){
          //     inputElement.current.focus();
          // }
          // 或者----告知ts： inputElement.current的值非空
          inputElement.current!.focus();
      }
      return (
          <div className="content">
              <input ref={inputElement} placeholder="createRef API" />
              <Button onClick={focusHandle}>点击获取焦点</Button>
          </div>
      )
    }

    const UseUseRef = () => {
      const inputElement = useRef<HTMLInputElement | null>(null);
      const focusHandle = () => {
          if(inputElement.current) {
              inputElement.current.focus();
          }
      }
      return (
          <div className="content">
              <input ref={inputElement} placeholder="useRef API" />
              <Button onClick={focusHandle}>点击获取焦点</Button>
          </div>
      )
    }
```

+ useRef拿到前面的值
```
hook的声明周期：函数组件被调用 -> 执行代码 ->根据return的JSX渲染DOM -> 执行useEffect -> 函数组件被重新调用 -> 执行代码 -> 根据return的JSX重新渲染DOM -> 执行useEffect。（循环往复）。  
第一次UseRefDemod被执行，参数renderIndex为1，ref.current先是undefined （因为这时useEffect还没有被调用），然后根据return的JSX，渲染DOM，页面上被渲染出ref.current的值 -> undefined，接着 useEffect被调用，此时ref 的current值被赋值，也就是1。  
第二次UseRefDemod执行，参数renderIndex为2，ref.current先是undefined，然后return JSX渲染DOM，页面上本渲染出的ref.current为1（此时还没有被赋值）,接着useEffect调用，此时ref.current才会被赋值为2，但是已经渲染出来了，不会再变的，页面上就还是上一次的1，也就是上一次的值。
const UseRefDemod = () => {
  const [renderIndex, setRenderIndex] = useState(1);
  const ref = useRef<number | null>(null);
  useEffect(() => {
      ref.current = renderIndex
  })

  return (
      <div className="demoa">
          <span className="item_title">当前的index是: {renderIndex}</span>
          <span className="item_title">上一个index是: {ref.current}</span>
          <Button style={{marginLeft: 0}} onClick={() => setRenderIndex(prev => prev + 1)}>
              点击让renderIndex加1
          </Button>
      </div>
  );
}
```