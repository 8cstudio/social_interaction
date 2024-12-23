import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import {colors} from '../../assets/data/colors';
import {fontSize} from '../../assets/data/TypeScript';
import {fontsInter} from '../../assets/fonts/Fonts';
export const SVG = ({
  icon,
  width,
  height,
  black,
  text,
  color,
  stroke,
  fill,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
}: any) => {
  return (
    <View style={styles.container}>
      <Svg
        width={width}
        height={height}
        //   viewBox="0,0,50,50"
        fill={fill}>
        {/* <LinearGradient id="gradi" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.textColor} />
                <Stop offset="0.5" stopColor={colors.textColor} />
                <Stop offset="1" stopColor={colors.textColor} />
              </LinearGradient> */}
        <Path
          d={icon}
          fill={color}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
        />
      </Svg>
    </View>
  );
};
export const SVGObj = ({icon}: any) => {
  return (
    <View style={styles.container}>
      <Svg width={icon?.width} height={icon?.height} fill={'none'}>
        {/* <LinearGradient id="gradi" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.textColor} />
                <Stop offset="0.5" stopColor={colors.textColor} />
                <Stop offset="1" stopColor={colors.textColor} />
              </LinearGradient> */}
        <Path
          d={icon?.d}
          fill={icon?.fill}
          fillRule={icon?.fillrule}
          clipRule={icon?.cliprule}
          strokeLinecap={icon?.strokelinecap}
          strokeLinejoin={icon?.strokelinejoin}
          stroke={icon?.stroke}
          strokeWidth={icon?.strokewidth}
        />
      </Svg>
    </View>
  );
};
export const SVG2 = ({
  icon,
  path1,
  path2,
  width,
  height,
  black,
  text,
  color1,
  color2,
  stroke,
  fill,
  liked,
  col,
}: any) => {
  return (
    <View style={styles.container}>
      <Svg
        width={width}
        height={height}
        //   viewBox="0,0,50,50"
        fill={'none'}>
        {/* <LinearGradient id="gradi" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.textColor} />
                <Stop offset="0.5" stopColor={colors.textColor} />
                <Stop offset="1" stopColor={colors.textColor} />
              </LinearGradient> */}
        <Path
          d={icon?.path1}
          fill={col ? col : icon?.fill1}
          stroke={icon?.stroke1}
          strokeWidth={icon?.strokewidth1}
          strokeLinecap={icon?.strokelinecap1}
          strokeLinejoin={icon?.strokelinejoin1}
        />
        <Path
          d={icon?.path2}
          fill={col ? col : icon?.fill2}
          stroke={icon?.stroke2}
          strokeWidth={icon?.strokewidth2}
          strokeLinecap={icon?.strokelinecap2}
          strokeLinejoin={icon?.strokelinejoin2}
        />
      </Svg>
    </View>
  );
};
export const SVG3 = ({icon, height, width, col}: any) => {
  return (
    <View style={styles.container}>
      <Svg
        width={icon.width}
        height={icon.height}
        //   viewBox="0,0,50,50"
        fill={'none'}>
        {/* <LinearGradient id="gradi" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.textColor} />
                <Stop offset="0.5" stopColor={colors.textColor} />
                <Stop offset="1" stopColor={colors.textColor} />
              </LinearGradient> */}
        <Path
          d={icon.path1}
          fill={col ? col : icon.fill1}
          stroke={icon.stroke1}
          strokeWidth={icon.strokewidth1}
          strokeLinecap={icon.strokelinecap1}
          strokeLinejoin={icon.strokelinejoin1}
        />
        <Path
          d={icon.path2}
          fill={col ? col : icon.fill2}
          stroke={icon.stroke2}
          strokeWidth={icon.strokewidth2}
          strokeLinecap={icon.strokelinecap2}
          strokeLinejoin={icon.strokelinejoin2}
        />
        <Path
          d={icon.path3}
          fill={col ? col : icon.fill3}
          stroke={icon.stroke3}
          strokeWidth={icon.strokewidth3}
          strokeLinecap={icon.strokelinecap3}
          strokeLinejoin={icon.strokelinejoin3}
        />
      </Svg>
    </View>
  );
};
export const SVG6 = ({icon, height, width, col}: any) => {
  return (
    <View style={styles.container}>
      <Svg
        width={icon.width}
        height={icon.height}
        //   viewBox="0,0,50,50"
        fill={'none'}>
        {/* <LinearGradient id="gradi" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.textColor} />
                <Stop offset="0.5" stopColor={colors.textColor} />
                <Stop offset="1" stopColor={colors.textColor} />
              </LinearGradient> */}
        <Path
          d={icon.path1}
          fill={col ? col : icon.fill1}
          stroke={icon.stroke1}
          strokeWidth={icon.strokewidth1}
          strokeLinecap={icon.strokelinecap1}
          strokeLinejoin={icon.strokelinejoin1}
        />
        <Path
          d={icon.path2}
          fill={col ? col : icon.fill2}
          stroke={icon.stroke2}
          strokeWidth={icon.strokewidth2}
          strokeLinecap={icon.strokelinecap2}
          strokeLinejoin={icon.strokelinejoin2}
        />
        <Path
          d={icon.path3}
          fill={col ? col : icon.fill3}
          stroke={icon.stroke3}
          strokeWidth={icon.strokewidth3}
          strokeLinecap={icon.strokelinecap3}
          strokeLinejoin={icon.strokelinejoin3}
        />
        <Path
          d={icon.path4}
          fill={col ? col : icon.fill4}
          stroke={icon.stroke4}
          strokeWidth={icon.strokewidth4}
          strokeLinecap={icon.strokelinecap4}
          strokeLinejoin={icon.strokelinejoin4}
        />
        <Path
          d={icon.path5}
          fill={col ? col : icon.fill5}
          stroke={icon.stroke5}
          strokeWidth={icon.strokewidth5}
          strokeLinecap={icon.strokelinecap5}
          strokeLinejoin={icon.strokelinejoin5}
        />
        <Path
          d={icon.path6}
          fill={col ? col : icon.fill6}
          stroke={icon.stroke6}
          strokeWidth={icon.strokewidth6}
          strokeLinecap={icon.strokelinecap6}
          strokeLinejoin={icon.strokelinejoin6}
        />
      </Svg>
    </View>
  );
};
export function Dishes(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M25.684 23.892a4.736 4.736 0 01-4.595 3.588H6.959a4.736 4.736 0 01-4.596-3.588h23.32z"
        fill="#151C24"
      />
      <Path
        d="M1.467 22.099h25.114a.897.897 0 110 1.794H1.467a.897.897 0 110-1.794z"
        fill="#151C24"
      />
      <Path
        d="M1.47 22.099v-.059c0-.848.338-1.663.94-2.261.27-.269.538-.539.725-.859.462-.79.284-2.05.89-2.716.613-.673 1.886-.613 2.62-1.142.735-.529 1.08-1.756 1.912-2.124.824-.365 1.963.203 2.858.014.876-.184 1.687-1.168 2.608-1.168s1.733.984 2.609 1.169c.894.189 2.034-.38 2.858-.015.832.368 1.177 1.595 1.912 2.125.734.529 2.007.469 2.62 1.141.606.666.427 1.927.89 2.716.15.258.337.447.534.62.71.618 1.134 1.5 1.134 2.44v.119H1.47z"
        fill="#E6E9ED"
      />
      <Path
        d="M2.69 24.79h22.667a4.72 4.72 0 00.327-.898H2.364c.078.315.19.614.326.897zM26.58 21.98c0-.265-.037-.526-.101-.778H1.586a3.203 3.203 0 00-.115.838v.059h25.11v-.118z"
        fill="#151C24"
      />
      <Path
        d="M27.015 21.729a3.705 3.705 0 00-1.275-2.527 2.042 2.042 0 01-.441-.508c-.166-.284-.236-.68-.309-1.1-.105-.604-.214-1.227-.636-1.69-.427-.47-1.04-.637-1.635-.8-.408-.11-.793-.216-1.055-.405-.262-.188-.484-.52-.719-.872-.341-.512-.694-1.042-1.274-1.299-.573-.253-1.199-.159-1.804-.069-.422.064-.82.123-1.143.056-.308-.066-.642-.278-.994-.502-.499-.318-1.063-.678-1.706-.678-.644 0-1.208.36-1.707.677-.352.224-.685.436-.994.502-.322.068-.72.008-1.143-.056-.604-.09-1.23-.184-1.804.07-.58.256-.933.786-1.274 1.298-.235.351-.457.684-.719.872-.262.19-.647.295-1.056.406-.593.162-1.207.33-1.634.798-.422.464-.53 1.087-.636 1.69-.073.42-.143.817-.31 1.102-.162.278-.423.538-.654.767a3.658 3.658 0 00-1.055 2.266c-.531.18-.917.678-.917 1.269 0 .741.604 1.345 1.345 1.345h.563a5.175 5.175 0 004.93 3.588h14.13a5.175 5.175 0 004.93-3.588h.562c.742 0 1.345-.604 1.345-1.345 0-.59-.383-1.086-.91-1.267zm-24.29-1.632c.27-.267.575-.57.798-.95.248-.424.334-.92.419-1.4.087-.499.169-.97.415-1.241.251-.276.716-.402 1.208-.537.466-.127.95-.26 1.343-.543.394-.284.672-.7.94-1.103.283-.424.55-.824.89-.975.337-.15.81-.077 1.31-.003.482.073.98.148 1.46.046.468-.098.887-.365 1.29-.622.434-.276.844-.537 1.226-.537s.791.26 1.224.537c.405.257.823.524 1.292.622.48.102.978.027 1.46-.046.5-.074.973-.145 1.308.003.342.15.608.55.892.975.268.403.546.82.94 1.102.393.284.876.416 1.343.544.492.134.956.26 1.207.536.247.271.328.743.416 1.241.084.48.17.976.418 1.4.197.335.439.567.627.731.537.468.875 1.1.959 1.773H1.95a2.754 2.754 0 01.775-1.553zm18.364 6.935H6.959a4.28 4.28 0 01-3.977-2.691h22.083a4.279 4.279 0 01-3.976 2.69zm5.492-3.588H1.467a.449.449 0 010-.897H26.58a.449.449 0 010 .897z"
        fill="#151C24"
      />
      <Path
        d="M6.4 19.856h-.896v.897H6.4v-.897zM7.745 17.614h-.897v.897h.897v-.897zM9.987 15.82H9.09v.897h.897v-.897zM11.334 18.063h-.896v.897h.896v-.897zM13.575 19.856h-.897v.897h.897v-.897zM14.92 14.475h-.897v.897h.897v-.897zM13.127 16.269h-.897v.897h.897v-.897zM16.266 18.063h-.897v.897h.897v-.897zM18.061 15.82h-.897v.897h.897v-.897zM11.334 14.026h-.896v.897h.896v-.897zM18.508 19.856h-.897v.897h.897v-.897zM20.301 18.063h-.897v.897h.897v-.897zM23.891 19.856h-.897v.897h.897v-.897zM21.2 16.269h-.897v.897h.897v-.897zM17.165 14.026h-.897v.897h.896v-.897zM14.61 8.395c-.462.442-1.036.992-1.036 2.043h.897c0-.668.335-.989.758-1.395.462-.442 1.036-.993 1.036-2.043 0-1.051-.574-1.601-1.035-2.044-.424-.406-.759-.727-.759-1.396 0-.667.335-.988.758-1.394.462-.442 1.036-.992 1.036-2.042h-.897c0 .667-.335.988-.758 1.394-.462.442-1.036.992-1.036 2.042 0 1.051.574 1.602 1.036 2.044.423.406.758.727.758 1.396 0 .668-.335.989-.759 1.395zM9.676 5.853c-.462.442-1.035.992-1.035 2.043 0 1.052.573 1.602 1.035 2.044.424.406.758.727.758 1.395h.897c0-1.05-.573-1.6-1.035-2.043-.423-.406-.758-.727-.758-1.396 0-.668.335-.989.758-1.395.462-.442 1.035-.993 1.035-2.044 0-1.05-.574-1.6-1.035-2.042-.424-.406-.758-.727-.758-1.394H8.64c0 1.05.574 1.6 1.035 2.042.424.406.758.726.758 1.394 0 .669-.334.99-.758 1.396zM5.193 12.432c-.461.442-1.035.992-1.035 2.043h.897c0-.668.335-.99.759-1.396.461-.442 1.035-.992 1.035-2.043 0-1.05-.574-1.601-1.035-2.043-.424-.407-.759-.728-.759-1.396 0-.668.335-.989.759-1.395.461-.441 1.035-.991 1.035-2.042h-.897c0 .668-.334.988-.758 1.394-.462.442-1.036.992-1.036 2.043 0 1.05.574 1.601 1.036 2.043.423.406.758.727.758 1.396 0 .668-.335.99-.759 1.396zM19.992 9.292c-.461.442-1.035.992-1.035 2.043h.897c0-.668.335-.989.758-1.395.462-.443 1.036-.993 1.036-2.044 0-1.05-.574-1.6-1.035-2.043-.424-.406-.759-.727-.759-1.396 0-.668.335-.988.758-1.394.462-.442 1.036-.992 1.036-2.042h-.897c0 .667-.335.988-.759 1.394-.46.442-1.035.991-1.035 2.042 0 1.051.574 1.602 1.035 2.044.424.406.759.727.759 1.395 0 .669-.335.99-.759 1.396z"
        fill="#151C24"
      />
    </Svg>
  )
}

