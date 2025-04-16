import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(getLoginDetails, 3000);
  }, []);

  const getLoginDetails = async () => {
    let UserId = await AsyncStorage.getItem('UserId');
    let Status = await AsyncStorage.getItem('Status');

    if (UserId && Status === 'true') {
      navigation.replace('Dashboard');
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.upper}>
        {/* <View
          style={{
            width: '40%',
            height: '15%',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Image
            source={require('../Assets/Images/ptc.jpg')}
            style={styles.logo}
          />
        </View> */}
        <View>
          <Text style={styles.company_name}>JBM</Text>
        </View>
      </View>
      <View style={styles.lower}>
        <Text style={styles.tranzol}>Powered By Tranzol</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2596be',
    paddingTop: StatusBar.currentHeight,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  upper: {
    flex: 25,
    marginTop: '25%',
    marginHorizontal: '5%',
    backgroundColor: '#2596be',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  lower: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  company_name: {
    fontFamily: 'PoppinsExtraBold',
    color: '#eeeeee',
    fontSize: 45,
    textAlign: 'center',
    letterSpacing: 10,
  },

  tranzol: {
    fontSize: 10,
    position: 'absolute',
    bottom: 30,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'PoppinsExtraBold',
    color: '#eeeeee',
  },
});

export default Splash;
