import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStackNavigator } from './HomeStackNavigator';
import { CommunitiesStackNavigator } from './CommunitiesStackNavigator';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { GlobalCreatePostScreen } from '../features/posts/screens/GlobalCreatePostScreen';
import { useTheme } from '../hooks/useTheme';

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Communities"
        component={CommunitiesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={GlobalCreatePostScreen}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
