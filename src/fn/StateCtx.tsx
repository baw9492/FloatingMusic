/* eslint-disable react-hooks/rules-of-hooks */
import React, { PropsWithChildren, createContext, useContext, useState } from "react";

export default class StateCtx<T> {
  private stateCtx;
  readonly Provider;
  readonly useStateCtx;

  constructor(initValue: T) {
    this.stateCtx = createContext<null | {
      value: T;
      setValue: React.Dispatch<React.SetStateAction<T>>;
    }>(null);
    this.useStateCtx = () => useContext(this.stateCtx);
    this.Provider = (props: PropsWithChildren) => {
      const [value, setValue] = useState(initValue);
      return (
        <this.stateCtx.Provider value={{ value, setValue }}>
          {props.children}
        </this.stateCtx.Provider>
      );
    };
  }
  /** 使用前确保该组件已被 StateCtx.Provider 包裹, 否则点击时只会打印初始值 */
}
