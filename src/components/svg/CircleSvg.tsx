import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function CircleSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      {...props}>
      <Circle cx={13.5} cy={13.5} r={13.5} fill="#E04444" />
      <Path
        d="M18 9l-9 9M9 9l9 9"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CircleSvg;
