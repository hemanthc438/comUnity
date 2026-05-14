import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommunityListScreen } from '../features/communities/screens/CommunityListScreen';
// import { CommunityDetailsScreen } from '../features/communities/screens/CommunityDetailsScreen';

const Stack = createNativeStackNavigator();

export const CommunitiesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CommunityList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityList" component={CommunityListScreen} />
      {/* <Stack.Screen name="CommunityDetails" component={CommunityDetailsScreen} /> */}
    </Stack.Navigator>
  );
};
