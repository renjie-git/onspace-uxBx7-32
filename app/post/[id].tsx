import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

// Mock post data - in real app this would come from API
const mockPostDetails = {
  '1': {
    id: '1',
    user: {
      name: 'Emma Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face',
      followers: 1200,
      isFollowing: false,
    },
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=600&fit=crop',
    ],
    title: 'Cozy Coffee Shop Downtown ☕️',
    content: 'Found this amazing little coffee shop with perfect ambiance for working! The interior design is absolutely gorgeous with warm lighting and comfortable seating. Their signature latte art is incredible, and the baristas are so talented. Perfect spot for a productive afternoon or catching up with friends. Highly recommend their homemade pastries too! 💕',
    likes: 234,
    comments: 12,
    shares: 8,
    bookmarks: 45,
    location: 'Downtown Coffee House',
    tags: ['#coffee', '#cafe', '#downtown', '#worklife', '#latte'],
    publishTime: '2 hours ago',
    isLiked: false,
    isBookmarked: false,
  },
  '2': {
    id: '2',
    user: {
      name: 'Sophie Liu',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      followers: 890,
      isFollowing: true,
    },
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=600&fit=crop',
    ],
    title: 'Homemade Pasta Night 🍝',
    content: 'Fresh pasta from scratch with grandmother\'s recipe! Nothing beats the satisfaction of making your own pasta dough and watching it transform into delicious noodles. Tonight\'s menu features classic carbonara with farm-fresh eggs and crispy pancetta. The secret is in the timing and temperature - perfection takes practice! 👩‍🍳',
    likes: 189,
    comments: 8,
    shares: 3,
    bookmarks: 22,
    location: 'Home Kitchen',
    tags: ['#homecooking', '#pasta', '#italian', '#foodie', '#recipe'],
    publishTime: '5 hours ago',
    isLiked: true,
    isBookmarked: false,
  },
  // Add more mock data as needed
};

const mockComments = [
  {
    id: '1',
    user: {
      name: 'Alex Wang',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    content: 'This looks absolutely amazing! Could you share the location?',
    time: '1h ago',
    likes: 5,
    isLiked: false,
  },
  {
    id: '2',
    user: {
      name: 'Lisa Zhang',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    },
    content: 'I need to try this place! Thanks for sharing ☕️',
    time: '30m ago',
    likes: 2,
    isLiked: true,
  },
];

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const postId = Array.isArray(id) ? id[0] : id;
  const post = mockPostDetails[postId as keyof typeof mockPostDetails];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post?.isBookmarked || false);
  const [isFollowing, setIsFollowing] = useState(post?.user.isFollowing || false);

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Post not found</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share functionality would be implemented here');
  };

  const handleComment = () => {
    Alert.alert('Comment', 'Comment functionality would be implemented here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="more-horiz" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(newIndex);
            }}
          >
            {post.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.postImage} />
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          {post.images.length > 1 && (
            <View style={styles.imageIndicators}>
              {post.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    index === currentImageIndex && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* User Info */}
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <Image source={{ uri: post.user.avatar }} style={styles.userAvatar} />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{post.user.name}</Text>
                <Text style={styles.userStats}>{post.user.followers} followers</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.followButton, isFollowing && styles.followingButton]}
              onPress={handleFollow}
            >
              <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Post Content */}
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postDescription}>{post.content}</Text>
            
            {/* Tags */}
            <View style={styles.tagsContainer}>
              {post.tags.map((tag, index) => (
                <TouchableOpacity key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Location */}
            {post.location && (
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={styles.locationText}>{post.location}</Text>
              </View>
            )}

            {/* Time */}
            <Text style={styles.publishTime}>{post.publishTime}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <MaterialIcons
                name={isLiked ? 'favorite' : 'favorite-border'}
                size={24}
                color={isLiked ? '#ff2442' : '#666'}
              />
              <Text style={styles.actionText}>{post.likes + (isLiked ? 1 : 0)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
              <MaterialIcons name="chat-bubble-outline" size={24} color="#666" />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <MaterialIcons name="share" size={24} color="#666" />
              <Text style={styles.actionText}>{post.shares}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
              <MaterialIcons
                name={isBookmarked ? 'bookmark' : 'bookmark-border'}
                size={24}
                color={isBookmarked ? '#ff2442' : '#666'}
              />
            </TouchableOpacity>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Comments ({post.comments})</Text>
            {mockComments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
                <View style={styles.commentContent}>
                  <Text style={styles.commentUserName}>{comment.user.name}</Text>
                  <Text style={styles.commentText}>{comment.content}</Text>
                  <View style={styles.commentFooter}>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                    <TouchableOpacity style={styles.commentLike}>
                      <MaterialIcons
                        name={comment.isLiked ? 'favorite' : 'favorite-border'}
                        size={14}
                        color={comment.isLiked ? '#ff2442' : '#999'}
                      />
                      <Text style={styles.commentLikeText}>{comment.likes}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#ff2442',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  postImage: {
    width: width,
    height: width * 1.2,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userStats: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#ff2442',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followingButton: {
    backgroundColor: '#f0f0f0',
  },
  followButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  followingButtonText: {
    color: '#666',
  },
  postContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 13,
    color: '#4285f4',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  publishTime: {
    fontSize: 12,
    color: '#999',
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
  },
  commentLike: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikeText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
});