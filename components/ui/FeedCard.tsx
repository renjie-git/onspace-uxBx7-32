import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // Two columns with spacing

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  images: string[];
  title: string;
  content: string;
  likes: number;
  comments: number;
  location: string;
}

interface FeedCardProps {
  post: Post;
}

export function FeedCard({ post }: FeedCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleCardPress = () => {
    // Navigate to post detail page
    const { router } = require('expo-router');
    router.push(`/post/${post.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      {/* Main Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: post.images[0] }}
          style={styles.postImage}
          resizeMode="cover"
        />
        
        {/* Multiple Images Indicator */}
        {post.images.length > 1 && (
          <View style={styles.multiImageIndicator}>
            <MaterialIcons name="photo-library" size={16} color="white" />
          </View>
        )}
        
        {/* Like Button Overlay */}
        <TouchableOpacity
          style={styles.likeButton}
          onPress={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <MaterialIcons
            name={isLiked ? 'favorite' : 'favorite-border'}
            size={18}
            color={isLiked ? '#ff2442' : 'white'}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>
        
        {/* User Info */}
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.userAvatar} />
          <Text style={styles.userName} numberOfLines={1}>
            {post.user.name}
          </Text>
        </View>
        
        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <MaterialIcons name="favorite" size={12} color="#ff2442" />
            <Text style={styles.statText}>{post.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: cardWidth,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 0.75, // 3:4 ratio for vertical images
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  multiImageIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  likeButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    lineHeight: 18,
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  userName: {
    fontSize: 11,
    color: '#666',
    flex: 1,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 2,
  },
});