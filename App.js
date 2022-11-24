import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './containers/HomeScreen';
import RoomScreen from './containers/RoomScreen';
import ProfileScreen from './containers/ProfileScreen';
import SignInScreen from './containers/SignInScreen';
import SignUpScreen from './containers/SignUpScreen';
import SettingsScreen from './containers/SettingsScreen';
import SplashScreen from './containers/SplashScreen';
import logo from './assets/airbnblogo.png';
import Image from 'react-native';
import AroundMeScreen from './containers/AroundMeScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState(null);

	const setToken = async (token) => {
		if (token) {
			await AsyncStorage.setItem('userToken', token);
		} else {
			await AsyncStorage.removeItem('userToken');
		}

		setUserToken(token);
	};

	useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			// We should also handle error for production apps
			const userToken = await AsyncStorage.getItem('userToken');

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			setUserToken(userToken);

			setIsLoading(false);
		};

		bootstrapAsync();
	}, []);

	if (isLoading === true) {
		// We haven't finished checking for the token yet
		return null;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{userToken === null ? (
					// No token found, user isn't signed in
					<>
						<Stack.Screen name="SignIn">{() => <SignInScreen setToken={setToken} />}</Stack.Screen>
						<Stack.Screen name="SignUp">{() => <SignUpScreen setToken={setToken} />}</Stack.Screen>
					</>
				) : (
					// User is signed in ! 🎉
					<Stack.Screen
						name="Tab"
						options={{ headerShown: false }}
					>
						{() => (
							<Tab.Navigator
								screenOptions={{
									headerShown: false,
									tabBarActiveTintColor: 'tomato',
									tabBarInactiveTintColor: 'gray',
								}}
							>
								<Tab.Screen
									name="TabHome"
									options={{
										tabBarLabel: 'Home',
										tabBarIcon: ({ color, size }) => (
											<Ionicons
												name={'ios-home'}
												size={size}
												color={color}
											/>
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen
												name="Home"
												options={{
													headerTitle: () => (
														<Ionicons
															name={'ios-home'}
															size={30}
															color={'black'}
														/>
													),

													// headerStyle: { backgroundColor: 'red' },
													headerTitleStyle: { color: 'white' },
												}}
											>
												{() => <HomeScreen />}
											</Stack.Screen>
											<Stack.Screen
												name="Room"
												options={{
													title: 'Room',
												}}
												component={RoomScreen}
											></Stack.Screen>
											<Stack.Screen
												name="Profile"
												options={{
													title: 'User Profile',
												}}
											>
												{() => <ProfileScreen />}
											</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>
								<Tab.Screen
									name="TabAroundMe"
									options={{
										tabBarLabel: 'Around Me',
										tabBarIcon: ({ color, size }) => (
											<Ionicons
												name={'ios-map-outline'}
												size={size}
												color={color}
											/>
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen
												name="Around Me"
												options={{
													title: 'Around Me',
												}}
												component={AroundMeScreen}
											></Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>
								<Tab.Screen
									name="TabSettings"
									options={{
										tabBarLabel: 'Settings',
										tabBarIcon: ({ color, size }) => (
											<Ionicons
												name={'ios-options'}
												size={size}
												color={color}
											/>
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen
												name="Settings"
												options={{
													title: 'Settings',
												}}
											>
												{() => <SettingsScreen setToken={setToken} />}
											</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>
							</Tab.Navigator>
						)}
					</Stack.Screen>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
