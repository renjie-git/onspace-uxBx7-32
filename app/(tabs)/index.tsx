import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { FeedCard } from '../../components/ui/FeedCard';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const mockPosts = [
  {
    id: '1',
    user: {
      name: 'Emma Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face',
    },
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=600&fit=crop',
    ],
    title: 'Cozy Coffee Shop in Downtown ☕️',
    content: 'Found this amazing little coffee shop with the perfect ambiance for working. Their latte art is absolutely stunning! 🎨 #coffee #worklife #cozy',
    likes: 234,
    comments: 12,
    location: 'Downtown Coffee House',
  },
  {
    id: '2',
    user: {
      name: 'Sophie Liu',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=600&fit=crop',
    ],
    title: 'Homemade Pasta Night 🍝',
    content: 'Spent the evening making fresh pasta from scratch. The sauce recipe is from my grandmother - pure comfort food! Who else loves cooking Italian?',
    likes: 189,
    comments: 8,
    location: 'Home Kitchen',
  },
  {
    id: '3',
    user: {
      name: 'Alex Wang',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=400&h=600&fit=crop',
    ],
    title: 'Mountain Adventure Weekend 🏔️',
    content: 'Hiking through the national park this weekend. The view from the summit was absolutely breathtaking! Nature therapy at its finest.',
    likes: 456,
    comments: 23,
    location: 'Rocky Mountain National Park',
  },
];

export default function HomeScreen() {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    { id: '1', user: 'Your Story', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', isOwn: true },
    { id: '2', user: 'Lisa', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=100&h=100&fit=crop&crop=face' },
    { id: '3', user: 'John', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { id: '4', user: 'Sarah', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
    { id: '5', user: 'Mike', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Little Red Book</Text>
        <TouchableOpacity>
          <MaterialIcons name="notifications" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories Section */}
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesContent}>
            {stories.map((story, index) => (
              <TouchableOpacity
                key={story.id}
                style={styles.storyItem}
                onPress={() => setActiveStory(index)}
              >
                <View style={[styles.storyImageContainer, story.isOwn && styles.ownStoryContainer]}>
                  <Image source={{ uri: story.avatar }} style={styles.storyImage} />
                  {story.isOwn && (
                    <View style={styles.addStoryIcon}>
                      <MaterialIcons name="add" size={16} color="white" />
                    </View>
                  )}
                </View>
                <Text style={styles.storyUserName} numberOfLines={1}>
                  {story.user}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Feed */}
        <View style={styles.feedContainer}>
          {mockPosts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff2442',
  },
  storiesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  storiesContent: {
    paddingHorizontal: 16,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 12,
    width: 70,
  },
  storyImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ff2442',
    padding: 2,
    position: 'relative',
  },
  ownStoryContainer: {
    borderColor: '#ddd',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },
  addStoryIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#ff2442',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  storyUserName: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    textAlign: 'center',
  },
  feedContainer: {
    paddingTop: 8,
  },
});