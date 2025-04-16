import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const CustomInput = ({
  labelText,
  placeholdername,
  onChangeText,
  value,
  width = '100%',
  keyboardTypename = 'default',
  stringlength = 500,
  hasBorder = false,
  isMandatory = false,
  isend = false,
  isaddress = false,
  multiline = false,
  iseditable = true,
  onBlur,

}) => {
  return (
    <>
      <Text style={styles.levelText}>
        {labelText} {isMandatory && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            height: isaddress ? 120 : 50,
            borderWidth: hasBorder && isMandatory ? 0.9 : 0,
            borderColor: hasBorder && isMandatory ? 'red' : 'transparent',
            marginBottom: isend ? 20 : 0,
          },
        ]}>
        <TextInput
          placeholderTextColor={'#6c6f73'}
          style={{
            color: !iseditable ? 'gray' : 'black',
            fontSize: 15,
            width: width,
            marginRight: width === '85%' ? 20 : 0,
          }}
          // default
          autoCorrect={false}
          multiline={multiline}
          maxLength={stringlength}
          // important
          editable={iseditable}
          value={value}
          placeholder={placeholdername}
          keyboardType={keyboardTypename}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  levelText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 13,
    fontFamily: 'PoppinsMedium',
  },

  inputContainer: {
    width: '90%',
    backgroundColor: '#D2F3FD',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'black',
    alignSelf: 'center',
  },
  rightIcon: {
    height: 22,
    width: 22,
  },
  wrongIcon: {
    height: 15,
    width: 15,
    tintColor: 'red',
  },
});

export default CustomInput;
