import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function PublishScreen() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const popularTags = [
    '#fashion', '#food', '#travel', '#beauty', '#lifestyle',
    '#photography', '#art', '#fitness', '#home', '#diy'
  ];

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets) {
        const imageUris = result.assets.map(asset => asset.uri);
        setSelectedImages([...selectedImages, ...imageUris].slice(0, 9)); // Max 9 images
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick images');
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setSelectedImages([...selectedImages, result.assets[0].uri].slice(0, 9));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePublish = () => {
    if (!title.trim() || selectedImages.length === 0) {
      Alert.alert('Missing Information', 'Please add a title and at least one image');
      return;
    }

    // Simulate publishing
    Alert.alert(
      'Success!',
      'Your post has been published successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setTitle('');
            setContent('');
            setLocation('');
            setSelectedImages([]);
            setSelectedTags([]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity onPress={handlePublish} style={styles.publishButton}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Image Selection */}
        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>Photos ({selectedImages.length}/9)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
            {/* Add Photo Buttons */}
            <TouchableOpacity style={styles.addImageButton} onPress={pickImages}>
              <MaterialIcons name="photo-library" size={24} color="#666" />
              <Text style={styles.addImageText}>Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.addImageButton} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={24} color="#666" />
              <Text style={styles.addImageText}>Camera</Text>
            </TouchableOpacity>

            {/* Selected Images */}
            {selectedImages.map((uri, index) => (
              <View key={index} style={styles.selectedImageContainer}>
                <Image source={{ uri }} style={styles.selectedImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <MaterialIcons name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Title Input */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Add an attractive title..."
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            placeholderTextColor="#999"
          />
          <Text style={styles.characterCount}>{title.length}/100</Text>
        </View>

        {/* Content Input */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Share your thoughts, tips, or story..."
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={1000}
            placeholderTextColor="#999"
          />
          <Text style={styles.characterCount}>{content.length}/1000</Text>
        </View>

        {/* Location */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationInputContainer}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <TextInput
              style={styles.locationInput}
              placeholder="Add location..."
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Tags */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {popularTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagButton,
                  selectedTags.includes(tag) && styles.selectedTagButton,
                ]}
                onPress={() => toggleTag(tag)}
              >
                <Text
                  style={[
                    styles.tagText,
                    selectedTags.includes(tag) && styles.selectedTagText,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Publish Options */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem}>
            <MaterialIcons name="public" size={20} color="#666" />
            <Text style={styles.optionText}>Public</Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <MaterialIcons name="schedule" size={20} color="#666" />
            <Text style={styles.optionText}>Schedule Post</Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="#666" />
          </TouchableOpacity>
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
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  publishButton: {
    backgroundColor: '#ff2442',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  publishButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  imageSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  imageScroll: {
    flexDirection: 'row',
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addImageText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  selectedImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ff2442',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  titleInput: {
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
  },
  contentInput: {
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 6,
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTagButton: {
    backgroundColor: '#ff2442',
    borderColor: '#ff2442',
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTagText: {
    color: 'white',
  },
  optionsSection: {
    padding: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
});