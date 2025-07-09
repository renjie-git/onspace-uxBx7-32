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
import { FlatGrid } from 'react-native-super-grid';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const userProfile = {
  name: 'Jessica Wang',
  username: '@jessicaw',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=200&h=200&fit=crop&crop=face',
  bio: 'Fashion & Lifestyle Blogger ✨\nSharing daily inspiration 💕\nBased in New York 🗽',
  stats: {
    posts: 234,
    followers: 12500,
    following: 456,
  },
  isVerified: true,
};

const myPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop',
    likes: 1234,
    type: 'image',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=300&fit=crop',
    likes: 856,
    type: 'image',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
    likes: 2341,
    type: 'image',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
    likes: 567,
    type: 'image',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    likes: 1890,
    type: 'image',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=300&h=300&fit=crop',
    likes: 923,
    type: 'image',
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('posts');

  const renderPostItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.postItem}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postOverlay}>
        <View style={styles.postStats}>
          <MaterialIcons name="favorite" size={16} color="white" />
          <Text style={styles.postLikes}>{item.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{userProfile.username}</Text>
        <TouchableOpacity>
          <MaterialIcons name="settings" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: userProfile.avatar }} style={styles.profileAvatar} />
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userProfile.stats.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userProfile.stats.followers.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userProfile.stats.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.profileName}>{userProfile.name}</Text>
              {userProfile.isVerified && (
                <MaterialIcons name="verified" size={18} color="#4285f4" style={styles.verifiedIcon} />
              )}
            </View>
            <Text style={styles.profileBio}>{userProfile.bio}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <MaterialIcons name="share" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Highlights */}
        <View style={styles.highlightsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.highlightsContent}>
            <TouchableOpacity style={styles.highlightItem}>
              <View style={styles.highlightImage}>
                <MaterialIcons name="add" size={32} color="#999" />
              </View>
              <Text style={styles.highlightText}>New</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.highlightItem}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop' }}
                style={styles.highlightImage}
              />
              <Text style={styles.highlightText}>Fashion</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.highlightItem}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=100&h=100&fit=crop' }}
                style={styles.highlightImage}
              />
              <Text style={styles.highlightText}>Food</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.highlightItem}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop' }}
                style={styles.highlightImage}
              />
              <Text style={styles.highlightText}>Travel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'posts' && styles.activeTabButton]}
            onPress={() => setActiveTab('posts')}
          >
            <MaterialIcons
              name="grid-on"
              size={24}
              color={activeTab === 'posts' ? '#ff2442' : '#999'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'saved' && styles.activeTabButton]}
            onPress={() => setActiveTab('saved')}
          >
            <MaterialIcons
              name="bookmark-border"
              size={24}
              color={activeTab === 'saved' ? '#ff2442' : '#999'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'tagged' && styles.activeTabButton]}
            onPress={() => setActiveTab('tagged')}
          >
            <MaterialIcons
              name="person-outline"
              size={24}
              color={activeTab === 'tagged' ? '#ff2442' : '#999'}
            />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {activeTab === 'posts' && (
            <FlatGrid
              itemDimension={(width - 6) / 3}
              data={myPosts}
              style={styles.gridList}
              spacing={2}
              renderItem={renderPostItem}
              maxItemsPerRow={3}
              scrollEnabled={false}
            />
          )}
          
          {activeTab === 'saved' && (
            <View style={styles.emptyState}>
              <MaterialIcons name="bookmark-border" size={64} color="#ccc" />
              <Text style={styles.emptyStateText}>No saved posts yet</Text>
            </View>
          )}
          
          {activeTab === 'tagged' && (
            <View style={styles.emptyState}>
              <MaterialIcons name="person-outline" size={64} color="#ccc" />
              <Text style={styles.emptyStateText}>No tagged posts yet</Text>
            </View>
          )}
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  profileInfo: {
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  profileBio: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  shareButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
  },
  highlightsSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  highlightsContent: {
    paddingHorizontal: 16,
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  highlightImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  highlightText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#ff2442',
  },
  postsGrid: {
    flex: 1,
  },
  gridList: {
    flex: 1,
  },
  postItem: {
    position: 'relative',
    aspectRatio: 1,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postLikes: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
});