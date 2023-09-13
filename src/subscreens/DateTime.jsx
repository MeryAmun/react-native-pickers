import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import CarouselComponent from "../components/Carousel";
import { int8 } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomNumbers } from "../assets/data";

const CalendarPicker = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [randomValues, setRandomValues] = useState([]);

  const storeRandomNumbers = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("randomNumbers", jsonValue);
    } catch (err) {
      // saving error
      console.log(err);
    }
  };

  // useEffect(() => {
  //  storeRandomNumbers(crypto.getRandomValues(int8))
  // }, [])

  const newUserAdded = () => {
    //storeRandomNumbers(crypto.getRandomValues(int8))
  };

  const removeRandomNumbers = async () => {
    try {
      await AsyncStorage.removeItem("randomNumbers");
      setRandomValues([])
    } catch (e) {
      // remove error
      console.log(e);
    }
  };
  const getRandomNumbers = async () => {
    storeRandomNumbers(crypto.getRandomValues(int8));
    try {
      const jsonValue = await AsyncStorage.getItem("randomNumbers");
      const randomNumbersObj = JSON.parse(jsonValue);
      return jsonValue != null
        ? setRandomValues(Object.values(randomNumbersObj))
        : null;
    } catch (err) {
      // error reading value
      console.log(err);
    }
  };

  console.log(randomValues);
  const onChangeDate = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate;
    setDate((prevDate) => (prevDate = currentDate));
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
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <Button onPress={showDatePicker} title="Show date picker!" />
          <Text style={styles.textView}>
            selected: {moment(date).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={styles.root}>
          <CarouselComponent />
        </View>
        <View style={styles.view}>
          {randomValues.length === 0 ? (
            <View style={styles.buttons}>
              <Button onPress={getRandomNumbers} title="Get Random numbers" />
            </View>
          ) : (
            <Button onPress={removeRandomNumbers} title="Clear Store" />
          )}
          <View style={styles.randomViewItems}>
            {randomValues.map((item, index) => (
              <View style={styles.randomViewItems} key={index}>
                <Text style={styles.randomViewItem}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarPicker;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  textView: {
    margin: 20,
  },
  view: {
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  randomView: {
    marginVertical: 40,
    marginHorizontal: 20,
    backgroundColor: "rebeccapurple",
  },
  randomViewItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 40,
    marginHorizontal: 20,
    backgroundColor: "rebeccapurple",
    color: "white",
  },
  randomViewItem: {
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    gap: 30,
  },
});
