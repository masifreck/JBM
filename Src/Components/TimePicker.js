import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React from 'react';
  import DatePicker from 'react-native-date-picker';
  import { inputColors } from './constant';
  
  const TimePickerCustom = ({
    open,
    time,
    onConfirm,
    onCancel,
    onPress,
    valueTime,
    labelname = 'Choose Time',
    isMandatory = false,
    hasBorder = false,
  }) => {
    const selectedTime = time === '' ? new Date() : time;
  
    return (
      <>
        <Text style={styles.levelText}>
          {labelname}
          {isMandatory && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
  
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          style={[
            styles.inputContainer,
            {
              borderWidth: hasBorder && isMandatory ? 0.9 : 0,
              borderColor: hasBorder && isMandatory ? 'red' : 'transparent',
            },
          ]}
        >
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={[styles.input1, { color: '#000000' }]}
            placeholder={'HH:MM'}
            value={valueTime}
            editable={false} // prevent manual typing
            pointerEvents="none" // prevents cursor/focus
          />
          <Image
            style={styles.iconStyle}
            source={require('../Assets/Images/clock.png')}
          />
          <DatePicker
            mode="time"
            modal
            open={open}
            date={selectedTime}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </TouchableOpacity>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    inputContainer: {
      width: '90%',
      backgroundColor: inputColors,
      flexDirection: 'row',
      paddingHorizontal: 15,
      borderRadius: 10,
      alignItems: 'center',
      borderColor: 'black',
      alignSelf: 'center',
    },
    levelText: {
      alignItems: 'flex-start',
      padding: 5,
      marginLeft: '5%',
      color: 'black',
      fontSize: 13,
      fontFamily: 'PoppinsMedium',
    },
    input1: {
      flex: 1,
      paddingVertical: 10,
      fontSize: 14,
    },
    iconStyle: {
      height: 30,
      width: 30,
      marginLeft: 10,
    },
  });
  
  export default TimePickerCustom;
  