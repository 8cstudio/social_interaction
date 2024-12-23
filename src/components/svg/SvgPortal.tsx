import * as React from "react"
import Svg, { G, Circle, Defs, LinearGradient, Stop } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgPortal(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={70}
      height={70}
      viewBox="0 0 70 70"
      fill="none"
      {...props}
    >
      <G filter="url(#filter0_d_3829_15874)">
        <Circle cx={35.5} cy={34.5} r={24.5} fill="#000" />
        <Circle
          cx={35.5}
          cy={34.5}
          r={23.5}
          stroke="url(#paint0_linear_3829_15874)"
          strokeWidth={2}
        />
      </G>
      {/* <G filter="url(#filter1_f_3829_15874)">
        <Circle cx={35} cy={35} r={11} fill="#008CFF" />
      </G> */}
      <Defs>
        <LinearGradient
          id="paint0_linear_3829_15874"
          x1={35.5}
          y1={10}
          x2={35.5}
          y2={59}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F417F1" />
          <Stop offset={0.345} stopColor="#199DDF" />
          <Stop offset={0.71} stopColor="#ECA61B" />
          <Stop offset={1} stopColor="#EC1B87" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgPortal;
