import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SVGMicrosoft(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_5366_8207)">
        <Path d="M11.406 11.406H0V0h11.406v11.406z" fill="#F1511B" />
        <Path d="M24 11.406H12.594V0H24v11.406z" fill="#80CC28" />
        <Path d="M11.406 24H0V12.594h11.406V24z" fill="#00ADEF" />
        <Path d="M24 24H12.594V12.594H24V24z" fill="#FBBC09" />
      </G>
      <Defs>
        <ClipPath id="clip0_5366_8207">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SVGMicrosoft