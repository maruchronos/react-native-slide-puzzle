// import libraries
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

// create a dumb component
const Button = props => (
    <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={props.action}>
            <View style={[styles.buttonText, props.containerStyle || null]}>
                {props.icon ?
                    <Icon
                        name={props.icon}
                        size={15}
                        style={styles.icon}
                        color={'#FFF'} /> : null}
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    </View>
);

// make this component available to the app
export default Button;
