import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';

const HomeItem = ({ item }) => {
	const navigation = useNavigation();
	const { title, reviews, ratingValue, user, photos, _id, price } = item;

	return (
		<>
			<View style={styles.pictureContainer}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Room', { id: _id });
					}}
				>
					<View style={{ position: 'relative' }}>
						<Image
							style={styles.picture}
							source={{ uri: photos[0].url }}
						/>
						<View style={styles.priceContainer}>
							<Text style={styles.price}>{price} €</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.reviews}>
				<View style={{ height: 70, alignItems: 'flex-start', paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ flexDirection: 'column', height: 50, flex: 5 }}>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={styles.itemTitle}
						>
							{title}
						</Text>
						<View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 30, justifyContent: 'flex-start' }}>
							<AirbnbRating
								count={5}
								defaultRating={ratingValue}
								reviews={''}
								size={12}
								reviewSize={15}
								starContainerStyle={{ height: 20 }}
							/>
							<Text>{reviews} reviews</Text>
						</View>
					</View>
					<View style={styles.userprofile}>
						<Image
							style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 35 }}
							source={{ uri: user.account.photo.url }}
						></Image>
					</View>
				</View>
			</View>
		</>
	);
};

export default HomeItem;

const styles = StyleSheet.create({
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
		paddingBottom: 15,
		borderBottomWidth: 0.5,
		borderBottomColor: 'gray',
	},
	userprofile: {
		height: 70,
		width: 70,
		borderRadius: 35,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

// Object {
//     "__v": 0,
//     "_id": "58ff73cc1765a9979391c532",
//     "description": "Apartment refurbished full of charm rue du Recherches-Midi, in the heart of the 6th arrondissement. Close to Luxembourg and the Bon Marché. Two bedrooms, sublime view of the Eiffel Tower, 2 balconies, very nice bathroom with separate WC. Open equipped kitchen, sofa bed, wifi ... A dream!",
//     "location": Array [
//       2.3215788,
//       48.8480923,
//     ],
//     "photos": Array [
//       Object {
//         "picture_id": "a560cdc0",
//         "url": "https://a2.muscache.com/im/pictures/a560cdc0-425d-4d7b-ab8a-f98481eeb23f.jpg",
//       },
//       Object {
//         "picture_id": "38eb9bfe",
//         "url": "https://a2.muscache.com/im/pictures/38eb9bfe-bd03-4c21-a3b8-4d3c8e44c4c9.jpg",
//       },
//       Object {
//         "picture_id": "3e3b2eda",
//         "url": "https://a2.muscache.com/im/pictures/3e3b2eda-f99f-4ac3-94dd-3c3dc8f80c7a.jpg",
//       },
//       Object {
//         "picture_id": "25308387",
//         "url": "https://a2.muscache.com/im/pictures/25308387-a29c-4442-b927-39f2bd9c0e6f.jpg",
//       },
//       Object {
//         "picture_id": "db9f14c0",
//         "url": "https://a2.muscache.com/im/pictures/db9f14c0-e7bc-4d2c-a87a-3f8ed0dce7ff.jpg",
//       },
//     ],
//     "price": 200,
//     "ratingValue": 4,
//     "reviews": 48,
//     "title": "View of the Eiffel Tower in Saint Germain!",
//     "user": Object {
//       "__v": 0,
//       "_id": "58ff73cc1765a998979a338f",
//       "account": Object {
//         "description": "In the center of Paris, you will find on the 4th floor of a typical Parisian building a very nice flat with all necessary equipment.",
//         "photo": Object {
//           "picture_id": "1410285266",
//           "url": "https://a1.muscache.com/im/users/4654829/profile_pic/1410285266/original.jpg?aki_policy=profile_x_medium",
//         },
//         "username": "Lucy",
//       },
//       "email": "lucy@airbnb-api.com",
//       "hash": "uItzDNEckEAPUCaekPgbJwemk1JtXuHc9QULafCgcgI=",
//       "rooms": Array [
//         "58ff73cc1765a998979a3391",
//       ],
//       "salt": "gQr13ZPzsRVPwXth3BKXXgcbUIgmqTouOTsVt1hXVUPqed9O9wgb9BqhkOvdGKOQ",
//       "token": "91gpYw7ku8xTT0S6pOu7cOCxbIMvuo4vpokGZjszJjkaEAIe9OEeB3kF3RleofQ1",
//     },
