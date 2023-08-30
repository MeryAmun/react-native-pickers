import { StyleSheet, Text, View } from 'react-native'
import * as DocumentPicker from "expo-document-picker";
import React from 'react'

const Document = () => {

    _pickDocument = async () => {

        let result = await DocumentPicker.getDocumentAsync({});
        
        alert(result.uri);
        
        console.log(result);
        
        }
  return (
    <View>
    <Button
title="Select Document"
onPress={_pickDocument}
/>
    </View>
  )
}

export default Document

const styles = StyleSheet.create({})