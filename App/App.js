import React from 'react';
import { Text, View } from 'react-native';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import Router from './router';

Text.defaultProps.allowFontScaling = false;
const container = { flex: 1 };
const customTextProps = {
    style: {
        fontSize: 16,
        backgroundColor: 'transparent'
    }
};
const customTextInputProps = {
    style: {
        height: 45
    }
};

setCustomText(customTextProps);
setCustomTextInput(customTextInputProps);


const App = () => (
    <View style={container} >
        <Router />
    </View>
);

export default App;
