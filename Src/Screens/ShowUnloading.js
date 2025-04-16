import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ShowUnloading = ({route}) => {
  const data = [
    {label: 'Challan Number', value: 'ABC123'},
    {label: 'Vehicle Number', value: 'XYZ456'},
    {label: 'Truck Source', value: 'Warehouse A'},
    {label: 'Destination 1', value: 'City X'},
    {label: 'Destination 2', value: 'City Y'},
    {label: 'Load Type', value: 'Bulk'},
    {label: 'Load Date', value: '2024-05-11'},
    {label: 'Guaranteed Weight', value: '5000 kg'},
    {label: 'Gross Weight', value: '5500 kg'},
    {label: 'Tare Weight', value: '500 kg'},
    {label: 'Net Weight', value: '5000 kg'},
    {label: 'Freight Rate', value: '$1000'},
    {label: 'Cash Advance', value: '$500'},
    {label: 'Toll Tax', value: '$50'},
    {label: 'Diesel Quantity', value: '100 liters'},
    {label: 'Pump Name', value: 'Fuel Stop'},
    {label: 'Rate', value: '$5/liter'},
    {label: 'Starting Kilometer', value: '10000 km'},
    {label: 'Closing Kilometer', value: '10500 km'},
  ];

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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



export default ShowUnloading;
