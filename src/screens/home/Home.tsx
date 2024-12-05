import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import Icon1 from '../../components/customIcon/CustomIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

export default function Home({navigation}:any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>

        <View style={{
          flexDirection: 'row',
          gap:10,
          alignItems:'center',
        }}>

        <TouchableOpacity>
          <Icon1 name="adduser" iconFamily='antDesign' size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
        <Icon1 name="search1" iconFamily='antDesign' size={24} color="white" />
        </TouchableOpacity>
        </View>


        <TouchableOpacity>
          <View style={styles.avatar} >
            
          <Icon1 name="person" size={24} iconFamily='ionic' color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* FAB Menu */}
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
          style={styles.fabToggle}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name={isMenuOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon1 name="play-outline" size={28} iconFamily='ionic' color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('CapturedData')}>
          <View style={styles.cameraButton} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon1 name="person-outline" size={28} iconFamily='ionic' color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
