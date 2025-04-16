import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({
  hasBorder,
  labelText,
  dropData,
  isend = false,
  placeholdername,
  searchPlaceholdername,
  value,
  onChange,
  onChangeText,
  editOnPress,
  isEdit = false,
  showSearch = true,
  isMandatory = true,
  dropdownPosition,
}) => {
  return (
    <>
      <Text
        style={{
          alignItems: 'flex-start',
          padding: 5,
          marginLeft: '5%',
          color: 'black',
          fontSize: 13,
          fontFamily: 'PoppinsMedium',
        }}>
        {labelText} {isMandatory && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <View
        style={{
          height: 50,
          width: '90%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'black',
          borderRadius: 8,
          alignSelf: 'center',
          marginBottom: isend ? 20 : 5,
        }}>
        <Dropdown
          style={[
            styles.dropdown,
            {
              width: isEdit ? '90%' : '100%',
              borderWidth: hasBorder ? 0.9 : 0,
              borderColor: hasBorder ? 'red' : 'transparent',
              // marginBottom: isend ? 20 : 0,
            },
          ]}
          placeholderStyle={{fontSize: 15, color: '#6c6f73'}}
          selectedTextStyle={{fontSize: 15, color: '#6c6f73'}}
          inputSearchStyle={{
            height: 40,
            fontSize: 15,
            color: '#6c6f73',
            //   fontFamily: 'PoppinsMedium',
          }}
          itemTextStyle={{color: 'black'}}
          data={dropData}
          search={showSearch}
          maxHeight={'80%'}
          labelField="label"
          valueField="value"
          placeholder={placeholdername}
          searchPlaceholder={searchPlaceholdername}
          value={value}
          onChange={onChange}
          onChangeText={onChangeText}
          dropdownPosition={dropdownPosition}
        />
        {isEdit && (
          <TouchableOpacity
            style={{
              width: '10%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={editOnPress}>
            <Image
              style={{height: '90%', width: '90%', tintColor: '#2596be'}} // Adjusted height and width
              source={require('../Assets/Images/edit.png')}
              resizeMode="contain" // Added resizeMode to stretch the image to fit
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: '#D2F3FD',
    paddingHorizontal: 15,
    // marginBottom: 5,
  },
});

export default CustomDropdown;
