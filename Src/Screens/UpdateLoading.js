import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../Components/CustomInput';
import CustomDropdown from '../Components/CustomDropdown';
import {ALERT_TYPE, Dialog, AlertNotificationRoot, Toast} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateLoading = ({route}) => {
  const navigation = useNavigation();
  const [UserId, setUserId] = useState(null);
  const { ChallanNo } = route.params;
 console.log('PassNo :', ChallanNo)
  
  useEffect(() => {
    const getLoginDetails = async () => {
      let UserId = await AsyncStorage.getItem('UserId');
      setUserId(UserId);
    };
    getLoginDetails();
  }, []);
  
  const [challanno, setChallanno] = useState('');
  const [hsdRate, setHsdRate] = useState('0.00');
  const [hsdQty, setHsdQty] = useState('0.00');
  const [hsdRate2, setHsdRate2] = useState('0.00');
  const [hsdQty2, setHsdQty2] = useState('0.00');
  const [hsd, setHsd] = useState('0.00');
  const [pumpName, setPumpName] = useState('');
  const [pumpNameSearch, setPumpNameSearch] = useState('');
  const [pumpNameData, setPumpNameData] = useState([]);
  const [pumpName2, setPumpName2] = useState('');
  const [pumpNameSearch2, setPumpNameSearch2] = useState('');
  const [pumpNameData2, setPumpNameData2] = useState([]);
  const [hasBorder, sethasBorder] = useState(false);
  const [dataIsFine, setdataIsFine] = useState(false);

  useEffect(() => {
    const hsdRateNum = parseFloat(hsdRate) || 0;
    const hsdQtyNum = parseFloat(hsdQty) || 0;
    const hsdRate2Num = parseFloat(hsdRate2) || 0;
    const hsdQty2Num = parseFloat(hsdQty2) || 0;

    if (hsdQtyNum && hsdRateNum) {
      setHsd(((hsdQtyNum * hsdRateNum) + (hsdQty2Num * hsdRate2Num || 0)).toFixed(2));
    } else if (hsdQty2Num && hsdRate2Num) {
      setHsd((hsdQty2Num * hsdRate2Num).toFixed(2));
    } else {
      setHsd('0.00');
    }
  }, [hsdRate, hsdQty, hsdRate2, hsdQty2]);

  useEffect(() => {
    if (challanno === '') {
      setdataIsFine(false);
    } else {
      setdataIsFine(true);
    }
  }, [challanno]);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  useEffect(() => {
    fetch(
      `http://jbmp.tranzol.com/API/VendorAPI/PumpName?PumpName=${pumpNameSearch}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const mappedPumpNameData = result.result.map(item => ({
          value: item.PumpId,
          label: item.PumpName,
        }));
        setPumpNameData(mappedPumpNameData);
      })
      .catch(error => console.error(error));
  }, [pumpNameSearch]);
  useEffect(() => {
    fetch(
      `http://jbmp.tranzol.com/API/VendorAPI/PumpName?PumpName=${pumpNameSearch2}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const mappedPumpNameData = result.result.map(item => ({
          value: item.PumpId,
          label: item.PumpName,
        }));
        setPumpNameData2(mappedPumpNameData);
      })
      .catch(error => console.error(error));
  }, [pumpNameSearch2]);

