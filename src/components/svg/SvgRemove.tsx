import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgRemove(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Circle cx={12} cy={12} r={7} fill="#fff" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-14-.75a.75.75 0 000 1.5h8a.75.75 0 000-1.5H8z"
        fill="#EA4335"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgRemove
