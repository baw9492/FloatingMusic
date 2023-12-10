import React, { startTransition, useState } from "react"
import FuncWrap from "../../components/FuncWrap"
import SongSheetLink from "../../components/SongSheetLink"
import StateCtx from "../../fn/StateCtx"
import { Button, Text, TextInput, View } from "react-native"

export default () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <FuncWrap />
      <Button
        title="创建歌单"
        onPress={() => {
          setShow(true)
        }}
      />
      {/* <SongSheetLink /> */}
      {show && (
        <View /* style={{ display: show ? "flex" : "none" }} */>
          <TextInput placeholder="歌单名称" />
          <Button
            title="确认"
            onPress={() => {
              setShow(false)
            }}
          />
        </View>
      )}
    </>
  )
}
