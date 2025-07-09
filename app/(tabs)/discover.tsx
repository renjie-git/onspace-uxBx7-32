import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatGrid } from 'react-native-super-grid';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Fashion', icon: '👗', color: '#FFE5E5' },
  { id: '2', name: 'Food', icon: '🍕', color: '#E5F3FF' },
  { id: '3', name: 'Travel', icon: '✈️', color: '#E5FFE5' },
  { id: '4', name: 'Beauty', icon: '💄', color: '#FFF0E5' },
  { id: '5', name: 'Home', icon: '🏠', color: '#F0E5FF' },
  { id: '6', name: 'Fitness', icon: '💪', color: '#E5FFF0' },
];

const mockDiscoverPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop',
    title: 'Minimalist Bedroom Setup',
    user: 'Design Studio',
    likes: 1234,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=400&fit=crop',
    title: 'Homemade Italian Pasta',
    user: 'Chef Maria',
    likes: 856,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
    title: 'Mountain Hiking Adventure',
    user: 'Explorer Jack',
    likes: 2341,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop',
    title: 'Coffee Art Masterpiece',
    user: 'Barista Amy',
    likes: 678,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
    title: 'Skincare Night Routine',
    user: 'Beauty Guru',
    likes: 1567,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=300&h=400&fit=crop',
    title: 'Yoga Morning Practice',
    user: 'Yoga Master',
    likes: 923,
  },
];

export default function DiscoverScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');

  const renderDiscoverItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.discoverItem}>
      <Image source={{ uri: item.image }} style={styles.discoverImage} />
      <View style={styles.discoverOverlay}>
        <Text style={styles.discoverTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.discoverMeta}>
          <Text style={styles.discoverUser}>{item.user}</Text>
          <View style={styles.likesContainer}>
            <MaterialIcons name="favorite" size={12} color="white" />
            <Text style={styles.likesText}>{item.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for inspiration..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="tune" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  { backgroundColor: category.color },
                  selectedCategory === category.id && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Section */}
        <View style={styles.trendingContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.trendingGrid}>
            <FlatGrid
              itemDimension={(width - 48) / 2 - 8}
              data={mockDiscoverPosts}
              style={styles.gridList}
              spacing={8}
              renderItem={renderDiscoverItem}
              maxItemsPerRow={2}
              scrollEnabled={false}
            />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },
  categoriesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    minWidth: 80,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: '#ff2442',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  trendingContainer: {
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#ff2442',
    fontWeight: '500',
  },
  trendingGrid: {
    paddingHorizontal: 16,
  },
  gridList: {
    flex: 1,
  },
  discoverItem: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    aspectRatio: 0.75,
  },
  discoverImage: {
    width: '100%',
    height: '100%',
  },
  discoverOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
  },
  discoverTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  discoverMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discoverUser: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 4,
  },
});