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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Loading = () => {
  const navigation = useNavigation();
  const [dlNumber, setdlNumber] = useState();
  return (
    <ScrollView>
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
            source={require('../Assets/Images/gg.png')}
            style={styles.image}
          />
        </View>

        <View style={[styles.inputContainer]}>
          <Image
            style={styles.leftIcon}
            source={require('../Assets/Images/id-card.png')}
          />
          <TextInput
            placeholderTextColor={'black'}
            style={styles.input}
            placeholder="Enter Challan Number"
            value={dlNumber}
            onChangeText={text => setdlNumber(text)}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Print Challan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
