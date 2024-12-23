import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Sattellite(props) {
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
        d="M9.333 20.556l-2.666-6.223L4 20.556h5.333z"
        stroke="#E4E7EC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.504 12.853c1.15 1.15 1.724 1.725 1.587 2.612a2.717 2.717 0 01-.03.153c-.213.87-.8 1.114-1.97 1.6A8.826 8.826 0 015.561 5.685c.484-1.17.727-1.755 1.6-1.97.04-.008.11-.024.15-.03.89-.136 1.464.438 2.613 1.588l7.58 7.58zM18.222 6.333a1.778 1.778 0 100-3.555 1.778 1.778 0 000 3.555zM12.444 7.34l4.634-1.425-1.632 4.444"
        stroke="#E4E7EC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Sattellite
