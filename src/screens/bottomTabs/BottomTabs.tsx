import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

import Messages from '../messages/Messages';
import Home from '../home/Home';
import Profile from '../profile/Profile';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const CustomBottomNavigation = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [startX, setStartX] = useState(0);
  const tabNames = ['Chats', 'Home', 'Profile'];
  const translateX = useRef(new Animated.Value(0)).current;
  const handleTouchStart = (e) => {
    setStartX(e.nativeEvent.pageX);
  };
  const handleTouchEnd = (e) => {
    const endX = e.nativeEvent.pageX;
    const distance = startX - endX;

    if (distance > 50 && activeTab < tabNames.length - 1) {
      setActiveTab((prev) => Math.min(tabNames.length - 1, prev + 1));
    } else if (distance < -50 && activeTab > 0) {
      setActiveTab((prev) => Math.max(0, prev - 1));
    }
  };
  Animated.timing(translateX, {
    toValue: -activeTab * SCREEN_WIDTH,
    duration: 300,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.container}>
      <View
        style={styles.content}
        onStartShouldSetResponder={() => true}
        onResponderGrant={handleTouchStart}
        onResponderMove={() => {}}
        onResponderRelease={handleTouchEnd}
      >
        <Animated.View
          style={[
            styles.slider,
            { transform: [{ translateX }] },
          ]}
        >
          {tabNames.map((tab, index) => (
            <View key={index} style={styles.tabPage}>
                {
                    index===0?<Messages/>: index===1?<Home/>:<Profile/>
                }
                
            </View>
          ))}
        </Animated.View>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {tabNames.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[styles.navText, activeTab === index && styles.activeTab]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  slider: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 3, // To accommodate all 3 tabs horizontally
  },
  tabPage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 90, // Adjust the height to fill available space excluding the bottom nav
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red', // You can change the background color here
  },
  tabText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomNav: {
    height:50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    color: '#888',
  },
  activeTab: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default CustomBottomNavigation;
