import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Reviews(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        d="M17.333 4a2.667 2.667 0 00-2.666 2.667v10.666a2.667 2.667 0 102.666-2.666H6.667a2.667 2.667 0 102.666 2.666V6.667a2.667 2.667 0 10-2.666 2.666h10.666a2.667 2.667 0 100-5.333z"
        stroke="#151C24"
        strokeWidth={1.71429}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Reviews;
