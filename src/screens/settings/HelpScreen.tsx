import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Header2 from '../../components/header2/Header2';

const HelpScreen = () => {
  const faqs = [
    {
      question: 'How do I create a new post?',
      answer:
        "Tap on the '+' icon at the bottom of the screen, select or capture an image/video, and follow the prompts.",
    },
    {
      question: 'How can I change my password?',
      answer:
        "Go to your Profile, tap on 'Settings', and select 'Change Password'.",
    },
    {
      question: 'How do I report an issue?',
      answer:
        "Go to the 'Help & Support' section in Settings and select 'Report a Problem'.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
            
      <Header2 newBackIcon title='Help & Support'/>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <TouchableOpacity key={index} style={styles.faqItem}>
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.answer}>{faq.answer}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>How-to Guides</Text>
          <TouchableOpacity style={styles.guideItem}>
            {/* <Image source={require("./assets/post-guide.png")} style={styles.guideIcon} /> */}
            <Text style={styles.guideText}>Learn how to create posts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.guideItem}>
            {/* <Image source={require("./assets/privacy-guide.png")} style={styles.guideIcon} /> */}
            <Text style={styles.guideText}>
              Understand your privacy settings
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Need more help?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  answer: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  guideIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  guideText: {
    fontSize: 16,
    color: '#333',
  },
  contactButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HelpScreen;
