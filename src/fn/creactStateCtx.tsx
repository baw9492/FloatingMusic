/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, createContext, useContext, PropsWithChildren } from "react";
const _Ctx = createContext<null | StateCtx<any>>(null);
export const use_Ctx = () => useContext(_Ctx);
export function _CtxProvider(props: PropsWithChildren<{ initValue: any }>) {
  const [value, setValue] = useState(props.initValue);
  return <_Ctx.Provider value={{ value, setValue }}>{props.children}</_Ctx.Provider>;
}
