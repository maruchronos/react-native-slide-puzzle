// import liraries
import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import moment from 'moment';
import SplashScreen from 'react-native-smart-splash-screen';
import SlidePuzzle from '../../containers/SlidePuzzle';
import styles from './style';
import { images } from '../../config';

// create a component
class HomeScreen extends Component {
    static navigationOptions = () => ({
        header: null,
        tabBarIcon: ({ tintColor }) =>
            (<Image source={images.homeIcon} style={[styles.icon, { tintColor }]} />)
    });

    constructor(props) {
        super(props);
        this.state = {
            headerText: '',
            movements: 0,
            timer: 0
        };
    }

    componentDidMount() {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500
        });

        this.timerController = setInterval(() => {
            this.setState({ timer: (this.state.timer + 1) });
        }, 1000);
    }

    onMove = (movements) => {
        this.setState({
            movements
        });
    }

    onLoad = (movements) => {
        this.setState({
            movements,
            headerText: ''
        });
    }

    onFinish = () => {
        console.log('Parabéns!', this.props.navigation);
        this.setState({
            headerText: 'Parabéns!'
        });
        clearInterval(this.timerController);
        // this.props.navigation.navigate('LOJA');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Tempo: {moment(this.state.timer, 'ss').format('mm:ss')}</Text>
                <Text style={styles.headerText}>Movimentos: {this.state.movements}</Text>
                <Text style={styles.headerText}>{this.state.headerText}</Text>
                <SlidePuzzle
                    ref={(slidePuzzle) => { this.slidePuzzle = slidePuzzle; }}
                    columns={3}
                    onFinish={() => this.onFinish()}
                    onLoad={movements => this.onLoad(movements)}
                    onMove={movements => this.onMove(movements)} />

                <TouchableHighlight onPress={() => this.slidePuzzle.initializeBoard()}>
                    <Text style={styles.reloadButton}>RELOAD</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

// make this component available to the app
export default HomeScreen;
