import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Image,
  Button,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import CustomInput from '../Components/CustomInput';
import CustomDropdown from '../Components/CustomDropdown';
import DatePicker from 'react-native-date-picker';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import Calander from '../Components/Calander';
import {SelectCountry} from 'react-native-element-dropdown';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterUnloading = () => {
  const navigation = useNavigation();
  const [UserId, setUserId] = useState(null);
  // const now = new Date();
  useEffect(() => {
    const getLoginDetails = async () => {
      let UserId = await AsyncStorage.getItem('UserId');
      setUserId(UserId);
    };
    getLoginDetails();
  }, []);
  console.log(UserId);

  // ==========
  const [challanno, setChallanno] = useState('');
  const [LoadWt, setLoadWt] = useState('0.00');
  const [UnLoadWt, setUnLoadWt] = useState('0.00');

  const [Shortage, setShortage] = useState('0.00');

  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const [hasBorder, sethasBorder] = useState(false);


  useEffect(() => {
    console.log(LoadWt, UnLoadWt);
    const parsedHsdQty = parseFloat(LoadWt);
    const parsedHsdRate = parseFloat(UnLoadWt);
    const add = parsedHsdQty - parsedHsdRate;
    setShortage(add.toFixed(2).toString());
  }, [UnLoadWt, LoadWt]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `http://jbmp.tranzol.com/API/VendorAPI/GetChallanDetails?Passno=${challanno}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.result[0] !== undefined) {
          const temp = result.result[0].NetWt;
          setLoadWt(parseFloat(temp).toFixed(2).toString());
        } else {
          console.log('no data');
          setLoadWt('0.00');
        }
      })
      .catch(error => console.error(error));
  }, [challanno]);

  const handleSubmit = () => {
    if (challanno.length !== 0 && date.length !== 0) {
      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };

      fetch(
        `http://jbmp.tranzol.com/API/DataPostApi/UnloadingEntry?Passno='${challanno}'&UnloadWeight=${UnLoadWt}&UnloadDate=${
          date === '' ? '' : moment(date).format('YYYY-MM-DD').toString()
        }`,
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);

          if (result.includes('Unloading Succesfully')) {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: 'Submitted',
              button: 'close',
              onHide: () => {
                navigation.navigate('Unloading');
              },
            });
          } else {
            Dialog.show({
              type: ALERT_TYPE.INFO,
              title: 'ERROR',
              textBody: 'Something Went Wrong',
              button: 'close',
            });
          }
        })
        .catch(error => console.error(error));
    } else {
      sethasBorder(true);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'ERROR',
        textBody: 'Enter Mandatory Fields',
      });
    }
  };
  return (
    <AlertNotificationRoot>
      <StatusBar
        translucent
        backgroundColor="#2596be"
        barStyle="dark-content"
      />
      <ScrollView
        style={{
          backgroundColor: '#2596be',
          paddingTop: StatusBar.currentHeight,
        }}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 25,
              marginBottom: 8,
              marginTop: '5%',
              color: 'white',
              fontFamily: 'PoppinsBold',
            }}>
            Enter Details
          </Text>
          <View style={styles.levelContainer}>
            <Text
              style={{
                fontSize: 20,
                marginVertical: '5%',
                color: '#2596be',
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Enter Details
            </Text>
            <Text style={styles.MandatoryText}>
              Mandatory Fields<Text style={{color: 'red'}}>*</Text>
            </Text>
            <CustomInput
              labelText="Challan No / LR No / DO No"
              placeholdername="Enter Number"
              value={challanno}
              isMandatory={true}
              hasBorder={hasBorder}
              onChangeText={t => setChallanno(t)}
            />
            <CustomInput
              labelText="Load WT"
              placeholdername="Enter Load WT"
              value={LoadWt}
              onBlur={() => {
                setLoadWt(parseFloat(LoadWt).toFixed(2).toString());
                if (LoadWt.length === 0) setLoadWt('0.00');
              }}
              onChangeText={t => setLoadWt(t)}
              keyboardTypename="numeric"
              iseditable={false}
            />

            <CustomInput
              labelText="Unload WT"
              placeholdername="Enter Unload WT"
              value={UnLoadWt}
              // isMandatory={true}
              onBlur={() => {
                setUnLoadWt(parseFloat(UnLoadWt).toFixed(2).toString());
                if (UnLoadWt.length === 0) setUnLoadWt('0.00');
              }}
              onChangeText={t => setUnLoadWt(t)}
              keyboardTypename="numeric"
            />

            <Calander
              isEvalidate={false}
              labelname={'Unload Date'}
              date={date}
              isMandatory={true}
              hasBorder={hasBorder}
              open={open}
              valueDate={
                date ? date.toLocaleDateString('en-GB').toString() : ''
              }
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
              onPress={() => setOpen(true)}
            />
   
            <CustomInput
              labelText="Shortage"
              placeholdername="Enter Shortage"
              value={Shortage}
              isend={true}
              iseditable={false}
              onChangeText={t => setShortage(t)}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginBottom: '3%',
          }}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AlertNotificationRoot>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  levelContainer: {
    backgroundColor: 'white',
    width: '95%',
    margin: 10,
    borderRadius: 15,
  },
  MandatoryText: {
    alignItems: 'flex-start',
    padding: 5,
    marginTop: '5%',
    marginLeft: '5%',
    color: 'black',
    fontSize: 10,
    fontFamily: 'PoppinsRegular',
  },
  button: {
    marginTop: 20,
    marginBottom: 50,
    height: 50,
    width: '40%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#2596be',
    fontSize: 18,
    fontFamily: 'PoppinsBold',
  },
});

export default RegisterUnloading;
