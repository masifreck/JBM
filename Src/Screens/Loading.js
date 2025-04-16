import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Animated,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { showToast } from '../Components/Notifications';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
const Loading = () => {
  const navigation = useNavigation();
  const [ChallanNo, setChallanNo] = useState('');
  const [hasBorder, sethasBorder] = useState(false);

  const HandleSubmit = async () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `http://jbmp.tranzol.com/API/VendorAPI/GetChallanListDetails?Passno=${ChallanNo}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (ChallanNo.length === 0) {
          showToast('d', 'Error', 'Enter Challan Number');
          sethasBorder(true);
          setTimeout(() => {
            sethasBorder(false);
          }, 3000);
        } else {
          console.log(result);
          if (result.result[0] === undefined) {
            console.log('n', result.result[0]);
            setChallanNo('');
            // showDialog('i', 'Failed', 'Challan Number Not Found');
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'Failed',
              textBody: 'Challan Number Not Found',
            });
          } else {
            console.log('t', result.result[0]);
            console.log(result.result[0]);
            setChallanNo('');
            navigation.navigate('ShowLoading', {
              output: result.result[0],
            });
          }
        }
      })
      .catch(error => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'ERROR',
          textBody: 'Something Went Wrong',
          button: 'close',
        });
        // showDialog('w', 'ERROR', 'Something Went Wrong');
        console.log(error);
        setChallanNo('');
      });
  };
  const HandleSubmitUpdate = async () => {
    if (ChallanNo.length === 0) {
      showToast('d', 'Error', 'Enter Challan Number');
      sethasBorder(true);
      setTimeout(() => {
        sethasBorder(false);
      }, 3000);
      return; // Exit early if no Challan number is provided
    }
  
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
  
    try {
      const response = await fetch(
        `http://jbmp.tranzol.com/API/VendorAPI/GetUpdateDetails?Passno=${encodeURIComponent(ChallanNo)}`,
        requestOptions
      );
      const result = await response.json();
  
      console.log(result); // Log the entire result to check its structure
  
      if (result.result === 'Passno does not exist in LoadingTrip table') {
        setChallanNo('');
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Failed',
          textBody: 'Challan Number Not Found',
        });
      } else if (result.result === 'Passno exists') {
        console.log('Challan no Main Page', ChallanNo);
        navigation.navigate('UpdateLoading', {
          ChallanNo: ChallanNo,
        });
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'ERROR',
        textBody: 'Something Went Wrong',
        button: 'close',
      });
      console.log(error);
      setChallanNo('');
    }
  };
  
  
  
 
  return (
    <AlertNotificationRoot>
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="#2596be"
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <View
            style={{
              height: 200,
              width: '50%',
              alignItems: 'center',
              borderRadius: 10,
              shadowColor: 'black', // Set shadow color to blue
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 10, // This is for Android
            }}>
            <Image
              source={require('../Assets/Images/FG-loading.png')}
              style={styles.image}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              {
                borderWidth: hasBorder ? 0.9 : 0,
                borderColor: hasBorder ? 'red' : 'transparent',
              },
            ]}>
            <Image
              style={styles.leftIcon}
              source={require('../Assets/Images//id-card.png')}
            />
            <TextInput
              placeholderTextColor={'black'}
              style={styles.input}
              placeholder="Enter Challan Number"
              value={ChallanNo}
              onChangeText={text => setChallanNo(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={HandleSubmit}>
            <Text style={styles.buttonText}>Show Loading Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonupdate} onPress={HandleSubmitUpdate}>
            <Text style={styles.buttonText}>Update Loading Details</Text>
          </TouchableOpacity>

          <View style={styles.registerTextContainer}>
            <Text style={styles.blackText}>If Not Registered!</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RegisterLoading');
              }}>
              <Text style={styles.blueText}>Click Here to Register.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '55%',
    marginBottom: 20,
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  image: {
    height: 200,
    width: '100%',
    backgroundColor: '#2596be',
    borderRadius: 10,
  },
  inputContainer: {
    height: 55,
    width: 300,
    backgroundColor: '#D2F3FD',
    // backgroundColor:"black",
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    paddingTop: 13,
    paddingLeft: 30,
    letterSpacing: 0.5,
    color: 'black',
    fontSize: 15,
    width: 250,
    fontFamily: 'PoppinsSemiBold',
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  button: {
    backgroundColor: '#2596be',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 20,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonupdate: {
    backgroundColor: '#2596be',
    borderRadius: 5,
    marginBottom: 20,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: '#2596be',
    borderRadius: 5,
    marginBottom: 20,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: 'PoppinsSemiBold',
  },
  linkText: {
    color: '#2596be',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  blackText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'PoppinsMedium',
  },
  blueText: {
    color: '#2596be',
    fontSize: 14,
    // fontWeight: '500',
    fontFamily: 'PoppinsBold',
  },
  toastContainer: {
    borderRadius: 5,
    position: 'absolute',
    bottom: '26%', // Center vertically
    left: '26%', // Center horizontally
    transform: [{translateX: -50}, {translateY: -50}], // Center both horizontally and vertically
  },
  toastText: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
    shadowColor: 'black', // Set shadow color to blue
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10, // This is for Android
  },
});

export default Loading;
