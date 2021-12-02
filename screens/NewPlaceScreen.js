import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as placesActions from '../store/places-actions';
import ImagePicker from "../componentes/ImagePicker";
import LocationPicker from "../componentes/LocationPicker";

const NewPlaceScreen = props => {
    const dispacth = useDispatch();

    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState('');


    const titleChangeHandler = text => {
        setTitleValue(text);
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }

    const savePlaceHandler = () => {
        dispacth(placesActions.addPlace(titleValue, selectedImage));
        props.navigation.goBack();
    }
    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textinput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker />
                <Button
                    title="Save Place"
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>

    )
}

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Add Place'
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textinput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default NewPlaceScreen;

