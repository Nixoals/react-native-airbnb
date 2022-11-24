import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, MapCallout, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AroundMeScreen({ navigation }) {
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [isLoading, setIsloading] = useState(true);
	const [data, setData] = useState(null);
	console.log(navigation);

	useEffect(() => {
		const getPermission = async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status === 'granted') {
				const location = await Location.getCurrentPositionAsync();
				const url = 'https://express-airbnb-api.herokuapp.com/rooms/around';
				const response = await axios.get(url);
				setData(response.data);

				setLongitude(location.coords.longitude);
				setLatitude(location.coords.latitude);
				setIsloading(false);
			} else {
				alert('Vous devez accepter la localisation');
			}
		};
		getPermission();
	}, []);
	return !isLoading ? (
		<>
			<View>
				<MapView
					style={styles.map}
					provider={PROVIDER_GOOGLE}
					initialRegion={{
						longitude,
						latitude,
						latitudeDelta: 0.1,
						longitudeDelta: 0.1,
					}}
				>
					{data.map((item) => {
						return (
							<Marker
								key={item._id}
								coordinate={{ longitude: item.location[0], latitude: item.location[1] }}
								title={item.title}
								description={`${item.price} `}
								onPress={() => {
									navigation.navigate('Room', { id: item._id });
								}}
							></Marker>
						);
					})}
				</MapView>
			</View>
		</>
	) : (
		<View>
			<Text>Loading</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	mapContainer: {},
	map: {
		height: Dimensions.get('window').height * 0.95,
		width: Dimensions.get('window').width * 0.95,
	},
});
