import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Messenger(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={46}
      height={46}
      viewBox="0 0 46 46"
      fill="none"
      {...props}
    >
      <Path
        d="M44.61 23.177c0 12.15-9.85 22-22 22s-22-9.85-22-22 9.85-22 22-22 22 9.85 22 22z"
        fill="#fff"
        stroke="#151C24"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.768 25.831l-2.845-2.925-5.48 3 6.007-6.31 2.845 2.926 5.477-3-6.005 6.31zm-1.16-13.654c-6.074 0-10.999 4.559-10.999 10.183 0 3.199 1.594 6.053 4.087 7.92v3.897l3.754-2.061c1 .277 2.061.427 3.159.427 6.076 0 11-4.56 11-10.183 0-5.624-4.924-10.183-11-10.183z"
        fill="#151C24"
      />
    </Svg>
  )
}

export default Messenger
