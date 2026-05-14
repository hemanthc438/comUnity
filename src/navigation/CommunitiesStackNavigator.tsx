import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Community } from '../features/communities/api/communitiesApi';
import { CommunityListScreen } from '../features/communities/screens/CommunityListScreen';
import { CommunityDetailScreen } from '../features/communities/screens/CommunityDetailScreen';
import { useTheme } from '../hooks/useTheme';

export type CommunitiesStackParamList = {
  CommunityList: undefined;
  CommunityDetail: { community: Community };
};

const Stack = createNativeStackNavigator<CommunitiesStackParamList>();

export const CommunitiesStackNavigator = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="CommunityList"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="CommunityList" component={CommunityListScreen} />
      <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} />
    </Stack.Navigator>
  );
};
