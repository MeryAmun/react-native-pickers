import { StyleSheet, Text, View,Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const [open, setOpen] = useState(false);
    const navigation = useNavigation();

    const onHandleStart = () => {
        setOpen(true)
if(open){
    navigation.navigate('Main Screen', { screen: 'Media Screen' })
}
    }
  return (
    <View style={styles.root}>
      <Button title='Get Started' style={styles.button}
      onPress={onHandleStart}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'black',
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        backgroundColor:"#fff",
        color:'#000'
    }
})