const onSubmit = () => {
    // Wrap the challanno value in single quotes
const apiurl = `http://jbmp.tranzol.com/API/DataPostApi/LoadingUpdate?HSDQty=${hsdQty}&HSDQty2=${hsdQty2}&HSDRate=${hsdRate}&HSDRate2=${hsdRate2}&HSD=${hsd}&PumpId=${pumpName}&PumpId2=${pumpName2}&Passno='${ChallanNo}'`;
    
    console.log(apiurl);
    fetch(apiurl, { method: 'POST', redirect: 'follow' })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        console.log('API URL', apiurl)
        if (result.includes('Cannot insert duplicate key in object')) {
          Dialog.show({
            type: ALERT_TYPE.INFO,
            title: 'ERROR',
            textBody: 'Challan Existed',
            button: 'close',
          });
        } else if (result.includes('Challan Updated Succesfully')) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Submitted',
            button: 'close',
            onHide: () => {
              navigation.navigate('Loading');
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
      .catch(error => {
        console.log(error);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'ERROR',
          textBody: error.message,
          button: 'close',
          onHide: () => {
            navigation.navigate('Dashboard');
          },
        });
      });
};


  return (
    <AlertNotificationRoot>
      <StatusBar translucent backgroundColor="#2596be" barStyle="dark-content" />
      <ScrollView style={{ backgroundColor: '#2596be', paddingTop: StatusBar.currentHeight }}>
        <View style={styles.container}>
          <View style={styles.levelContainer}>
            <Text  style={{
                fontSize: 20,
                marginVertical: '5%',
                color: '#2596be',
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>Update Details</Text>
            <CustomInput
              labelText="Challan No"
              placeholdername=""
              value={ChallanNo}
              iseditable={false}
            />
             <CustomDropdown
              labelText="Pump Name 1"
              dropData={pumpNameData}
              placeholdername={'Select Pump Name 1'}
              value={pumpName}
              isMandatory={false}
              onChange={item => {
                setPumpNameSearch(pumpNameSearch);
                setPumpName(item.value); // Update the state when the value changes
              }}
            />
            <CustomInput
              labelText="HSD QTY(L) 1"
              placeholdername="0.00"
              value={hsdQty}
              keyboardTypename="numeric"
              onBlur={() => {
                setHsdQty(parseFloat(hsdQty).toFixed(2).toString());
                if (hsdQty.length === 0) setHsdQty('0.00');
              }}
              onChangeText={setHsdQty}
            />
            <CustomInput
              labelText="HSD Rate 1"
              placeholdername="0.00"
              value={hsdRate}
              keyboardTypename="numeric"
              onBlur={() => {
                setHsdRate(parseFloat(hsdRate).toFixed(2).toString());
                if (hsdRate.length === 0) setHsdRate('0.00');
              }}
              onChangeText={setHsdRate}
            />
             <CustomDropdown
              labelText="Pump Name 2"
              dropData={pumpNameData2}
              placeholdername={'Select Pump Name 2'}
              value={pumpName2}
              isMandatory={false}
              onChange={item => {
                setPumpNameSearch2(pumpNameSearch2);
                setPumpName2(item.value); // Update the state when the value changes
              }}
            />
            <CustomInput
              labelText="HSD QTY(L) 2"
              placeholdername="0.00"
              value={hsdQty2}
              keyboardTypename="numeric"
              onBlur={() => {
                setHsdQty2(parseFloat(hsdQty2).toFixed(2).toString());
                if (hsdQty2.length === 0) setHsdQty2('0.00');
              }}
              onChangeText={setHsdQty2}
            />
            <CustomInput
              labelText="HSD Rate 2"
              placeholdername="0.00"
              value={hsdRate2}
              keyboardTypename="numeric"
              onBlur={() => {
                setHsdRate2(parseFloat(hsdRate2).toFixed(2).toString());
                if (hsdRate2.length === 0) setHsdRate2('0.00');
              }}
              onChangeText={setHsdRate2}
            />
      <CustomInput
              labelText="HSD Amount"
              placeholdername="0.00"
              value={hsd}
              iseditable={false}
              keyboardTypename="numeric"
              onBlur={() => {
                setHsd(parseFloat(hsd).toFixed(2).toString());
                if (hsd.length === 0) setHsd('0.00');
              }}
              onChangeText={t => setHsd(t)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.text}>Update</Text>
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
    paddingVertical: 20,
  },
  MandatoryText: {
    alignItems: 'flex-start',
    padding: 5,
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
  },
  text: {
    color: '#2596be',
    fontSize: 18,
    fontFamily: 'PoppinsBold',
  },
});

export default UpdateLoading;
