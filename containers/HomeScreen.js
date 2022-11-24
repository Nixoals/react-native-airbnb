import { useNavigation } from '@react-navigation/core';
import { Button, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import HomeItem from '../components/HomeItems';

export default function HomeScreen() {
	const navigation = useNavigation();
	const [data, setData] = useState([]);
	const [isLoading, setIsloading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const token = await AsyncStorage.getItem('userToken');
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const response = await axios.get('https://express-airbnb-api.herokuapp.com/rooms', config);
			setData(response.data);
			setIsloading(false);
		};
		fetchData();
	}, []);

	return !isLoading ? (
		<View>
			<FlatList
				data={data}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return <HomeItem item={item}></HomeItem>;
				}}
			></FlatList>
		</View>
	) : (
		<>
			<ActivityIndicator></ActivityIndicator>
		</>
	);
}