export const SVGAdd = ({icon, width, height, black, text, color}: any) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 62 62" fill="none">
        {/* <LinearGradient id="gradi" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.textColor} />
                <Stop offset="0.5" stopColor={colors.textColor} />
                <Stop offset="1" stopColor={colors.textColor} />
              </LinearGradient> */}
        <Path fillRule="evenodd" clipRule="evenodd" d={icon} fill={'black'} />
      </Svg>
    </View>
  );
};
export const SVGPDF = ({icon, width, height, black, text, color}: any) => {
  return (
    <View style={styles.container}>
      <SVG width="26" height="26" fill="none">
        <Path
          d="M6.06686 13.8666H5.2002V12.1333H6.06686C6.29672 12.1333 6.51716 12.2246 6.67969 12.3871C6.84222 12.5497 6.93353 12.7701 6.93353 13C6.93353 13.2298 6.84222 13.4503 6.67969 13.6128C6.51716 13.7753 6.29672 13.8666 6.06686 13.8666ZM12.1335 17.3333V12.1333H13.0002C13.2301 12.1333 13.4505 12.2246 13.613 12.3871C13.7756 12.5497 13.8669 12.7701 13.8669 13V16.4666C13.8669 16.6965 13.7756 16.9169 13.613 17.0795C13.4505 17.242 13.2301 17.3333 13.0002 17.3333H12.1335Z"
          fill="black"
        />
        <Path
          d="M1.7334 2.6C1.7334 1.91044 2.00733 1.24912 2.49492 0.761522C2.98252 0.273928 3.64384 0 4.3334 0L18.5589 0L24.2667 5.70787V23.4C24.2667 24.0896 23.9928 24.7509 23.5052 25.2385C23.0176 25.7261 22.3563 26 21.6667 26H4.3334C3.64384 26 2.98252 25.7261 2.49492 25.2385C2.00733 24.7509 1.7334 24.0896 1.7334 23.4V2.6ZM6.06673 10.4H3.46673V19.0667H5.20007V15.6H6.06673C6.75629 15.6 7.41762 15.3261 7.90521 14.8385C8.3928 14.3509 8.66673 13.6896 8.66673 13C8.66673 12.3104 8.3928 11.6491 7.90521 11.1615C7.41762 10.6739 6.75629 10.4 6.06673 10.4ZM13.0001 10.4H10.4001V19.0667H13.0001C13.6896 19.0667 14.3509 18.7927 14.8385 18.3051C15.3261 17.8176 15.6001 17.1562 15.6001 16.4667V13C15.6001 12.3104 15.3261 11.6491 14.8385 11.1615C14.3509 10.6739 13.6896 10.4 13.0001 10.4ZM17.3334 19.0667V10.4H22.5334V12.1333H19.0667V13.8667H20.8001V15.6H19.0667V19.0667H17.3334Z"
          fill="black"
        />
      </SVG>
    </View>
  );
};
export const SVGPlay = ({icon, width, height, black, text, color}: any) => {
  return (
    <View style={styles.container}>
      <Svg
        width={width}
        height={height}
        //   viewBox="0,0,50,50"
      >
        {/* <LinearGradient id="gradi" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.textColor} />
                <Stop offset="0.5" stopColor={colors.textColor} />
                <Stop offset="1" stopColor={colors.textColor} />
              </LinearGradient> */}
        <Path
          d="M22.9064 11.2834C22.9064 7.26188 18.0056 4 11.9517 4C5.90508 4 1 7.26332 1 11.2848C1 15.3063 5.90508 18.5682 11.9546 18.5682C13.2922 18.5682 14.5679 18.401 15.7541 18.107C18.0215 20.4103 21.2315 20.6222 21.2315 20.6222C19.8578 19.4633 19.1472 18.1531 18.7897 16.9697C21.2949 15.6364 22.9064 13.5853 22.9064 11.2834Z"
          fill="#0AC0FA"
        />
        <Path
          d="M15.8845 10.6849C16.0866 10.7924 16.2556 10.9528 16.3735 11.149C16.4914 11.3452 16.5537 11.5697 16.5537 11.7986C16.5537 12.0275 16.4914 12.2521 16.3735 12.4483C16.2556 12.6445 16.0866 12.8049 15.8845 12.9124L10.4938 15.8438C9.62577 16.3163 8.55957 15.702 8.55957 14.7305V8.86722C8.55957 7.89528 9.62577 7.2814 10.4938 7.75306L15.8845 10.6849Z"
          fill="white"
        />
      </Svg>
    </View>
  );
};
export const SVGBuy = ({icon, width, height, black, text, color}: any) => {
  return (
    <View style={styles.container}>
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none">
        <Path
          d="M1.28728 1.21164C1.17683 1.43133 1.12251 1.70351 1.01389 2.24664L0.648953 4.07131C0.597233 4.3201 0.596832 4.57683 0.647776 4.82577C0.698719 5.07472 0.799935 5.31065 0.945226 5.51912C1.09052 5.72759 1.27683 5.90422 1.49275 6.03819C1.70868 6.17215 1.94967 6.26064 2.20098 6.29824C2.45229 6.33583 2.70863 6.32174 2.9543 6.25683C3.19998 6.19191 3.42982 6.07754 3.62976 5.92071C3.8297 5.76389 3.99552 5.5679 4.11709 5.34476C4.23865 5.12162 4.3134 4.87602 4.33675 4.62299L4.37947 4.20191C4.35634 4.46971 4.38933 4.7394 4.47633 4.99373C4.56333 5.24806 4.70243 5.48145 4.88474 5.67898C5.06704 5.87651 5.28855 6.03384 5.5351 6.14092C5.78166 6.248 6.04784 6.30247 6.31663 6.30085C6.58543 6.29923 6.85093 6.24156 7.09618 6.13152C7.34143 6.02148 7.56102 5.86149 7.74093 5.66177C7.92085 5.46206 8.05712 5.22701 8.14105 4.97165C8.22498 4.71629 8.25472 4.44622 8.22837 4.17872L8.27292 4.62299C8.29627 4.87602 8.37101 5.12162 8.49258 5.34476C8.61414 5.5679 8.77997 5.76389 8.97991 5.92071C9.17985 6.07754 9.40969 6.19191 9.65536 6.25683C9.90104 6.32174 10.1574 6.33583 10.4087 6.29824C10.66 6.26064 10.901 6.17215 11.1169 6.03819C11.3328 5.90422 11.5191 5.72759 11.6644 5.51912C11.8097 5.31065 11.9109 5.07472 11.9619 4.82577C12.0128 4.57683 12.0124 4.3201 11.9607 4.07131L11.5958 2.24664C11.4872 1.70351 11.4328 1.43194 11.3224 1.21164C11.2073 0.982205 11.0452 0.779537 10.8467 0.616789C10.6483 0.454042 10.4178 0.334853 10.1702 0.266958C9.93221 0.20166 9.65516 0.20166 9.10104 0.20166H3.50863C2.95451 0.20166 2.67745 0.20166 2.43945 0.266958C2.19191 0.334853 1.96141 0.454042 1.76292 0.616789C1.56443 0.779537 1.40238 0.982205 1.28728 1.21164ZM10.1305 7.21964C10.6074 7.22084 11.0764 7.0987 11.492 6.86508V7.52477C11.492 9.82605 11.492 10.977 10.7768 11.6916C10.2013 12.2677 9.34392 12.3794 7.83048 12.4013V10.2709C7.83048 9.70034 7.83048 9.41535 7.70782 9.20298C7.62748 9.06383 7.51193 8.94829 7.37279 8.86795C7.16042 8.74529 6.87543 8.74529 6.30483 8.74529C5.73424 8.74529 5.44925 8.74529 5.23688 8.86795C5.09773 8.94829 4.98219 9.06383 4.90185 9.20298C4.77919 9.41535 4.77919 9.70034 4.77919 10.2709V12.4013C3.26574 12.3794 2.40833 12.2671 1.83286 11.6916C1.11763 10.977 1.11763 9.82605 1.11763 7.52477V6.86508C1.53347 7.0988 2.00271 7.22095 2.47973 7.21964C3.18498 7.22014 3.86399 6.95221 4.37886 6.47024C4.90361 6.95361 5.59139 7.22122 6.30483 7.21964C7.01827 7.22116 7.70603 6.95356 8.23081 6.47024C8.74568 6.95221 9.42529 7.22014 10.1305 7.21964Z"
          fill="white"
        />
      </SVG>
    </View>
  );
};
export const SVGImage = ({icon, width, height, black, text, color}: any) => {
  return (
    <View style={styles.container}>
      <SVG width={width} height={height}>
        <Path
          d="M31.1667 17.9889C31.1639 20.0714 31.1483 21.8394 31.0307 23.2915C30.8933 24.9774 30.6114 26.3855 29.9824 27.5543C29.7079 28.0667 29.3594 28.5359 28.9482 28.9469C27.7681 30.1269 26.2665 30.661 24.3625 30.916C22.5024 31.1668 20.1167 31.1668 17.0751 31.1668H16.925C13.882 31.1668 11.4991 31.1668 9.63762 30.916C7.73504 30.661 6.23196 30.1269 5.05329 28.9469C4.00779 27.9014 3.46662 26.6009 3.18046 24.9873C2.89712 23.4006 2.84612 21.4286 2.83621 18.9792C2.83337 18.3559 2.83337 17.6971 2.83337 17.0001V16.9236C2.83337 13.8806 2.83337 11.4978 3.08412 9.63628C3.33912 7.7337 3.87321 6.23061 5.05329 5.05195C6.23196 3.87186 7.73504 3.33778 9.63762 3.08278C11.2923 2.86036 13.4201 2.83486 16.0112 2.83203C16.2735 2.83203 16.525 2.93621 16.7104 3.12165C16.8959 3.3071 17 3.55861 17 3.82086C17 4.08312 16.8959 4.33463 16.7104 4.52008C16.525 4.70552 16.2735 4.8097 16.0112 4.8097C13.3833 4.81253 11.4297 4.8352 9.90112 5.04061C8.21671 5.26728 7.20096 5.69795 6.45012 6.44878C5.69929 7.19961 5.27004 8.21678 5.04337 9.90261C4.81246 11.6168 4.80962 13.8664 4.80962 17.0001V18.1108L6.12996 16.9576C6.70871 16.4512 7.45826 16.1837 8.22683 16.2092C8.99541 16.2348 9.72557 16.5514 10.2695 17.095L15.922 22.7475C16.3605 23.1863 16.9398 23.4563 17.5579 23.51C18.1759 23.5636 18.7931 23.3975 19.3007 23.0408L19.6945 22.7645C20.4266 22.25 21.3117 21.999 22.2049 22.0528C23.0982 22.1066 23.9467 22.4619 24.6118 23.0606L28.3419 26.4181C28.7173 25.629 28.9411 24.5934 29.0601 23.1314C29.172 21.7544 29.1876 20.0828 29.189 17.9889C29.189 17.7267 29.2932 17.4752 29.4787 17.2897C29.6641 17.1043 29.9156 17.0001 30.1779 17.0001C30.4401 17.0001 30.6916 17.1043 30.8771 17.2897C31.0625 17.4752 31.1667 17.7267 31.1667 17.9889Z"
          fill="black"
        />
        <Path
          d="M24.7916 15.5833C21.7869 15.5833 20.2838 15.5833 19.3502 14.6497C18.4166 13.7161 18.4166 12.213 18.4166 9.20825C18.4166 6.2035 18.4166 4.70042 19.3502 3.76684C20.2838 2.83325 21.7869 2.83325 24.7916 2.83325C27.7964 2.83325 29.2995 2.83325 30.233 3.76684C31.1666 4.70042 31.1666 6.2035 31.1666 9.20825C31.1666 12.213 31.1666 13.7161 30.233 14.6497C29.2995 15.5833 27.7964 15.5833 24.7916 15.5833ZM27.6675 7.74908L25.5425 5.62409C25.3432 5.42511 25.0732 5.31335 24.7916 5.31335C24.5101 5.31335 24.24 5.42511 24.0408 5.62409L21.9158 7.74908C21.7281 7.9505 21.6259 8.2169 21.6308 8.49216C21.6357 8.76742 21.7472 9.03005 21.9418 9.22472C22.1365 9.41938 22.3991 9.53089 22.6744 9.53575C22.9496 9.54061 23.216 9.43843 23.4175 9.25075L23.7291 8.93909V12.0416C23.7291 12.3234 23.8411 12.5936 24.0403 12.7929C24.2396 12.9921 24.5098 13.1041 24.7916 13.1041C25.0734 13.1041 25.3437 12.9921 25.5429 12.7929C25.7422 12.5936 25.8541 12.3234 25.8541 12.0416V8.93909L26.1658 9.25075C26.2631 9.35514 26.3804 9.43887 26.5107 9.49694C26.641 9.55501 26.7817 9.58624 26.9244 9.58876C27.067 9.59127 27.2088 9.56503 27.3411 9.51159C27.4734 9.45815 27.5935 9.37862 27.6944 9.27772C27.7953 9.17683 27.8749 9.05665 27.9283 8.92435C27.9817 8.79205 28.008 8.65034 28.0055 8.50768C28.0029 8.36502 27.9717 8.22432 27.9136 8.09399C27.8556 7.96366 27.7718 7.84636 27.6675 7.74908Z"
          fill="black"
        />
      </SVG>
    </View>
  );
};

