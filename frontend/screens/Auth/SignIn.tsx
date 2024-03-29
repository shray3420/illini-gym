// import React, { useState } from "react";
// import {
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Image,
// } from "react-native";
// import { signInUser } from "../../firebase/authConfig";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Colors from "../../constants/Colors";
// import CustomText from "../Reusables/CustomText";
// import { Keyboard } from "react-native";

// type SignInProps = {
//   setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const SignIn = (props: SignInProps) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   return (
//     <SafeAreaView style={styles.parentContainer}>
//       {/* <Image
//       source={require('../../Images/Illini.png')}
//       style={styles.logoImage}
//     /> */}
//       <CustomText style={styles.signUpText}>Welcome!</CustomText>

//       <TextInput
//         style={styles.TextInput}
//         placeholder="Email"
//         autoCapitalize="none"
//         keyboardType="email-address"
//         onChangeText={(text) => setEmail(text)}
//       />
//       <TextInput
//         style={styles.TextInput}
//         placeholder="Password"
//         secureTextEntry={true}
//         onChangeText={(text) => setPassword(text)}
//       />
//       <TouchableOpacity
//         style={styles.Button}
//         onPress={() => {
//           Keyboard.dismiss();
//           signInUser(email, password, setError);
//         }}
//       >
//         <CustomText style={styles.ButtonText}>Sign In</CustomText>
//       </TouchableOpacity>

//       <View style={styles.container}>
//         <CustomText>Don't have an account? </CustomText>
//         <CustomText
//           style={styles.changeText}
//           onPress={(event: React.MouseEvent) => {
//             props.setHasAccount(false);
//           }}
//         >
//           Sign Up
//         </CustomText>
//       </View>
//       <CustomText style={styles.ErrorText}>{error}</CustomText>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     margin: 5,
//   },
//   signUpText: {
//     marginTop: 20,
//     fontSize: 27,
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: 10,
//   },
//   parentContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     backgroundColor: Colors.midnightBlue,
//   },
//   signInText: {
//     fontSize: 27,
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: 10,
//   },
//   changeText: {
//     color: Colors.uiucOrange,
//   },
//   TextInput: {
//     width: 250,
//     height: 40,
//     borderWidth: 1,
//     borderColor: "lightgray",
//     backgroundColor: "white",
//     padding: 5,
//     margin: 5,
//     borderRadius: 5,
//   },
//   Button: {
//     width: 250,
//     margin: 5,
//     padding: 10,
//     alignItems: "center",
//     backgroundColor: Colors.uiucOrange,
//     borderRadius: 10,
//   },
//   ButtonText: {
//     color: "white",
//   },
//   ErrorText: {
//     textAlign: "center",
//     color: "red",
//   },
//   // Add your image style here
//   logo: {
//     width: 400,
//     height: 150,
//     marginBottom: 20,
//     marginLeft: 30,
//   },
//   logoImage: {
//     width: 200, // Adjust as per your logo's dimensions
//     height: 300, // Adjust as per your logo's dimensions
//     marginBottom: 20,
//     // Add other styling as needed
//   },
// });

// export default SignIn;
