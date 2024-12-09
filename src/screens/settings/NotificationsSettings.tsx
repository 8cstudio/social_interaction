import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import Icon from "../../components/customIcon/CustomIcon";
import { colors } from "../../assets/data/colors";
import Header2 from "../../components/header2/Header2";

const NotificationsSettings = () => {
  const [postNotifications, setPostNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(false);
  const [followNotifications, setFollowNotifications] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);
  const [liveNotifications, setLiveNotifications] = useState(false);

  return (
    <ScrollView style={styles.container}>
        <View style={{
    paddingHorizontal: 20,}}>
      <Header2 newBackIcon title='Notifications'/>


      {/* Account Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Account Notifications</Text>
        <View style={styles.notificationItem}>
          <Icon  iconFamily='fontAwesome5' name="user-friends" size={24} color="#007bff" />
          <Text style={styles.label}>New Followers</Text>
          <Switch
            value={followNotifications}
            onValueChange={setFollowNotifications}
            thumbColor={colors.white}
            trackColor={{ false: "#767577", true: colors.blueText }}
          />
        </View>
      </View>

      {/* Activity Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Activity Notifications</Text>
        <View style={styles.notificationItem}>
          <Icon  iconFamily='material' name="post-add" size={24} color="#007bff" />
          <Text style={styles.label}>Posts</Text>
          <Switch
            value={postNotifications}
            onValueChange={setPostNotifications}
            thumbColor={postNotifications ? colors.white : colors.white}
            trackColor={{ false: "#767577", true: colors.blueText }}
          />
        </View>
        <View style={styles.notificationItem}>
          <Icon  iconFamily='material'  name="comment" size={24} color="#007bff" />
          <Text style={styles.label}>Comments</Text>
          <Switch
            value={commentNotifications}
            onValueChange={setCommentNotifications}
            thumbColor={commentNotifications ? colors.white : colors.white}
            trackColor={{ false: "#767577", true: colors.blueText }}
          />
        </View>
      </View>

      {/* Messaging Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Messaging Notifications</Text>
        <View style={styles.notificationItem}>
          <Icon  iconFamily='material'  name="message" size={24} color="#007bff" />
          <Text style={styles.label}>Messages</Text>
          <Switch

            value={messageNotifications}
            onValueChange={setMessageNotifications}
            thumbColor={messageNotifications ? colors.white : colors.white}
            trackColor={{ false: "#767577", true: colors.blueText }}
          />
        </View>
      </View>

      {/* Live Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Live Notifications</Text>
        <View style={styles.notificationItem}>
          <Icon  iconFamily='fontAwesome5' name="video" size={24} color="#007bff" />
          <Text style={styles.label}>Live Videos</Text>
          <Switch
            value={liveNotifications}
            onValueChange={setLiveNotifications}
            thumbColor={liveNotifications ? colors.white : colors.white}
            trackColor={{ false: "#767577", true: colors.blueText }}
          />
        </View>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginLeft: 10,
  },
});

export default NotificationsSettings;
