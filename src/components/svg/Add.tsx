import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function Add(props: any) {
  
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Rect
        x={1}
        y={1}
        width={22}
        height={22}
        rx={7}
        stroke={props?.stroke?props?.stroke:"#151C24"}
        strokeWidth={2}
      />
      <Path
        d="M9.393 12h4.695M11.74 9.652v4.696"
        stroke={props?.stroke?props?.stroke:"#151C24"}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default Add;
