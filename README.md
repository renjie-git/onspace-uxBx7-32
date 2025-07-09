# Little Red Book - Social Sharing App - xiao hong shu

A beautiful social media application inspired by Xiaohongshu (Little Red Book), built with React Native and Expo. This app allows users to share lifestyle content, discover new trends, and connect with others through photos and stories.

## ✨ Features

### 🏠 Home Feed
- Beautiful story carousel at the top
- Infinite scroll feed with high-quality posts
- Like, comment, and bookmark functionality
- Multi-image post support with smooth swiping
- User profiles and location tags

### 🔍 Discover
- Category-based content exploration
- Grid layout for visual content discovery
- Search functionality with filters
- Trending content recommendations
- Beautiful image overlays with engagement metrics

### 📝 Publish
- Multi-image upload from gallery or camera
- Rich text editor with character limits
- Location tagging
- Hashtag suggestions and selection
- Post scheduling options
- Draft saving capability

### 💬 Messages
- Real-time chat interface
- Online status indicators
- Notification system for likes, comments, and follows
- Unread message badges
- Search conversations

### 👤 Profile
- Comprehensive user profiles
- Post statistics (posts, followers, following)
- Verification badges
- Story highlights
- Grid view of user posts
- Edit profile functionality

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI Components**: React Native Paper + Custom Components
- **Icons**: Expo Vector Icons
- **Image Handling**: Expo Image Picker & Expo Camera
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: StyleSheet with responsive design

## 📱 Compatible Platforms

- iOS
- Android
- Web (responsive design)

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npx expo start
   ```

3. **Run on Device**
   - Scan QR code with Expo Go app
   - Or run on simulator/emulator

## 📁 Project Structure

```
├── app/                     # App routes and pages
│   ├── (tabs)/             # Tab navigation pages
│   │   ├── index.tsx       # Home feed
│   │   ├── discover.tsx    # Discovery page
│   │   ├── publish.tsx     # Content creation
│   │   ├── messages.tsx    # Messages & notifications
│   │   └── profile.tsx     # User profile
│   ├── _layout.tsx         # Root layout
│   └── +not-found.tsx      # 404 page
├── components/             # Reusable UI components
│   └── ui/
│       └── FeedCard.tsx    # Post card component
├── constants/              # App constants
│   └── Colors.ts           # Color palette
└── README.md
```

## 🎨 Design Features

- **Modern UI/UX**: Clean, Instagram-inspired interface
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Fluid transitions and interactions
- **High-Quality Images**: Curated stock photos for demo content
- **Consistent Theming**: Unified color scheme and typography
- **Accessibility**: Screen reader support and proper contrast

## 🔧 Key Components

### FeedCard
- Multi-image carousel with indicators
- User interaction buttons (like, comment, bookmark)
- Expandable content with "read more" functionality
- Profile integration with user avatars

### Navigation
- Bottom tab navigation with badges
- Stack navigation for detailed views
- Smooth transitions between screens

### Image Handling
- Gallery picker with multiple selection
- Camera integration with permissions
- Image preview and editing capabilities

## 📊 Mock Data

The app includes realistic mock data for:
- User profiles with avatars
- Social media posts with high-quality images
- Chat conversations and notifications
- Trending categories and hashtags

## 🎯 Future Enhancements

- [ ] Real-time messaging with WebSocket
- [ ] Push notifications
- [ ] Video content support
- [ ] Advanced search and filters
- [ ] Social features (follow/unfollow)
- [ ] Analytics and insights
- [ ] Dark mode support
- [ ] Internationalization

## 📄 License

This project is for demonstration purposes. All images are sourced from Unsplash and other free image providers with appropriate licensing.

---

Built with ❤️ using React Native and Expo