import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function Minus(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      {...props}>
      <Rect
        x={0.535671}
        y={0.537624}
        width={23.6555}
        height={23.6555}
        rx={5.16946}
        stroke="#151C24"
        strokeWidth={1.07525}
      />
      <Path
        d="M9.674 12.365h4.838"
        stroke="#151C24"
        strokeWidth={1.07525}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default Minus;
