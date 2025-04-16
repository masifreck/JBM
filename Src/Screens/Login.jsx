import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  Platform,
  Animated,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showDialog, showToast} from '../Components/Notifications';

import useNetworkStatus from '../Components/NetworkStatus';
const Login = () => {
  const isConnected = useNetworkStatus();
  const navigation = useNavigation();
  const [IsLoading, setIsLoading] = useState(false);
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [passwordError, setpasswordError] = useState(false);
  // console.log('isconneced', isConnected);

  useEffect(() => {
    console.log(UserName, Password);
  }, []);

  const Authenticate = () => {
    if (UserName.length !== 0 || Password.length !== 0) {
      setIsLoading(true);
      fetch(
        `http://jbmp.tranzol.com/API/LoginAPI/Authenticate?UserName=${UserName}&Password=${Password}`,
        {
          method: 'GET',
          redirect: 'follow',
          headers: {
            'Content-Type': 'application/json',
         
          },
        },
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.result.Status === true) {
            AsyncStorage.setItem('UserId', result.result.UserId.toString());
            AsyncStorage.setItem('Status', result.result.Status.toString());
            AsyncStorage.setItem('UserName', UserName);
            setIsLoading(false);
            console.log(result);
            navigation.replace('Dashboard');
          } else {
            setIsLoading(false);
            console.log(result);
            showDialog('w', 'ERROR', 'Invalid Credentials');
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log(error);
          showDialog('i', 'ERROR', 'Something Went Wrong');
        });
     // setUserName('');
     // setPassword('');
    } else {
      setpasswordError(true);
    }
  };
  

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [changed, setchanged] = useState(true);
  useEffect(() => {
    console.log(isKeyboardVisible);
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [changed]);

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="#2596be" />
        <ScrollView>
          <View style={styles.tiltedBackground1}></View>
          <View style={styles.content}>
            {IsLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  marginTop: '25%',
                }}>
                <ActivityIndicator
                  animating={true}
                  color="#2596be"
                  size="large"
                />

                <Text
                  style={{
                    color: '#2596be',
                    textAlign: 'center',
                    fontSize: 15,
                    textTransform: 'uppercase',
                    fontFamily: 'PoppinsBold',
                    marginTop: 5,
                    letterSpacing: 2,
                  }}>
                  Loading
                </Text>
              </View>
            ) : (
              <View
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',

                  // marginTop: '50%',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10%',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'PoppinsBold',
                      color: '#2596be',
                      fontSize: 25,
                    }}>
                    Hello
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'PoppinsMedium',
                      color: '#2596be',
                      fontSize: 15,
                    }}>
                    Login To Your Account!
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // flex:1,
                  }}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholderTextColor={'#6c6f73'}
                      style={{
                        paddingLeft: 30,
                        color: 'black',
                        fontSize: 15,
                        width: '90%',
                        fontFamily: 'PoppinsRegular',
                      }}
                      placeholder={'Enter Username'}
                      value={UserName}
                      autoCorrect={false}
                      onChangeText={t => setUserName(t)}
                      onFocus={() => {
                        setchanged(!changed);
                      }}
                    />
                  </View>

                  {passwordError && (
                    <Text
                      style={{
                        color: 'red',
                        alignSelf: 'flex-start',
                        fontSize: 13,
                        left: 10,
                        marginLeft: '11%',
                        fontFamily: 'PoppinsRegular',
                      }}>
                      Enter Username
                    </Text>
                  )}

                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholderTextColor={'#6c6f73'}
                      style={{
                        paddingLeft: 30,
                        color: 'black',
                        fontSize: 15,
                        width: '100%',
                        fontFamily: 'PoppinsRegular',
                      }}
                      placeholder={'Enter Password'}
                      value={Password}
                      secureTextEntry={true}
                      autoCorrect={false}
                      onChangeText={t => setPassword(t)}
                      onFocus={() => {
                        setchanged(!changed);
                      }}
                    />
                  </View>

                  {passwordError && (
                    <Text
                      style={{
                        color: 'red',
                        alignSelf: 'flex-start',
                        fontSize: 13,
                        left: 10,
                        marginLeft: '11%',
                        fontFamily: 'PoppinsRegular',
                      }}>
                      Enter Password
                    </Text>
                  )}

                  <TouchableOpacity
                    style={styles.button}
                    onPress={Authenticate}>
                    <Text style={styles.text}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      {!isKeyboardVisible && (
        <Text style={styles.footerText}>Powered By Tranzol</Text>
      )}
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
    // paddingBottom: '50%',
    paddingTop: StatusBar.currentHeight,
  },
  tiltedBackground1: {
    position: 'absolute',
    top: -300,
    right: 300,
    width: '100%', // Make it wider than 100% to ensure the tilt covers the screen width
    height: '50%', // Adjust height as needed
    backgroundColor: '#2596be', // Change to desired background color
    transform: [{rotate: '0deg'}], // Adjust the angle as needed
    borderRadius: 600,
  },

  inputContainer: {
    height: 60,
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'row',
    // paddingHorizontal: 15,
    borderRadius: 50,
    // borderWidth: 0.5,
    alignItems: 'center',
    marginVertical: '3%',
    // borderColor:'#5d92d4',
    shadowColor: '#2596be',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  logo: {
    // width: "auto",
    height: 180,
    resizeMode: 'contain',
    marginTop: 40,
  },
  img: {
    width: 450,
    height: 250,
    marginTop: 10,
    marginBottom: 10,
  },
  txt: {
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
    // fontFamily:"PoppinsExtraBold"
    fontFamily: 'PoppinsRegular',
    letterSpacing: 1,
  },
  txt1: {
    fontSize: 28,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    color: '#525CEB',
    shadowColor: 'black',
    shadowRadius: 5,
    elevation: 50, // for Android
  },

  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  rrightIcon: {
    position: 'absolute',
    right: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  button: {
    backgroundColor: '#2596be',
    borderRadius: 100,
    marginVertical: '10%',
    height: '14%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: 'PoppinsBold',
  },
  inputError: {
    borderColor: 'red', // add red border color if mobile number is not valid
  },
  errorText: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    marginTop: 5,
  },
  footerText: {
    fontFamily: 'PoppinsBold',
    alignSelf: 'center',
    fontSize: 11,
    color: 'black',
    position: 'absolute',
    bottom: 0,
    // zIndex: -9999,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
  tiltedBackground1: {
    position: 'relative',
    top: -200,
    right: 100,
    width: '200%', // Make it wider than 100% to ensure the tilt covers the screen width
    height: 250, // Adjust height as needed
    backgroundColor: '#2596be', // Change to desired background color
    transform: [{rotate: '-20deg'}], // Adjust the angle as needed
  },
  // tiltedBackground2: {
  //   position: 'absolute',
  //   top: -240,
  //   left: -150,
  //   width: '200%', // Make it wider than 100% to ensure the tilt covers the screen width
  //   height: 300, // Adjust height as needed
  //   backgroundColor: '#3282B8', // Change to desired background color
  //   transform: [{rotate: '-25deg'}], // Adjust the angle as needed
  // },
  content: {
    justifyContent: 'center',
    // marginBottom: 50,
    padding: 0,
    alignItems: 'center',
    // backgroundColor:"red"
  },

  text1: {
    fontSize: 34,
    color: 'black',
    fontFamily: 'PoppinsBold',
    letterSpacing: 1,
    textAlign: 'left',
    width: '80%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },

  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    paddingHorizontal: 8,
  },
  submitbtn: {
    width: '80%',
    marginTop: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4C75',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    margin: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
