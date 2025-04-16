import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute, validatePathConfig} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const ShowLoading = ({route}) => {
  const {output} = route.params;

  const data = [
    {label: 'Challan No', value: output.Passno},
    {label: 'Client Name', value: output.ClentName},
    {label: 'Vehicle No', value: output.VehicleNo},
    {
      label: 'Trip Date',
      value: moment(output.TripDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'),
    },
    {label: 'Source', value: output.Source},
    {label: 'Destination', value: output.Destination},
    {label: 'Material', value: output.Material},
    {label: 'PumpName', value: output.PumpName},
    {label: 'LoadType', value: output.LoadType},
    // {label: 'Gross WT', value: output.GrossWeight},
    // {label: 'Tare WT', value: output.TareWeight},
    {label: 'Net WT', value: output.NetWeight},
    {label: 'Cash Advance', value: output.Cashadvance},
    {label: 'HSD Qty', value: output.HSDQty},
    {label: 'HSD Rate', value: output.HSDRate},
    {label: 'HSD', value: output.HSD},
    {label: 'Toll', value: output.Toll},
    {label: 'Other', value: output.Other},
    {label: 'AddBlue', value: output.AddBlue},
    {label: 'Remarks', value: output.Remarks},
  ];

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          // marginBottom: 8,

          color: 'white',
          fontFamily: 'PoppinsBold',
          textAlign: 'center',
        }}>
        Loading Details
      </Text>
      <View style={styles.levelContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          // ListHeaderComponent={
          //   <View style={styles.header}>
          //     <View>
          //       <Image
          //         style={styles.img}
          //         source={require('../assets/driver.png')}
          //       />
          //     </View>
          //   </View>
          // }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2596be',
    alignItems: 'center',
  },
  levelContainer: {
    backgroundColor: 'white',
    width: '97%',
    // margin: 10,
    borderRadius: 5,
    // marginBottom:"40%"
    height: '93%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  blackList: {
    height: 28,
    width: 28,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  driverInfo: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nameTxt: {
    fontSize: 28,
    fontWeight: '700',
    color: 'black',
    padding: 6,
  },
  emailTxt: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    padding: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  label: {
    fontWeight: '900',
    fontSize: 17,
    color: 'black',
    flex: 1,
  },
  value: {
    fontWeight: '500',
    fontSize: 17,
    marginLeft: 5,
    color: '#363432',
    flex: 1,
  },
});

export default ShowLoading;
