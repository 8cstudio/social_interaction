import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgPenguinSmall(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_5038_15158)">
        <Path
          d="M7.397 17.016c-.225 0-.731.197-.9.028-.225-.225 0-1.294 0-1.294H5.85s.225 1.069 0 1.294c-.169.14-.675-.028-.9-.028-.562 0-1.04.422-1.04.422h4.5c.028 0-.422-.422-1.013-.422zm5.625 0c-.225 0-.731.197-.9.028-.225-.225 0-1.294 0-1.294h-.647s.225 1.069 0 1.294c-.169.14-.675-.028-.9-.028-.563 0-1.04.422-1.04.422h4.5c.027 0-.422-.422-1.013-.422z"
          fill="#E08828"
        />
        <Path
          d="M2.925 7.594c-3.037 1.884-2.447 4.5-1.997 4.19 4.697-3.431 5.878-6.581 1.997-4.19zm12.15 0c-3.881-2.391-2.7.759 1.997 4.19.45.31 1.04-2.306-1.997-4.19z"
          fill="#3E4347"
        />
        <Path
          d="M13.5 4.922c0-2.419-2.025-4.36-4.5-4.36s-4.5 1.941-4.5 4.36c0 3.262-1.125 4.36-1.125 6.525 0 2.981 2.531 5.428 5.625 5.428s5.625-2.447 5.625-5.428c0-2.166-1.125-3.263-1.125-6.525z"
          fill="#3E4347"
        />
        <Path
          d="M12.375 5.287c0-3.487-2.84-2.812-2.84-.197H8.493c-.028-2.615-2.869-3.29-2.869.197 0 2.728-1.125 4.416-1.125 6.216 0 3.262 2.166 4.81 4.5 4.81s4.5-1.576 4.5-4.81c0-1.8-1.125-3.488-1.125-6.216z"
          fill="#fff"
        />
        <Path
          d="M11.531 4.781c0 .478-.253.844-.562.844-.31 0-.563-.366-.563-.844s.253-.843.563-.843c.31 0 .562.365.562.843zm-3.937 0c0 .478-.253.844-.563.844-.31 0-.562-.366-.562-.844s.253-.843.562-.843c.31 0 .563.365.563.843z"
          fill="#3E4347"
        />
        <Path
          d="M7.875 6.188h2.25c0 .703-.506 1.293-1.125 1.293S7.875 6.92 7.875 6.188z"
          fill="#E08828"
        />
        <Path
          d="M10.406 6.272L9 6.61l-1.406-.338c0-.9.619-1.603 1.406-1.603.787 0 1.406.731 1.406 1.603z"
          fill="#F29A2E"
        />
        <Path
          d="M9.478 5.006c.085.084.113.197.085.253-.029.056-.141 0-.225-.084-.085-.085-.113-.197-.085-.253.056-.028.169 0 .225.084zm-.956 0c-.084.084-.113.197-.084.253.028.056.14 0 .225-.084.084-.085.112-.197.084-.253-.056-.028-.169 0-.225.084z"
          fill="#3E4347"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5038_15158">
          <Path fill="#fff" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgPenguinSmall;