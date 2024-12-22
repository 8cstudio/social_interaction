import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Icon from '../../components/customIcon/CustomIcon';
import {elevation3, fontSize, width} from '../../assets/data/TypeScript';
import {colors} from '../../assets/data/colors';
import ProfileHeader from './ProfileHeader';
import CustomButton from '../../components/customButton/CustomButton';
import {styles} from './styles';
import {categoriesTabs, feedsFilter} from '../../assets/data/arrays';
import { useSelector } from 'react-redux';

const Profile = ({navigation}: any) => {
  
  const p = useSelector((state: any) => state.profile);
  const profilex = p.data;
  const [tab, setTab] = useState(0);

  const [tabLabel, setTabLabel] = useState('All');

  const handleTab = (id: number, label: string) => {
    setTab(id);
    setTabLabel(label);
    console.log(label);
  };
  return (
    <SafeAreaView style={{flex: 1, padding: 0}}>
      <View style={{paddingHorizontal: 20, paddingTop:20}}>
        <ProfileHeader data={profilex}/>
        {/*************************** Profile View ****************************/}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
         { profilex.profilePic?  <Image
            style={{
              height: fontSize(100),
              width: fontSize(100),
              borderRadius: 100,
              borderWidth: 3,
              borderColor: colors.gray,
            }}
            source={{uri: profilex?.profilePic}}
          />:<Icon name="person-circle-outline" size={fontSize(100)} iconFamily='ionic' color={colors.grey}/>}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              // backgroundColor: colors.read,
              flex: 1,
            }}>
            <View style={styles.likesView}>
              <Text style={{color: colors.black}}>25</Text>
              <Text style={{color: colors.black}}>Likes</Text>
            </View>

            <View style={styles.likesView}>
              <Text style={{color: colors.black}}>25</Text>
              <Text style={{color: colors.black}}>Likes</Text>
            </View>

            <View style={styles.likesView}>
              <Text style={{color: colors.black}}>25</Text>
              <Text style={{color: colors.black}}>Likes</Text>
            </View>
          </View>
        </View>
        <Text style={{color: colors.black, fontSize:16, fontWeight:'bold'}}>{profilex?.name?profilex?.name:'No name'}</Text>
        <Text style={{color: colors.grey, }}>{profilex?.userName? '@'+profilex?.userName:'Set your user name'}</Text>
        <Text style={{color: colors.black}}>{profilex.description?profilex.description:'no description added yet'}</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>

        <Icon name='location' iconFamily='EvilIcons' color={colors.grey} size={20}/>
        <Text style={{color: colors.grey, marginLeft:5, marginTop:5,
        }}>{profilex.location?profilex.location: 'Location'}</Text>
        </View>
        {/********************* Buttons View **********************/}
        <View style={styles.btnsView}>
          <CustomButton
            height={35}
            flex={1.1}
            onPress={()=> navigation.navigate('ProfileSetup')}
            title={'Edit Profile'}
            fontSize={fontSize(11)}
            width={'35%'}
            btnTextColor={colors.white}
            btnColor={colors.black}
            borderRadius={50}
          />
          <CustomButton
          disabled
            height={35}
            flex={1.1}
            title={'Share Profile'}
            fontSize={fontSize(11)}
            width={'35%'}
            btnTextColor={colors.white}
            btnColor={colors.grey}
            borderRadius={50}
          />
        </View>
      </View>
      {/********************* Reels View **********************/}
      <View
        style={{
          ...elevation3,
          backgroundColor: colors.white,
          width: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          flex: 1,
        }}>
        <FlatList
          ListHeaderComponent={
            <>
              <FlatList
                horizontal
                contentContainerStyle={{
                  gap: 20,
                  justifyContent: 'center',
                  height: fontSize(40),
                  width: '100%',
                  marginVertical: 15,
                }}
                data={categoriesTabs}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleTab(item.id, item.label)}
                    key={item.id}
                    style={{
                      paddingVertical: 5,
                      borderBottomWidth: item.id === tab ? 2 : 0,
                      borderColor: colors.black,
                    }}>
                    <Text
                      style={{
                        // fontFamily: fontsInter.f500,
                        fontSize: fontSize(15),
                        color: colors.black,
                      }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
              />
            </>
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item?.id.toString()}
          nestedScrollEnabled
          numColumns={3}
          data={feedsFilter}
          style={{marginHorizontal: 20}}
          renderItem={({item, index}: any) => (
            <TouchableOpacity
              key={index}
              style={{
                width: width / 3 - 12,
                height: width / 3 - 12,
              }}
              // onPress={() =>
              //   navigation.replace('Feeds', {
              //     profileFeedsData: allFeedsCollection,
              //     selectedProfileFeedIndex: index,
              //   })
              // }
            >
              <Image
                style={styles.videoItem}
                resizeMode="cover"
                source={item.thumbnail}
              />
              <View style={styles.viewsText}>
                <Icon
                  name={'caretright'}
                  iconFamily={'antDesign'}
                  color={colors.white}
                />
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 12,
                    // fontFamily: fonts.f500,
                  }}>
                  {item.views}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
