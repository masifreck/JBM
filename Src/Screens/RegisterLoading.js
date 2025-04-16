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
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import Calander from '../Components/Calander';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterLoading = ({route}) => {
  const navigation = useNavigation();
  const [UserId, setUserId] = useState(null);
  const now = new Date();
  useEffect(() => {
    const getLoginDetails = async () => {
      let UserId = await AsyncStorage.getItem('UserId');
      setUserId(UserId);
    };
    getLoginDetails();
  }, []);
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [challanno, setChallanno] = useState('');
  const [hsdRate, setHsdRate] = useState('0.00');
  const [hsdQty, setHsdQty] = useState('0.00');
  const [hsdRate2, setHsdRate2] = useState('0.00');
  const [hsdQty2, setHsdQty2] = useState('0.00');
  const [hsd, setHsd] = useState('0.00');
  
  const [netwt, setnetwt] = useState('0.00');
  const [cashAdvance, setCashAdvance] = useState('0.00');
  const [tolltax, setTolltax] = useState('0.00');
  const [adBlue, setAdBlue] = useState('0.00');
  const [expanses, setExpanses] = useState('0.00');
  const [remarks, setRemarks] = useState('');

  // useEffect(() => {
  //   if (hsdRate.length === 0) setHsdRate('0.00');
  //   if (hsdQty.length === 0) setHsdQty('0.00');
  //   if (hsd.length === 0) setHsd('0.00');
  //   if (netwt.length === 0) setnetwt('0.00');
  //   if (cashAdvance.length === 0) setCashAdvance('0.00');
  //   if (tolltax.length === 0) setTolltax('0.00');
  //   if (adBlue.length === 0) setAdBlue('0.00');
  //   if (expanses.length === 0) setExpanses('0.00');
  // }, [hsdRate, hsdQty, hsd, netwt, cashAdvance, tolltax, adBlue, expanses]);
  // ====================
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleNumberSearch, setVehicleNumberSearch] = useState('');
  const [vehicleNumberData, setVehicleNumberData] = useState([]);

  const [clientName, setClientName] = useState('');
  const [clientNameSearch, setClientNameSearch] = useState('');
  const [clientNameData, setClientNameData] = useState([]);

  const [destination, setDestination] = useState('');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [destinationData, setDestinationData] = useState([]);

  const [source, setSource] = useState('');
  const [sourceSearch, setSourceSearch] = useState('');
  const [sourceData, setSourceData] = useState([]);

  const [materialName, setMaterialName] = useState('');
  const [materialNameSearch, setMaterialNameSearch] = useState('');
  const [materialNameData, setMaterialNameData] = useState([]);

  const [pumpName, setPumpName] = useState('');
  const [pumpNameSearch, setPumpNameSearch] = useState('');
  const [pumpNameData, setPumpNameData] = useState([]);
  const [pumpName2, setPumpName2] = useState('');
  const [pumpNameSearch2, setPumpNameSearch2] = useState('');
  const [pumpNameData2, setPumpNameData2] = useState([]);

  const [loadType, setLoadType] = useState('');
  const [loadTypeSearch, setLoadTypeSearch] = useState('');
  const [loadTypeData, setLoadTypeData] = useState([]);

  const [ClientAmount, setClientAmount] = useState('0.00');
  const [BillAmount, setBillAmount] = useState('0.00');

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


  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  useEffect(() => {
    const url = `http://jbmp.tranzol.com/API/VendorAPI/Vehicles?VehicleNo=${vehicleNumberSearch}`;

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        const mappedData = result.result.map(item => ({
          value: item.VehicleId,
          label: item.VehicleNo,
        }));
        setVehicleNumberData(mappedData);
      })
      .catch(error => console.error(error));
  }, [vehicleNumberSearch]);
  useEffect(() => {
    // Fetching client data
    fetch(
      `http://jbmp.tranzol.com/API/VendorAPI/Clinet?ClientName=${clientNameSearch}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const mappedClientData = result.result.map(item => ({
          value: item.ClientId,
          label: item.ClientName,
        }));
        setClientNameData(mappedClientData);
      })
      .catch(error => console.error(error));
  }, [clientNameSearch]);
  // Fetching destination data
  useEffect(() => {
    fetch(
      `http://jbmp.tranzol.com/API/VendorAPI/Destination?Destination=${destinationSearch}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const mappedDestinationData = result.result.map(item => ({
          value: item.DestinationId,
          label: item.Destination,
        }));
        setDestinationData(mappedDestinationData);
      })
      .catch(error => console.error(error));
  }, [destinationSearch]);
  useEffect(() => {
    // Fetching source data
    fetch(
      `http://jbmp.tranzol.com/API/VendorAPI/Source?Source=${sourceSearch}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const mappedSourceData = result.result.map(item => ({
          value: item.SourceId,
          label: item.Source,
        }));
        setSourceData(mappedSourceData);
      })
      .catch(error => console.error(error));
  }, [sourceSearch]);
  useEffect(() => {
    // Fetching material name data
    fetch(
      `http://jbmp.tranzol.com/API/VendorAPI/Material?Material=${materialNameSearch}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const mappedMaterialNameData = result.result.map(item => ({
          value: item.MaterialId,
          label: item.MaterialName,
        }));
        setMaterialNameData(mappedMaterialNameData);
      })
      .catch(error => console.error(error));
  }, [materialNameSearch]);
  // Fetching pump name data
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
  useEffect(() => {
    // Fetching load type data
    fetch(
      `http://jbmp.tranzol.com/API/VendorAPI/LoadType?LoadTypeName=${loadTypeSearch}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const mappedLoadTypeData = result.result.map(item => ({
          value: item.LoadTypeId,
          label: item.LoadTypeName,
        }));
        setLoadTypeData(mappedLoadTypeData);
      })
      .catch(error => console.error(error));
  }, [loadTypeSearch]);
  useEffect(() => {
    console.log(hsdQty, hsdRate);
    const parsedHsdQty = parseFloat(hsdQty);
    const parsedHsdRate = parseFloat(hsdRate);

    if (!isNaN(parsedHsdQty) && !isNaN(parsedHsdRate)) {
      // Calculate the result
      const add = parsedHsdQty * parsedHsdRate;
      // Convert the result to a string and log it

      setHsd(add.toFixed(2).toString());
    } else {
      // Handle invalid input
      console.log('Invalid input');
    }
  }, [hsdQty, hsdRate]);
  useEffect(() => {
    // Parse the inputs as floats
    const netwtParsed = parseFloat(netwt);
    const clientAmountParsed = parseFloat(ClientAmount);

    // Check if the parsed values are valid numbers
    if (!isNaN(netwtParsed) && !isNaN(clientAmountParsed)) {
      // Calculate the result
      const result = netwtParsed * clientAmountParsed;

      // Convert the result to a string and log it
      console.log(result.toFixed(2));
      setBillAmount(result.toFixed(2).toString());
    } else {
      // Handle invalid input
      console.log('Invalid input');
    }
  }, [netwt, ClientAmount]);

  const [hasBorder, sethasBorder] = useState(false);
  const [dataIsFine, setdataIsFine] = useState(false);

  useEffect(() => {
    if (challanno === '' || date === '') {
      setdataIsFine(false);
    } else {
      setdataIsFine(true);
    }
  }, [challanno, date]);
  const onSubmit = () => {
    if (dataIsFine) {
      sethasBorder(false);
      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };
      const apiurl = `http://jbmp.tranzol.com/API/DataPostApi/LoadingEntry?TripDate=${
        date === '' ? '' : moment(date).format('YYYY-MM-DD').toString()
      }&VehicleId=${vehicleNumber}&Passno=${challanno}&ClentId=${clientName}&SourceId=${source}&DestinationId=${destination}&MaterialId=${materialName}&LoadTypeId=${loadType}&Cashadvance=${cashAdvance}&HSD=${hsd}&PumpId=${pumpName}&PumpId2=${pumpName2}&Other=${expanses}&AddBlue=${adBlue}&Remarks=${remarks}&CreatedBy=${UserId}&MobileApp=1&CreatedOn=${moment(now).format('YYYY-MM-DD').toString()}&HSDQty=${hsdQty}&HSDRate=${hsdRate}&HSDQty2=${hsdQty2}&HSDRate2=${hsdRate2}&NetWeight=${parseInt(netwt)}`;
  
      console.log(apiurl);
      fetch(apiurl, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          if (result.includes('Cannot insert duplicate key in object')) {
            Dialog.show({
              type: ALERT_TYPE.INFO,
              title: 'ERROR',
              textBody: 'Challan Existed',
              button: 'close',
            });
          } else if (result.includes('Challan Added Succesfully')) {
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
            textBody: error,
            button: 'close',
            onHide: () => {
              navigation.navigate('Dashboard');
            },
          });
        });
    } else {
      sethasBorder(true);
      console.log('nonsense');
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'ERROR',
        textBody: 'Fill Mandatory Data',
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
          {/* <Text
            style={{
              fontSize: 25,
              marginBottom: 8,
              marginTop: '5%',
              color: 'white',
              fontFamily: 'PoppinsBold',
            }}>
            Enter Details
          </Text> */}
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
            <Calander
              isEvalidate={false}
              labelname={'Load Date'}
              date={date}
              open={open}
              hasBorder={hasBorder}
              isMandatory={true}
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

            <CustomDropdown
              labelText="Vehicle Number"
              dropData={vehicleNumberData}
              placeholdername="Select Vehicle Number"
              value={vehicleNumber}
              isMandatory={true}
              onChange={item => {
                setVehicleNumberSearch(vehicleNumberSearch);
                setVehicleNumber(item.value); // Update the state when the value changes
              }}
              onChangeText={t => setVehicleNumberSearch(t)}
            />
            <CustomInput
              labelText="Challan No / LR No / DO No"
              placeholdername="Enter Number"
              isMandatory={true}
              hasBorder={hasBorder}
              value={challanno}
              onChangeText={t => setChallanno(t)}
            />
            <CustomDropdown
              labelText="Client Name"
              dropData={clientNameData}
              placeholdername={'Select Client Name'}
              value={clientName}
              onChange={item => {
                setClientNameSearch(clientNameSearch);
                setClientName(item.value); // Update the state when the value changes
              }}
              onChangeText={t => setClientNameSearch(t)}
            />

            <CustomDropdown
              labelText="Source"
              dropData={sourceData}
              placeholdername={'Select Source'}
              value={source}
              onChange={item => {
                setSourceSearch(clientNameSearch);
                setSource(item.value); // Update the state when the value changes
              }}
              onChangeText={t => setSourceSearch(t)}
            />

            <CustomDropdown
              labelText="Destination"
              dropData={destinationData}
              placeholdername={'Select Destination'}
              value={destination}
              onChange={item => {
                setDestinationSearch(destinationSearch);
                setDestination(item.value); // Update the state when the value changes
              }}
              onChangeText={t => setDestinationSearch(t)}
            />

            <CustomDropdown
              labelText="Material Name"
              dropData={materialNameData}
              placeholdername={'Select Material'}
              value={materialName}
              onChange={item => {
                setMaterialNameSearch(materialNameSearch);
                setMaterialName(item.value); // Update the state when the value changes
              }}
              onChangeText={t => setMaterialNameSearch(t)}
            />

            <CustomDropdown
              labelText="Load Type"
              dropData={loadTypeData}
              placeholdername={'Select Load Type'}
              isMandatory={false}
              value={loadType}
              onChange={item => {
                setLoadTypeSearch(loadTypeSearch);
                setLoadType(item.value); // Update the state when the value changes
              }}
            />

            <CustomInput
              labelText="Net WT"
              placeholdername="Enter Net WT"
              isMandatory={true}
              value={netwt}
              keyboardTypename="numeric"
              onBlur={() => {
                setnetwt(parseFloat(netwt).toFixed(2).toString());
                if (netwt.length === 0) setnetwt('0.00');
              }}
              onChangeText={t => setnetwt(t)}
            />

           {/*  <CustomInput
              labelText="Client Rate"
              placeholdername="Enter Client Rate"
              value={ClientAmount}
              keyboardTypename="numeric"
              onBlur={() => {
                setClientAmount(parseFloat(ClientAmount).toFixed(2).toString());
                if (ClientAmount.length === 0) setClientAmount('0.00');
              }}
              onChangeText={t => setClientAmount(t)}
            />
            <CustomInput
              labelText="Bill Amount"
              placeholdername="Enter Bill Amount"
              value={BillAmount}
              iseditable={false}
            /> */}
            <CustomInput
              labelText="Cash Advance"
              placeholdername="Enter Cash Advance"
              isMandatory={true}
              value={cashAdvance}
              keyboardTypename="numeric"
              onBlur={() => {
                setCashAdvance(parseFloat(cashAdvance).toFixed(2).toString());
                if (cashAdvance.length === 0) setCashAdvance('0.00');
              }}
              onChangeText={t => setCashAdvance(t)}
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
              onChangeText={t => setPumpNameSearch(t)}
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
              onChangeText={t => setHsdQty(t)}
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
              onChangeText={t => setHsdRate(t)}
            />
              <CustomDropdown
              labelText="Pump Name 2"
              dropData={pumpNameData2}
              placeholdername={'Select Pump Name 1'}
              value={pumpName2}
              isMandatory={false}
              onChange={item => {
                setPumpNameSearch2(pumpNameSearch2);
                setPumpName2(item.value); // Update the state when the value changes
              }}
              onChangeText={t => setPumpNameSearch2(t)}
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
              onChangeText={t => setHsdQty2(t)}
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
              onChangeText={t => setHsdRate2(t)}
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
            {/*<CustomInput
              labelText="Toll Tax"
              placeholdername="Enter Toll Tax"
              value={tolltax}
              keyboardTypename={'numeric'}
              onBlur={() => {
                setTolltax(parseFloat(tolltax).toFixed(2).toString());
                if (tolltax.length === 0) setTolltax('0.00');
              }}
              onChangeText={t => setTolltax(t)}
            />*/}

            <CustomInput
              labelText="Other Expenses"
              placeholdername="Enter Other Expenses"
              value={expanses}
              keyboardTypename="numeric"
              onBlur={() => {
                setExpanses(parseFloat(expanses).toFixed(2).toString());
                if (expanses.length === 0) setExpanses('0.00');
              }}
              onChangeText={t => setExpanses(t)}
            />
            <CustomInput
              labelText="AD Blue"
              placeholdername="Enter AD Blue"
              value={adBlue}
              keyboardTypename="numeric"
              onBlur={() => {
                setAdBlue(parseFloat(adBlue).toFixed(2).toString());
                if (adBlue.length === 0) setAdBlue('0.00');
              }}
              onChangeText={t => setAdBlue(t)}
            />
            <CustomInput
              labelText="Remarks"
              placeholdername="Enter Remarks"
              value={remarks}
              isend={true}
              onChangeText={t => setRemarks(t)}
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
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
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
    // marginTop: '5%',
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

export default RegisterLoading;
