import React from 'react'
import Svg, { Circle } from 'react-native-svg'
import dv from '../styles/dv'

export default () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Svg style={{ width: 44, height: 44, overflow: 'hidden' }}>
      <Circle
        cx="22"
        cy="22"
        r="20"
        fill="none"
        stroke="gray"
        strokeWidth={4}
      />

      <Circle
        cx="22"
        cy="22"
        r="20"
        fill="none"
        stroke={dv.themeColor}
        strokeWidth={4}
        strokeDasharray={`${10 * Math.PI} ${40 * Math.PI}`}
        origin={[22, 22]}
        rotation={-90}
      />
    </Svg>)

}
