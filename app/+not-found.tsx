import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons name="error-outline" size={80} color="#ff2442" />
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.description}>
          Sorry, we couldn't find the page you're looking for.
        </Text>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.homeButtonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  homeButton: {
    backgroundColor: '#ff2442',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});