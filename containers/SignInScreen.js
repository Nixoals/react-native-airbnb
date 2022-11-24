import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import { Button, Text, TextInput, View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function SignInScreen({ setToken }) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [alertMessage, setAlertMessage] = useState('');
	const [onFetch, setOnFetch] = useState(false);
	const [passHidden, setPassHidden] = useState(true);
	const navigation = useNavigation();

	const handleSubmit = async () => {
		try {
			if (!email) {
				setAlertMessage('Email is required');
			} else if (!password) {
				setAlertMessage('Password is required');
			}
			const url = 'https://express-airbnb-api.herokuapp.com/user/log_in';
			const data = { email, password };
			const response = await axios.post(url, data);
			const token = response.data.token;
			console.log(token);

			setToken(token);
		} catch (error) {
			if (error.message === 'Request failed with status code 401') {
				return setAlertMessage('Email or password incorect');
			}
		}
	};
	return (
		<View>
			<View style={styles.logo}>
				<Image
					style={{ width: 90, height: 90, resizeMode: 'contain' }}
					source={require('../assets/airbnblogo.png')}
				></Image>
				<Text>Sign in</Text>
			</View>
			<View style={styles.fliedsContainer}>
				<TextInput
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.signInFields}
					placeholder="email"
					onChangeText={(text) => {
						setEmail(text);
					}}
				/>
				{/* <Text>Password: </Text> */}
				<View style={styles.signInFields}>
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Password"
						secureTextEntry={passHidden}
						onChangeText={(text) => {
							setPassword(text);
						}}
					/>
					<TouchableOpacity
						onPress={() => {
							setPassHidden(!passHidden);
						}}
					>
						<Image
							style={styles.eye}
							source={passHidden ? require('../assets/hidden.png') : require('../assets/eye.png')}
						></Image>
					</TouchableOpacity>
				</View>
				<View style={{ height: 25, justifyContent: 'center', alignItems: 'center', marginTop: 70, width: '100%' }}>{alertMessage && <Text style={styles.alert}>{alertMessage}</Text>}</View>
				<View style={styles.signInButtonWrapper}>
					<View style={styles.signInButton}>
						<Button
							disabled={onFetch}
							title="Sign in"
							color={'#727272'}
							onPress={async () => {
								setOnFetch(true);
								await handleSubmit();
								setOnFetch(false);
							}}
						/>
					</View>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('SignUp');
						}}
					>
						<Text>No account ? Register</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	logo: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 100,
		marginTop: 50,
	},
	fliedsContainer: {
		paddingHorizontal: 24,
	},
	signInFields: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderColor: 'tomato',
		color: 'blue',
		height: 30,
		marginBottom: 20,
		position: 'relative',
	},
	signInButtonWrapper: {
		alignItems: 'center',
		position: 'relative',
	},
	signInButton: {
		justifyContent: 'center',
		width: 200,
		height: 55,
		borderRadius: 30,
		borderColor: 'tomato',
		borderWidth: 2,
		color: 'red',
		marginBottom: 20,
	},
	alert: {
		color: 'red',
	},

	eye: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 20,
		width: 20,
		marginLeft: 'auto',
	},
});
