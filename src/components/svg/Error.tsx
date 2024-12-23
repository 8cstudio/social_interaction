import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

function Error1(props: any) {
  return (
    <Svg
      width={45}
      height={46}
      viewBox="0 0 45 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.5 45.5C34.926 45.5 45 35.426 45 23S34.926.5 22.5.5 0 10.574 0 23s10.074 22.5 22.5 22.5z"
        fill="#FFEBEB"
      />
      <Path
        d="M22.5 33.8c5.964 0 10.8-4.835 10.8-10.8 0-5.965-4.836-10.8-10.8-10.8-5.965 0-10.8 4.835-10.8 10.8 0 5.965 4.835 10.8 10.8 10.8z"
        fill="#FF4C4C"
        stroke="#fff"
        strokeWidth={1.8}
      />
      <Rect
        x={21.5996}
        y={16.7002}
        width={1.8}
        height={8.1}
        rx={0.9}
        fill="#fff"
      />
      <Rect
        x={21.5996}
        y={26.6001}
        width={1.8}
        height={1.8}
        rx={0.9}
        fill="#fff"
      />
    </Svg>
  )
}

export default Error1
