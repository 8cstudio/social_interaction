import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Modal,
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../assets/data/colors';
import Icon from '../../components/customIcon/CustomIcon';
import {styles} from './styles';

const Feeds = ({navigation}: any) => {
  const images = [
    {
      id: '1',
      uri: require('../../assets/images/reel1.jpg'),
      isFav: true,
      userName: 'john_doe',
      description: 'Exploring the beauty of nature 🌿🌄',
    },
    {
      id: '2',
      uri: require('../../assets/images/reel2.png'),
      isFav: false,
      userName: 'jane_smith',
      description: 'A moment from the weekend vibes ✨',
    },
    {
      id: '3',
      uri: require('../../assets/images/reelsBg.jpg'),
      isFav: true,
      userName: 'alex_travels',
      description: 'Sunset views from my recent trip 🏝️🌅',
    },
  ];
  

  // State to manage modal visibility and selected comments
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);

  // Sample comments data
  const commentsData: any = {
    '1': [
      {id: '1', text: 'Awesome reel!', name: 'Sara'},
      {
        id: '2',
        name: 'Ashley',
        text: 'Great picture!',
        reply: [{id: '1', text: 'Awesome reel!', name: 'Sara'}],
      },
    ],
    '2': [{id: '1', text: 'Great picture!', name: 'Sara'}],
    '3': [
      {id: '1', text: 'Wow, this is amazing!', name: 'Billie'},
      {id: '2', text: 'So cool!', name: 'Rishi'},
    ],
  };

  const openComments = (id: string) => {
    setCurrentComments(commentsData[id] || []);
    setCommentsVisible(true);
  };

  const closeComments = () => {
    setCommentsVisible(false);
    setCurrentComments([]);
  };

  const renderItem = ({item}: any) => (
    <View style={styles.imageContainer}>
      <ImageBackground
        source={item.uri}
        style={styles.image}
        resizeMode="cover">
        <View
          style={{
            // padding: 10,
            alignSelf: 'flex-end',
            gap: 10,
          }}>
          <Image
            style={{
              height: 28,
              width: 28,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: colors.white,
            }}
            source={require('../../assets/images/profile.png')}
          />
          <View>
            <Icon
              iconFamily="ionic"
              name="shuffle-outline"
              size={24}
              color={colors.white}
            />
          </View>
          <View>
            <Icon
              iconFamily="SimpleLineIcons"
              name="heart"
              size={24}
              color={colors.white}
            />

            <Text style={{color: colors.white}}>34k</Text>
          </View>
          <TouchableOpacity onPress={() => openComments(item.id)}>
            <Icon
              iconFamily="feather"
              name="message-circle"
              size={24}
              color={colors.white}
            />
            <Text style={{color: colors.white}}>102</Text>
          </TouchableOpacity>
          <View>
            {item.isFav ? (
              <Image
                style={{height: 24, width: 24}}
                tintColor={colors.white}
                source={require('../../assets/icons/fav.png')}
              />
            ) : (
              <Image
                style={{height: 24, width: 24}}
                tintColor={colors.white}
                source={require('../../assets/icons/fav1.png')}
              />
            )}
          </View>
        </View>
        <View style={{position:'absolute', bottom:80, left:20,flexDirection:"row", alignItems:'center'}}>
        <Image source={require('../../assets/images/profile.png')} style={{height:35, width:35, borderRadius:35, borderWidth:2, borderColor: colors.darkBlue}}/>
        <View style={{ marginLeft:10, marginTop:20, width:'80%'}}>
          <Text style={{color:colors.white}}>@{item.userName}</Text>
          <Text numberOfLines={2} style={{color:colors.white}}>{item.description} #reels #myvideo #fun #sports #goals etc </Text>
        </View>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={images}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />

      {/* Comments Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentsVisible}
        onRequestClose={closeComments}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.modalTitle}>Comments</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeComments}>
                <Icon
                  name={'close'}
                  iconFamily="antDesign"
                  size={15}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <FlatList
              contentContainerStyle={{gap: 10}}
              data={currentComments}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}: any) => (
                <>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Profile')}>
                      <Image
                        style={{height: 40, width: 40, borderRadius: 40}}
                        source={require('../../assets/images/profile.png')}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        marginLeft: 10,
                      }}>
                      <Text style={styles.commentText}>{item.name}</Text>
                      <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                  </View>
                  {item.reply && (
                    <>
                      <View
                        style={{
                          marginTop: 10,
                          marginLeft: 60,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{height: 30, width: 30, borderRadius: 40}}
                          source={require('../../assets/images/profile.png')}
                        />
                        {/* FlatList main reolies aany thy  */}
                        <View style={{marginLeft: 10}}>
                          <Text style={styles.commentText}>
                            {item.reply[0]?.name}
                          </Text>
                          <Text style={styles.commentText}>
                            {item.reply[0]?.text}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          styles.commentText,
                          {marginLeft: 110, color: colors.blueText},
                        ]}>
                        see more replies
                      </Text>
                    </>
                  )}
                </>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Feeds;
