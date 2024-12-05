import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import CustomButton from '../../components/customButton/CustomButton';
import {colors} from '../../assets/data/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from '../../components/customIcon/CustomIcon';
// import Icon from '../../components/customIcon/CustomIcon';

const CapturedData = ({navigation}: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{flex: 1, justifyContent: 'flex-end'}}
        imageStyle={{resizeMode: 'cover'}}
        source={require('../../assets/images/captured.jpg')}>
        <View style={[styles.fabContainer, isMenuOpen && styles.menuOpen]}>
          {isMenuOpen && (
            <>
              <TouchableOpacity style={styles.fabItem}>
                <Icon name="refresh" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.fabItem}>
                <Icon name="people" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.fabItem}>
                <Icon name="emoji-people" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.fabItem}>
                <Icon name="widgets" size={24} color="white" />
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={[
              styles.fabToggle,
              !isMenuOpen && {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: 30,
                width: 30,
              },
            ]}
            onPress={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon
              name={isMenuOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            // backgroundColor:colors.red,
            borderRadius: 50,
            padding: 10,
            position: 'absolute',
            top: 10,
            right: 10,
          }}>
          <Icon1
            name={'close'}
            iconFamily="antDesign"
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <View style={styles.btnsView}>
          <CustomButton
            width={'40%'}
            // isLoading={isLoading}
            title={'Send to'}
            btnColor={colors.black}
            btnTextColor={'#fff'}
            onPress={() => navigation.navigate('SendTo')}
            borderRadius={50}
          />
          <CustomButton
            width={'40%'}
            // isLoading={isLoading}
            title={'Story'}
            btnColor={colors.white}
            btnTextColor={'#000'}
            //   onPress={()=>navigation.navigate('Home')}
            borderRadius={50}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CapturedData;
