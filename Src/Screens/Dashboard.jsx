import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Dashboard = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    getUserID();
  }, []);

  const [userId, setUserid] = useState('');

  const getUserID = async () => {
    const userId = await AsyncStorage.getItem('UserName');
    setUserid(userId);
  };
  const signOut = () => {
    Alert.alert(
      'Signout',
      'Do you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            AsyncStorage.setItem('UserId', '');
            AsyncStorage.setItem('Status', '');
            AsyncStorage.setItem('UserName', '');
            navigation.navigate('Login');
          },
        },
      ],
      {cancelable: false},
    );
    // Clear AsyncStorage to logout user
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerFirst}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              width: '100%',
              // backgroundColor: 'red',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                height: '100%',
              }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: 'contain',
                  backgroundColor: 'white',
                  borderRadius: 5,
                }}
                source={require('../Assets/Images/tranzolLogo.png')}
                alt="logo"
              />
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'PoppinsExtraBold',
                  color: 'white',
                  marginLeft: '5%',
                  letterSpacing: 1,
                }}>
                TRANZOL
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 0,
                right: 20,
                // backgroundColor: 'green',
                height: '100%',
              }}>
              <TouchableOpacity onPress={signOut}>
                <Image
                  source={require('../Assets/Images/logout.png')}
                  style={styles.logomenu}
                  alt="img"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 10,
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
              marginLeft: '5%',
            }}>
            <Text
              style={{
                fontFamily: 'PoppinsBold',
                fontSize: 40,
                color: 'white',
              }}>
              Hello!
            </Text>
            <Text
              style={{
                fontFamily: 'PoppinsMedium',
                fontSize: 20,
                color: 'white',
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}>
              {userId}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 5,
            height: '100%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View style={{flex: 0}}>
            <Text
              style={{
                fontSize: 20,
                letterSpacing: 1,
                fontFamily: 'PoppinsBold',
                color: 'gray',
                marginVertical: '2%',
              }}>
              DASHBOARD
            </Text>
          </View>
          <View style={styles.content}>
            <View
              style={{
                justifyContent: 'space-evenly',
                width: '100%',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  width: '30%',
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,

                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 14,
                }}
                onPress={() => {
                  navigation.navigate('Loading');
                }}>
                <Image
                  source={require('../Assets/Images/FG-loading.png')}
                  style={styles.logoConsignment}
                />
                <Text style={styles.boxtext}>Loading</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '30%',
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,

                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 14,
                }}
                onPress={() => {
                  navigation.navigate('Unloading');
                }}>
                <Image
                  source={require('../Assets/Images/unloading.png')}
                  style={styles.logoConsignment}
                />
                <Text style={styles.boxtext}>Unlaoding</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'space-evenly',
                width: '100%',
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: '30%',
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,

                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 14,
                }}
                onPress={() => {
                  navigation.navigate('PrintChallan');
                }}>
                <Image
                  source={require('../Assets/Images/statistics.png')}
                  style={styles.logoConsignment}
                />
                <Text style={styles.boxtext}>Print Challan</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '30%',
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}></View>
            </View>
          </View>
          <Text
            style={{color: 'gray', fontFamily: 'PoppinsBold', fontSize: 10}}>
            Powered By Tranzol
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2596be',
    paddingTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  HeaderText: {
    top: 13,
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  header: {
    height: 60,

    borderBottomEndRadius: 150,
    borderBottomStartRadius: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    paddingHorizontal: 20,
  },

  headerFirst: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2596be',
    marginTop: '2%',
  },
  userNameInfo: {
    // backgroundColor: "red"
    marginLeft: '2%',
    marginBottom: '2%',
  },

  logo: {
    width: 60,
    height: 60,
  },
  logoConsignment: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  logomenu: {
    width: 25,
    tintColor: 'white',
    height: 25,
    // marginRight:"1%",
  },
  content: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'red',
    // alignSelf: 'flex-end',
    // marginTop:"5%",
    alignItems: 'flex-start',

    flexDirection: 'column',
    // backgroundColor:"red"
  },
  row: {
    // backgroundColor:"red",
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems:"center",
    // alignContent:"center"
    // alignContent:"stretch"
    // marginTop: '5%',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  box: {
    width: '55%', // Adjust based on your design
    aspectRatio: 1, // To maintain a square aspect ratio, adjust as needed
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    // margin: '5%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 14,
  },
  boxtext: {
    marginTop: '5%',
    fontSize: 12,
    color: 'black',
    fontFamily: 'PoppinsRegular',
  },
  footer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  FooterText: {
    fontStyle: 'italic',
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Dashboard;


