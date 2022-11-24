import { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
export default function SignUpScreen({ setToken }) {
	const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [description, setDescription] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [alertMessage, setAlertMessage] = useState('');
	const [onFetch, setOnFetch] = useState(false);
	const [passHiddenPass, setPassHiddenPass] = useState(true);
	const [passHiddenPass2, setPassHiddenPass2] = useState(true);
	const navigation = useNavigation();

	const handleSubmit = async () => {
		setAlertMessage('');
		try {
			if (!email || !confirmPassword || !password || !username) {
				setAlertMessage('Please fill all fields');
			} else if (password !== confirmPassword) {
				setAlertMessage('Passwords must be the same');
			}

			const url = 'https://express-airbnb-api.herokuapp.com/user/sign_up';
			const data = { email, password, username, description };
			const response = await axios.post(url, data);
			const token = response.data.token;
			console.log(response.data);
			alert('connexion réussie');

			setToken(token);
		} catch (error) {
			console.log(error.message);
			if (error.message === 'Request failed with status code 401') {
				return setAlert('Email or password incorect');
			} else {
				console.log(error.message);
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
				<Text>Sign up</Text>
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
				<TextInput
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.signInFields}
					placeholder="username"
					onChangeText={(text) => {
						setUsername(text);
					}}
				/>

				<TextInput
					autoCapitalize="none"
					multiline
					autoCorrect={false}
					style={styles.signInFieldsArea}
					numberOfLines={10}
					placeholder="Describe yourself in a few words"
					onChangeText={(text) => {
						setDescription(text);
					}}
				/>

				{/* <Text>Password: </Text> */}
				<View style={styles.signInFields}>
					<TextInput
						style={{ width: 250 }}
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Password"
						secureTextEntry={passHiddenPass}
						onChangeText={(text) => {
							setPassword(text);
						}}
					/>
					<TouchableOpacity
						onPress={() => {
							setPassHiddenPass(!passHiddenPass);
						}}
					>
						<Image
							style={styles.eye}
							source={passHiddenPass ? require('../assets/hidden.png') : require('../assets/eye.png')}
						></Image>
					</TouchableOpacity>
				</View>
				<View style={styles.signInFields}>
					<TextInput
						style={{ width: 250 }}
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Confirm password"
						secureTextEntry={passHiddenPass2}
						onChangeText={(text) => {
							setConfirmPassword(text);
						}}
					/>
					<TouchableOpacity
						onPress={() => {
							setPassHiddenPass2(!passHiddenPass2);
						}}
					>
						<Image
							style={styles.eye}
							source={passHiddenPass2 ? require('../assets/hidden.png') : require('../assets/eye.png')}
						></Image>
					</TouchableOpacity>
				</View>
				<View style={{ height: 25, justifyContent: 'center', alignItems: 'center', marginTop: 15, width: '100%' }}>{alertMessage && <Text style={styles.alert}>{alertMessage}</Text>}</View>
				<View style={styles.signInButtonWrapper}>
					<View style={styles.signInButton}>
						<Button
							disabled={onFetch}
							title="Sign up"
							color={'#727272'}
							onPress={async () => {
								setOnFetch(true);
								console.log('hello');
								await handleSubmit();
								setOnFetch(false);
							}}
						/>
					</View>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('SignIn');
						}}
					>
						<Text>Already have an account ? Sign in</Text>
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
		marginBottom: 30,
		marginTop: 5,
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
	signInFieldsArea: {
		height: 100,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: 'tomato',
		color: 'blue',
		padding: 15,
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
