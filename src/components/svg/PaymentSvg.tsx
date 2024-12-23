import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PaymentSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        d="M18.4 8.3H5.6A1.6 1.6 0 004 9.9v8a1.6 1.6 0 001.6 1.6h12.8a1.6 1.6 0 001.6-1.6v-8a1.6 1.6 0 00-1.6-1.6z"
        stroke="#151C24"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.199 19.5V6.7a1.6 1.6 0 00-1.6-1.6h-3.2a1.6 1.6 0 00-1.6 1.6v12.8"
        stroke="#151C24"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default PaymentSvg;
