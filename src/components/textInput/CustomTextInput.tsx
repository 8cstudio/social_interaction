import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Text,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from '../customIcon/CustomIcon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../assets/data/colors';
const countries = [
  {dial_code: '+1'}, // United States
  {dial_code: '+1'}, // Canada
  {dial_code: '+7'}, // Russia
  {dial_code: '+20'}, // Egypt
  {dial_code: '+27'}, // South Africa
  {dial_code: '+30'}, // Greece
  {dial_code: '+31'}, // Netherlands
  {dial_code: '+32'}, // Belgium
  {dial_code: '+33'}, // France
  {dial_code: '+34'}, // Spain
  {dial_code: '+36'}, // Hungary
  {dial_code: '+39'}, // Italy
  {dial_code: '+40'}, // Romania
  {dial_code: '+41'}, // Switzerland
  {dial_code: '+43'}, // Austria
  {dial_code: '+44'}, // United Kingdom
  {dial_code: '+45'}, // Denmark
  {dial_code: '+46'}, // Sweden
  {dial_code: '+47'}, // Norway
  {dial_code: '+48'}, // Poland
  {dial_code: '+49'}, // Germany
  {dial_code: '+51'}, // Peru
  {dial_code: '+52'}, // Mexico
  {dial_code: '+53'}, // Cuba
  {dial_code: '+54'}, // Argentina
  {dial_code: '+55'}, // Brazil
  {dial_code: '+56'}, // Chile
  {dial_code: '+57'}, // Colombia
  {dial_code: '+58'}, // Venezuela
  {dial_code: '+60'}, // Malaysia
  {dial_code: '+61'}, // Australia
  {dial_code: '+62'}, // Indonesia
  {dial_code: '+63'}, // Philippines
  {dial_code: '+64'}, // New Zealand
  {dial_code: '+65'}, // Singapore
  {dial_code: '+66'}, // Thailand
  {dial_code: '+81'}, // Japan
  {dial_code: '+82'}, // South Korea
  {dial_code: '+84'}, // Vietnam
  {dial_code: '+86'}, // China
  {dial_code: '+90'}, // Turkey
  {dial_code: '+91'}, // India
  {dial_code: '+92'}, // Pakistan
  {dial_code: '+93'}, // Afghanistan
  {dial_code: '+94'}, // Sri Lanka
  {dial_code: '+95'}, // Myanmar
  {dial_code: '+98'}, // Iran
  {dial_code: '+212'}, // Morocco
  {dial_code: '+213'}, // Algeria
  {dial_code: '+216'}, // Tunisia
  {dial_code: '+234'}, // Nigeria
  {dial_code: '+254'}, // Kenya
  {dial_code: '+255'}, // Tanzania
  {dial_code: '+256'}, // Uganda
  {dial_code: '+260'}, // Zambia
  {dial_code: '+261'}, // Madagascar
  {dial_code: '+263'}, // Zimbabwe
  {dial_code: '+264'}, // Namibia
  {dial_code: '+265'}, // Malawi
  {dial_code: '+266'}, // Lesotho
  {dial_code: '+267'}, // Botswana
  {dial_code: '+268'}, // Swaziland (Eswatini)
  {dial_code: '+269'}, // Comoros
  {dial_code: '+291'}, // Eritrea
  {dial_code: '+297'}, // Aruba
  {dial_code: '+298'}, // Faroe Islands
  {dial_code: '+299'}, // Greenland
  {dial_code: '+350'}, // Gibraltar
  {dial_code: '+351'}, // Portugal
  {dial_code: '+352'}, // Luxembourg
  {dial_code: '+353'}, // Ireland
  {dial_code: '+354'}, // Iceland
  {dial_code: '+355'}, // Albania
  {dial_code: '+356'}, // Malta
  {dial_code: '+357'}, // Cyprus
  {dial_code: '+358'}, // Finland
  {dial_code: '+359'}, // Bulgaria
  {dial_code: '+370'}, // Lithuania
  {dial_code: '+371'}, // Latvia
  {dial_code: '+372'}, // Estonia
  {dial_code: '+373'}, // Moldova
  {dial_code: '+374'}, // Armenia
  {dial_code: '+375'}, // Belarus
  {dial_code: '+376'}, // Andorra
  {dial_code: '+377'}, // Monaco
  {dial_code: '+378'}, // San Marino
  {dial_code: '+380'}, // Ukraine
  {dial_code: '+381'}, // Serbia
  {dial_code: '+382'}, // Montenegro
  {dial_code: '+385'}, // Croatia
  {dial_code: '+386'}, // Slovenia
  {dial_code: '+387'}, // Bosnia and Herzegovina
  {dial_code: '+389'}, // North Macedonia
  {dial_code: '+420'}, // Czech Republic
  {dial_code: '+421'}, // Slovakia
  {dial_code: '+423'}, // Liechtenstein
  {dial_code: '+500'}, // Falkland Islands
  {dial_code: '+501'}, // Belize
  {dial_code: '+502'}, // Guatemala
  {dial_code: '+503'}, // El Salvador
  {dial_code: '+504'}, // Honduras
  {dial_code: '+505'}, // Nicaragua
  {dial_code: '+506'}, // Costa Rica
  {dial_code: '+507'}, // Panama
  {dial_code: '+508'}, // Saint Pierre and Miquelon
  {dial_code: '+509'}, // Haiti
  {dial_code: '+590'}, // Guadeloupe
  {dial_code: '+591'}, // Bolivia
  {dial_code: '+592'}, // Guyana
  {dial_code: '+593'}, // Ecuador
  {dial_code: '+594'}, // French Guiana
  {dial_code: '+595'}, // Paraguay
  {dial_code: '+596'}, // Martinique
  {dial_code: '+597'}, // Suriname
  {dial_code: '+598'}, // Uruguay
  {dial_code: '+670'}, // Timor-Leste
  {dial_code: '+672'}, // Norfolk Island
  {dial_code: '+673'}, // Brunei
  {dial_code: '+674'}, // Nauru
  {dial_code: '+675'}, // Papua New Guinea
  {dial_code: '+676'}, // Tonga
  {dial_code: '+677'}, // Solomon Islands
  {dial_code: '+678'}, // Vanuatu
  {dial_code: '+679'}, // Fiji
  {dial_code: '+680'}, // Palau
  {dial_code: '+681'}, // Wallis and Futuna
  {dial_code: '+682'}, // Cook Islands
  {dial_code: '+683'}, // Niue
  {dial_code: '+685'}, // Samoa
  {dial_code: '+686'}, // Kiribati
  {dial_code: '+687'}, // New Caledonia
  {dial_code: '+688'}, // Tuvalu
  {dial_code: '+689'}, // French Polynesia
  {dial_code: '+690'}, // Tokelau
  {dial_code: '+691'}, // Micronesia
  {dial_code: '+692'}, // Marshall Islands
  {dial_code: '+850'}, // North Korea
  {dial_code: '+852'}, // Hong Kong
  {dial_code: '+853'}, // Macao
  {dial_code: '+855'}, // Cambodia
  {dial_code: '+856'}, // Laos
  {dial_code: '+880'}, // Bangladesh
  {dial_code: '+886'}, // Taiwan
  {dial_code: '+960'}, // Maldives
  {dial_code: '+961'}, // Lebanon
  {dial_code: '+962'}, // Jordan
  {dial_code: '+963'}, // Syria
  {dial_code: '+964'}, // Iraq
  {dial_code: '+965'}, // Kuwait
  {dial_code: '+966'}, // Saudi Arabia
  {dial_code: '+967'}, // Yemen
  {dial_code: '+968'}, // Oman
  {dial_code: '+970'}, // Palestine
  {dial_code: '+971'}, // United Arab Emirates
  {dial_code: '+972'}, // Israel
  {dial_code: '+973'}, // Bahrain
  {dial_code: '+974'}, // Qatar
  {dial_code: '+975'}, // Bhutan
  {dial_code: '+976'}, // Mongolia
  {dial_code: '+977'}, // Nepal
  {dial_code: '+992'}, // Tajikistan
  {dial_code: '+993'}, // Turkmenistan
  {dial_code: '+994'}, // Azerbaijan
  {dial_code: '+995'}, // Georgia
  {dial_code: '+996'}, // Kyrgyzstan
  {dial_code: '+998'}, // Uzbekistan
];
export default function CustomTextInput({
  onError,
  autoCapitalize,
  keyboardType,
  countryPicker,
  placeholder,
  prefixIcon,
  isSecure,
  value,
  onChangeText,
  isSecureTextEntry,
  suffixIcon,
  iconName,
  iconSize,
  iconColor,
  iconFamily,
  height,
  width,
  border,
  backgroundColor,
  borderColor,
  bc,
  bg,
  fontFamily,
  editable = true,
  svg,
  svg2,
  label,
  elevation,
  image,
  marginBottom,
}: any) {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View
      style={{
        height: label ? 85 : height ? height : 60,
        marginBottom: marginBottom ? marginBottom : 0,
      }}>
      {label && (
        <Text style={styles.label}>
          {label} <Text style={{color: colors.red2}}>*</Text>{' '}
        </Text>
      )}
      <View
        style={[
          styles.textInputContainer,
          onError && styles.errorTextInput,
          isFocused && styles.focusedTextInput,
          {width: width},
          border && {
            borderColor: bc ? bc : '#E5E0E0',
            borderWidth: 1,
          },
          backgroundColor && {backgroundColor: bg ? bg : colors.white},
        ]}>
        {/* {(prefixIcon || svg || svg2) && (
          <View style={{padding: 4}}>
            {svg ? (
              <SVGObj icon={svg} />
            ) : svg2 ? (
              <SVG2 icon={svg2} height={svg2.height} width={svg2.width} />
            ) : (
              <Icon
                name={iconName}
                size={iconSize}
                color={iconColor}
                iconFamily={iconFamily}
              />
            )}
          </View>
        )} */}
        {countryPicker && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
              <Text>{selectedCountry.dial_code}</Text>
            </TouchableOpacity>
            <Feather name={'chevron-down'} />
          </View>
        )}
        <TextInput
          autoCapitalize={autoCapitalize && 'none'}
          keyboardType={keyboardType}
          editable={editable}
          style={[
            styles.textInput,
            onError && styles.errorTextInput,
            isFocused && styles.focusedTextInput,
            {fontFamily: fontFamily && fontFamily},
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.inputPlaceholder}
          secureTextEntry={isSecureTextEntry ? secureTextEntry : false}
        />
        {isSecure && (
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
            <FontAwesome5
              name={secureTextEntry ? 'eye-slash' : 'eye'}
              color={colors.inputPlaceholder}
            />
          </TouchableOpacity>
        )}
        {suffixIcon && (
          <View style={{padding: 4}}>
            {image ? (
              <Image
                source={image}
                style={{height: iconSize, width: iconSize, resizeMode: 'cover'}}
              />
            ) : (
              <Icon
                name={iconName}
                size={iconSize}
                color={iconColor}
                iconFamily={iconFamily}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    // marginTop: 45,
    fontSize: 15,
    // fontFamily: fontsInter.f500,
    color: colors.labelText,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: '#f0f',
    position: 'absolute',
    padding: 4,
    top: 30,
  },
  textInputContainer: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
  },
  textInput: {
    flex: 1,
    height: 56,

    // marginLeft: 5,
    borderRadius: 13,
    // backgroundColor:colors.white,
    color: colors.black,
  },
  focusedTextInput: {
    height: 60,
    borderColor: 'black',
  },
  errorTextInput: {
    height: 60,
    borderColor: colors.red,
  },

  icon: {
    paddingHorizontal: 10,
  },
});
