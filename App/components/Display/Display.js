// import libraries
import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

// create a dumb component
const Display = props => (
    <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
        <Text style={styles.value}>{props.value}</Text>
    </View>
);

// make this component available to the app
export default Display;
