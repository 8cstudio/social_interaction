import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Master(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={38}
      height={23}
      viewBox="0 0 38 23"
      fill="none"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.632 20.05a11.337 11.337 0 01-7.33 2.667C5.06 22.717 0 17.717 0 11.55S5.06.383 11.301.383c2.797 0 5.357 1.004 7.33 2.668A11.337 11.337 0 0125.963.383c6.242 0 11.301 5 11.301 11.167s-5.06 11.167-11.3 11.167a11.337 11.337 0 01-7.331-2.668z"
        fill="#ED0006"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.63 20.05c2.43-2.05 3.972-5.097 3.972-8.5 0-3.403-1.541-6.451-3.971-8.5A11.337 11.337 0 0125.96.384c6.242 0 11.302 5 11.302 11.167s-5.06 11.167-11.302 11.167a11.337 11.337 0 01-7.33-2.668z"
        fill="#F9A000"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.63 20.05c2.43-2.049 3.971-5.097 3.971-8.5 0-3.403-1.54-6.45-3.97-8.499-2.43 2.048-3.97 5.096-3.97 8.5 0 3.402 1.54 6.45 3.97 8.498z"
        fill="#FF5E00"
      />
    </Svg>
  );
}

export default Master;
