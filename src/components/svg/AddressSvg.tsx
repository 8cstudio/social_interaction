import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function AddressSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        d="M4.6 9.6L11.8 4 19 9.6v8.8a1.6 1.6 0 01-1.6 1.6H6.2a1.6 1.6 0 01-1.6-1.6V9.6z"
        stroke="#151C24"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.398 20v-8h4.8v8"
        stroke="#151C24"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default AddressSvg;
