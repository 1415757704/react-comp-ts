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
+ jest单元测试 + testing-library

#### Menu
+ 对于组件，使用类似插槽的方式而不是使用json的方式来控制children的显示