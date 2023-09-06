import React, { useState } from 'react'
import { SafeAreaView, View, Button,StyleSheet,Text } from 'react-native';
import RNDateTimePicker, { DateTimePickerAndroid, RCTDateTimePickerNative }from '@react-native-community/datetimepicker';
import moment from "moment";




const CalendarPicker = () => {
  const [date, setDate] = useState(new Date(1598051730000));


  const onChangeDate = (event, selectedDate) => {
  console.log(selectedDate)
    const currentDate = selectedDate;
    setDate((prevDate) => prevDate = currentDate );
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatePicker = () => {
    showMode(date);
  };

 

  return (
    <SafeAreaView style={styles.root}>
      <Button onPress={showDatePicker} title="Show date picker!" />
      <View style={styles.textView}>
      <Text>selected: { moment(date).format('YYYY-MM-DD')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CalendarPicker
const styles = StyleSheet.create({
  root:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
  },
  textView:{
 margin:20
  }
})

