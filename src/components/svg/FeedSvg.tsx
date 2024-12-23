import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FeedSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M21 3.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6z"
        stroke="#E4E7EC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.898 8.513a.6.6 0 00-.898.52v5.933a.6.6 0 00.898.521l5.19-2.966a.6.6 0 000-1.042l-5.19-2.966z"
        stroke="#E4E7EC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default FeedSvg
