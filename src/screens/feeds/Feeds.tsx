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

const Feeds = ({navigation}:any) => {
  // Sample image data
  const images = [
    {id: '1', uri: require('../../assets/images/reel1.jpg'), isFav: true},
    {id: '2', uri: require('../../assets/images/reel2.png'), isFav: false},
    {id: '3', uri: require('../../assets/images/reelsBg.jpg'), isFav: true},
  ];

  // State to manage modal visibility and selected comments
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);

  // Sample comments data
  const commentsData: any = {
    '1': [
      {id: '1', text: 'Awesome reel!', name: 'Sara'},
      {id: '2', name: 'Ashley', text: 'Great picture!', reply:[
        {id: '1', text: 'Awesome reel!', name: 'Sara'}
    ]},
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
            padding: 10,
            alignSelf: 'flex-end',
            gap: 10,
          }}>
            <Image style={{height:28, width:28, borderRadius:20, borderWidth:2, borderColor:colors.white}} source={require('../../assets/images/profile.png')}/>
          <Icon
            iconFamily="ionic"
            name="shuffle-outline"
            size={24}
            color={colors.white}
          />
          <Icon
            iconFamily="SimpleLineIcons"
            name="heart"
            size={24}
            color={colors.white}
          />
          <TouchableOpacity onPress={() => openComments(item.id)}>
            <Icon
              iconFamily="feather"
              name="message-circle"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
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
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>

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
            contentContainerStyle={{gap:10}}
              data={currentComments}
              keyExtractor={(item:any) => item.id}
              renderItem={({item}: any) => (
                <>
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Profile')} >

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
                {
                    item.reply&&
                    <>
                    <View
                    style={{
                        marginTop:10,
                      marginLeft: 60,
                      flexDirection:'row',
                      alignItems:'center',
                    }}>
                         <Image
                    style={{height: 30, width: 30, borderRadius: 40}}
                    source={require('../../assets/images/profile.png')}
                  />
                  {/* FlatList main reolies aany thy  */}
                  <View style={{marginLeft:10,}}>
                    <Text style={styles.commentText}>{item.reply[0]?.name}</Text>
                    <Text style={styles.commentText}>{item.reply[0]?.text}</Text>
                  </View>
                  </View>
                    <Text style={[styles.commentText,{marginLeft:110, color:colors.blueText}]}>see more replies</Text>

                  </>
                  }
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
