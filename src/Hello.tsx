import React from 'react';

interface IProps{
  message?: string; // 必须声明为可选属性
}

const Hello: React.FC<IProps> = (props) => {
  return (
    <div>{props.message}</div>
  )
}

Hello.defaultProps = {
  message: 'Hello'
}

export default Hello