import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const mockChats = [
  {
    id: '1',
    user: {
      name: 'Emma Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
    },
    lastMessage: 'Thanks for sharing that recipe! 😊',
    timestamp: '2m ago',
    unreadCount: 2,
  },
  {
    id: '2',
    user: {
      name: 'Sophie Liu',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
    },
    lastMessage: 'The coffee shop you recommended was amazing!',
    timestamp: '1h ago',
    unreadCount: 0,
  },
  {
    id: '3',
    user: {
      name: 'Alex Wang',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
    },
    lastMessage: 'Are you joining the hiking trip this weekend?',
    timestamp: '3h ago',
    unreadCount: 1,
  },
  {
    id: '4',
    user: {
      name: 'Lisa Zhang',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
    },
    lastMessage: 'Love your latest fashion post! Where did you get that dress?',
    timestamp: '5h ago',
    unreadCount: 0,
  },
  {
    id: '5',
    user: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
    },
    lastMessage: 'Great workout tips in your latest post!',
    timestamp: '1d ago',
    unreadCount: 0,
  },
];

const notifications = [
  {
    id: '1',
    type: 'like',
    user: 'Sarah Kim',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face',
    message: 'liked your post',
    timestamp: '5m ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    user: 'David Lee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    message: 'commented on your post',
    timestamp: '1h ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'follow',
    user: 'Anna Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    message: 'started following you',
    timestamp: '2h ago',
    isRead: true,
  },
];

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState('chats');
  const [searchText, setSearchText] = useState('');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <MaterialIcons name="favorite" size={16} color="#ff2442" />;
      case 'comment':
        return <MaterialIcons name="chat-bubble" size={16} color="#4285f4" />;
      case 'follow':
        return <MaterialIcons name="person-add" size={16} color="#34a853" />;
      default:
        return <MaterialIcons name="notifications" size={16} color="#666" />;
    }
  };

  const ChatItem = ({ chat }: { chat: any }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: chat.user.avatar }} style={styles.avatar} />
        {chat.user.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{chat.user.name}</Text>
          <Text style={styles.timestamp}>{chat.timestamp}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
      </View>
      
      {chat.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const NotificationItem = ({ notification }: { notification: any }) => (
    <TouchableOpacity style={[styles.notificationItem, !notification.isRead && styles.unreadNotification]}>
      <Image source={{ uri: notification.avatar }} style={styles.notificationAvatar} />
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationUser}>{notification.user}</Text>
          <Text style={styles.notificationMessage}> {notification.message}</Text>
        </View>
        <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
      </View>
      
      <View style={styles.notificationIcon}>
        {getNotificationIcon(notification.type)}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'chats' && styles.activeTab]}
          onPress={() => setActiveTab('chats')}
        >
          <Text style={[styles.tabText, activeTab === 'chats' && styles.activeTabText]}>
            Chats
          </Text>
          {mockChats.filter(chat => chat.unreadCount > 0).length > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {mockChats.reduce((sum, chat) => sum + chat.unreadCount, 0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'notifications' && styles.activeTab]}
          onPress={() => setActiveTab('notifications')}
        >
          <Text style={[styles.tabText, activeTab === 'notifications' && styles.activeTabText]}>
            Notifications
          </Text>
          {notifications.filter(notif => !notif.isRead).length > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {notifications.filter(notif => !notif.isRead).length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {activeTab === 'chats' ? (
          <View>
            {mockChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </View>
        ) : (
          <View>
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </View>
        )}
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
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff2442',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ff2442',
    fontWeight: '600',
  },
  tabBadge: {
    backgroundColor: '#ff2442',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  tabBadgeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  // Chat Styles
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#ff2442',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  // Notification Styles
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  unreadNotification: {
    backgroundColor: '#f8f8ff',
  },
  notificationAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  notificationIcon: {
    marginLeft: 8,
  },
});