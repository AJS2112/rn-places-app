import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../componentes/HeaderButton';
import PlaceItem from "../componentes/PlaceItem";
import * as placesActions from '../store/places-actions';

const PlacesListScreen = props => {
    const dispatch = useDispatch();
    const places = useSelector(state => state.places.places);

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]);

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PlaceItem
                    image={itemData.item.imageUri}
                    title={itemData.item.title}
                    address={null}
                    onSelect={() => {
                        props.navigation.navigate('PlaceDetail', {
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id
                        });
                    }}
                />
            )}
        />
    )
}

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Places',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Add Place"
                iconName='md-add'
                onPress={() => {
                    navData.navigation.navigate('NewPlace');
                }}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({

})

export default PlacesListScreen;

