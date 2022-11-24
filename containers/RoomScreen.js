import { Text, View, FlatList, Image, ScrollView, StyleSheet, Dimensions, Pressable } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Icon, Ionicon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const RoomScreen = ({ route, navigation }) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsloading] = useState(true);
	const [showMore, setShowMore] = useState(false);

	const id = route.params.id;
	useEffect(() => {
		const fetchData = async () => {
			const token = await AsyncStorage.getItem('userToken');
			const config = {
				Headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const url = `https://express-airbnb-api.herokuapp.com/rooms/${id}`;
			const response = await axios.get(url, config);

			setData(response.data);
			setIsloading(false);
		};
		fetchData();
	}, []);

	return !isLoading ? (
		<ScrollView>
			<View>
				{/* <FlatList
				horizontal
				data={data.photos}
				keyExtractor={(item) => {
					item.picture_id;
				}}
				renderItem={({ item }) => {
					return (
						<>
							<Image
								style={styles.pictures}
								source={{ uri: item.url }}
							></Image>
						</>
					);
				}}
			></FlatList> */}
				<View>
					<SwiperFlatList
						autoplay
						autoplayDelay={2}
						autoplayLoop
						index={2}
						showPagination
						data={data.photos}
						renderItem={({ item }) => (
							<>
								<Image
									style={styles.pictures}
									source={{ uri: item.url }}
									key={item._id}
								></Image>
							</>
						)}
					/>
				</View>

				<View style={styles.reviews}>
					<View style={{ height: 70, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={{ flexDirection: 'column', height: 50, flex: 5 }}>
							<Text
								numberOfLines={1}
								ellipsizeMode="tail"
								style={styles.itemTitle}
							>
								{data.title}
							</Text>
							<View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 30, justifyContent: 'flex-start' }}>
								<AirbnbRating
									count={5}
									defaultRating={data.ratingValue}
									reviews={''}
									size={12}
									reviewSize={15}
									starContainerStyle={{ height: 20 }}
								/>
								<Text>{data.reviews} reviews</Text>
							</View>
						</View>
						<View style={styles.userprofile}>
							<Image
								style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 35 }}
								source={{ uri: data.user.account.photo.url }}
							></Image>
						</View>
					</View>
					<Text
						numberOfLines={showMore ? 100 : 3}
						ellipsizeMode="tail"
						style={{}}
					>
						{data.description}{' '}
					</Text>
					<View style={styles.buttonShowMore}>
						<Pressable
							onPress={() => {
								setShowMore(!showMore);
							}}
						>
							<Text style={{ fontSize: 12, paddingTop: 10 }}>
								{showMore ? (
									<View>
										<Text>
											Show less{' '}
											<Icon
												name="ios-caret-up-outline"
												type="ionicon"
												color="#517fa4"
											/>
										</Text>
									</View>
								) : (
									<View>
										<Text>
											Show More{' '}
											<Icon
												name="ios-caret-down-outline"
												type="ionicon"
												color="#517fa4"
											/>
										</Text>
									</View>
								)}
							</Text>
						</Pressable>
					</View>
				</View>
				<View style={styles.mapContainer}>
					<MapView
						style={styles.map}
						provider={PROVIDER_GOOGLE}
						initialRegion={{
							latitude: data.location[1],
							longitude: data.location[0],
							latitudeDelta: 0.04,
							longitudeDelta: 0.04,
						}}
					>
						<Marker
							coordinate={{ latitude: data.location[1], longitude: data.location[0] }}
							title={data.title}
							description={`${data.price} €`}
						/>
					</MapView>
				</View>
			</View>
		</ScrollView>
	) : (
		<>
			<Text>Loading</Text>
		</>
	);
};

export default RoomScreen;

const styles = StyleSheet.create({
	pictures: {
		width: Dimensions.get('window').width,
		height: 200,
	},
	pictureContainer: {
		padding: 15,
	},
	picture: {
		width: '100%',
		height: 200,
		resizeMode: 'cover',
	},
	price: {
		fontSize: 18,
		color: 'white',
	},
	priceContainer: {
		height: 40,
		width: 80,
		backgroundColor: 'black',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 10,
		flex: 1,
	},
	itemTitle: {
		fontSize: 18,
	},

	reviews: {
		paddingHorizontal: 15,
		marginTop: 20,
	},
	userprofile: {
		height: 70,
		width: 70,
		borderRadius: 35,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonShowMore: {
		alignItems: 'flex-start',
		marginBottom: 20,
	},
	mapContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		width: Dimensions.get('window').width * 0.95,
		height: 300,
		resizeMode: 'contain',
		borderWidth: 2,
		borderColor: 'gray',
	},
});

// Object {
//     "__v": 0,
//     "_id": "58ff73d11765a998979a33a0",
//     "description": "My apartment is next to Montmartre, less than 10 minutes from the Sacré Coeur. 2 min from the metro line 12, there are all the necessary shops in the neighborhood. The apartment has just been refurbished.",
//     "location": Array [
//       2.3374505,
//       48.8901751,
//     ],
//     "photos": Array [
//       Object {
//         "picture_id": "52a738e1",
//         "url": "https://a2.muscache.com/im/pictures/52a738e1-d699-4e6e-af31-b7aaf59e2b03.jpg",
//       },
//       Object {
//         "picture_id": "128dc52b",
//         "url": "https://a2.muscache.com/im/pictures/128dc52b-d10a-49f7-9e88-e11beee90491.jpg",
//       },
//       Object {
//         "picture_id": "584f9bfe",
//         "url": "https://a2.muscache.com/im/pictures/584f9bfe-7048-4f60-822d-54ddabd76c81.jpg",
//       },
//       Object {
//         "picture_id": "3e38b958",
//         "url": "https://a2.muscache.com/im/pictures/3e38b958-3ee6-43cb-9d07-7c35045584bf.jpg",
//       },
//       Object {
//         "picture_id": "4029375e",
//         "url": "https://a2.muscache.com/im/pictures/4029375e-3e6b-43fb-9c80-7f15d226ed82.jpg",
//       },
//     ],
//     "price": 80,
//     "ratingValue": 5,
//     "reviews": 50,
//     "title": "Bright apartment in Montmartre",
//     "user": Object {
//       "__v": 0,
//       "_id": "58ff73cc1765a998979a338c",
//       "account": Object {
//         "description": "My name is Astrid, I'm French, 29 years old and work for a communication agency specialized in food. I am passionate about food (of course!) and everything related to it. I also love reading, yoga, dogs, traveling, meeting new people and sharing a good meal with them !",
//         "photo": Object {
//           "picture_id": "1352061888",
//           "url": "https://a2.muscache.com/im/users/4058432/profile_pic/1352061888/original.jpg?aki_policy=profile_x_medium",
//         },
//         "username": "Astrid",
//       },
//       "email": "astrid@airbnb-api.com",
//       "hash": "lTL0PDLzY8w7ZpOyOAOAueqPqxCth5wKmEWyF7/TqQA=",
//       "rooms": Array [
//         "58ff73d11765a998979a33a0",
//       ],
//       "salt": "nFb7ZdcAJ9NY1ydDIeX6anVb50xs2T4CVpiqitNiGgICInSqQqG33Uzo9FPnSzbm",
//       "token": "uReWHicA9kSg71XsYE52qkUnpmwucGrR7u8DgiQeKlEKkh8dGZQHK29FltK1ktC6",
//     },
//   }
