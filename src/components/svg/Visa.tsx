import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function Visa(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={58}
      height={40}
      viewBox="0 0 58 40"
      fill="none"
      {...props}>
      <Rect width={58} height={40} rx={6} fill="#F2F2F2" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.917 26.43h-3.433L11.91 16.32c-.122-.464-.382-.876-.763-1.07A10.955 10.955 0 008 14.18v-.389h5.53c.763 0 1.336.585 1.431 1.264l1.336 7.293 3.431-8.556h3.338L17.917 26.43zm7.057 0h-3.242l2.67-12.639h3.241l-2.67 12.64zm6.864-9.137c.095-.68.668-1.07 1.335-1.07 1.05-.098 2.193.098 3.147.583l.573-2.721a8.002 8.002 0 00-2.956-.585c-3.147 0-5.437 1.75-5.437 4.18 0 1.849 1.622 2.82 2.767 3.404 1.239.583 1.716.972 1.62 1.555 0 .875-.954 1.264-1.906 1.264-1.145 0-2.29-.291-3.338-.778l-.572 2.722c1.145.486 2.383.681 3.528.681 3.529.096 5.721-1.653 5.721-4.278 0-3.306-4.482-3.5-4.482-4.957zm15.829 9.137l-2.575-12.639h-2.765c-.572 0-1.145.39-1.335.973L36.225 26.43h3.337l.666-1.846h4.101l.382 1.846h2.956zm-4.863-9.235l.953 4.764h-2.67l1.717-4.764z"
        fill="#172B85"
      />
    </Svg>
  );
}

export default Visa;
