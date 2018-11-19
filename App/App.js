import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import { App2SalesFeedback } from './components';
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


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // showFeedback: true
        };
    }

    render = () => (
        <View style={container} >
            <Router />
            {/* <App2SalesFeedback
                onCancel={() => this.setState({ showFeedback: false })}
                isVisible={this.state.showFeedback}
                project={'com.slidingpuzzle'} /> */}
        </View>
    );
}
export default App;
