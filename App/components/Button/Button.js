// import libraries
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from './styles';

// create a dumb component
const Button = props => (
    <View style={styles.reloadContainer}>
        <TouchableHighlight onPress={props.action}>
            <Text style={[styles.reloadButton, props.containerStyle || null]}>{props.title}</Text>
        </TouchableHighlight>
    </View>
);

// make this component available to the app
export default Button;