export const SvgObjPath1 = ({
  height,
  width,
  icon,
  fill,
  stroke,
  style,
  text,
}: any) => {
  return (
    <>
      <View style={[styles.container, style]}>
        <Svg
          width={width ? width : icon.width}
          height={height ? height : icon.height}
          fill={'none'}>
          <Path
            d={icon.d}
            fill={fill ? fill : icon.fill}
            fillRule={icon.fill_rule}
            clipRule={icon.clip_rule}
            strokeLinecap={icon.stroke_linecap}
            strokeLinejoin={icon.stroke_linejoin}
            stroke={stroke}
            strokeWidth={icon.stroke_width}
          />
        </Svg>
      </View>
      {text && (
        <Text
          style={{
            color: colors.black,
            fontSize: fontSize(9),
            fontFamily: fontsInter.f600,
            marginTop: -25,
          }}>
          {text}
        </Text>
      )}
    </>
  );
};

export const SvgObjPath2 = ({icon, fill1, fill2, stroke1, stroke2}: any) => {
  return (
    <View style={styles.container}>
      <Svg
        width={icon?.width}
        height={icon?.height}
        //   viewBox="0,0,50,50"
        fill={'none'}>
        {/* <LinearGradient id="gradi" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.textColor} />
                <Stop offset="0.5" stopColor={colors.textColor} />
                <Stop offset="1" stopColor={colors.textColor} />
              </LinearGradient> */}
        <Path
          d={icon?.d1}
          fill={fill1}
          stroke={stroke1}
          strokeWidth={icon?.stroke_width1}
          strokeLinecap={icon?.stroke_linecap1}
          strokeLinejoin={icon?.stroke_linejoin1}
        />
        <Path
          d={icon?.d2}
          fill={fill2}
          stroke={stroke2}
          strokeWidth={icon?.stroke_width2}
          strokeLinecap={icon?.stroke_linecap2}
          strokeLinejoin={icon?.stroke_linejoin2}
        />
      </Svg>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2, // backgroundColor: 'yellow', // Set the background color of the container
  },
});

export function SvgColor(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={37}
      height={37}
      viewBox="0 0 37 37"
      fill="none"
      {...props}>
      <Circle
        cx={18.5}
        cy={18.5}
        r={17}
        stroke="url(#paint0_linear_3440_5366)"
        strokeWidth={3}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3440_5366"
          x1={18.5}
          y1={0}
          x2={18.5}
          y2={37}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#F66" />
          <Stop offset={0.166667} stopColor="#66FF70" />
          <Stop offset={0.333333} stopColor="#FFF266" />
          <Stop offset={0.5} stopColor="#FF9466" />
          <Stop offset={0.666667} stopColor="#FF7866" />
          <Stop offset={0.833333} stopColor="#7066FF" />
          <Stop offset={1} stopColor="#FF66B0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
