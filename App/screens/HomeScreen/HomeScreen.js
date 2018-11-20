// import liraries
import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';

import SplashScreen from 'react-native-smart-splash-screen';
import SlidePuzzle from '../../containers/SlidePuzzle';
import { Button, Display } from '../../components';
import styles from './style';
import { images, colors } from '../../config';


// create a component
class HomeScreen extends Component {
    static navigationOptions = () => ({
        header: null,
        tabBarVisible: false,
        tabBarIcon: ({ tintColor }) =>
            (<Image source={images.homeIcon} style={[styles.icon, { tintColor }]} />)
    });

    constructor(props) {
        super(props);
        this.state = {
            headerText: '',
            movements: 0,
            timer: '00:00',
            showNumbers: false
        };
    }

    componentDidMount() {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500
        });

        // this.timerController = new Timer();
        // this.timerController.start();
        // this.timerController.addEventListener('secondsUpdated', () => {
        //     this.setState({
        //         timer: this.timerController.getTimeValues().toString()
        //     });
        // });
    }

    componentWillUnmount() {
        // this.timerController.removeEventListener();
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
        // this.timerController.reset();
    }

    onFinish = () => {
        this.setState({
            headerText: 'Parabéns!'
        });
        // this.timerController.stop();
    }

    render() {
        const {
            showNumbers,
            timer,
            movements,
            headerText
        } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.backgroundScreens} barStyle={'light-content'} />
                <Text style={styles.mainTitle}>React Native Sliding Puzzle</Text>
                <View style={styles.divider} />

                {/* Displays */}
                <View style={styles.displayContainer}>
                    <Display
                        containerStyle={styles.firstButton}
                        label={'Movements'}
                        value={movements} />
                    <Display
                        label={'Time'}
                        value={timer} />
                </View>
                <Text style={styles.headerText}>{headerText}</Text>

                {/* Main Canvas */}
                <View style={styles.puzzleContainer}>
                    <SlidePuzzle
                        ref={(slidePuzzle) => { this.slidePuzzle = slidePuzzle; }}
                        columns={3}
                        showNumbers={showNumbers}
                        onFinish={() => this.onFinish()}
                        onLoad={moves => this.onLoad(moves)}
                        onMove={moves => this.onMove(moves)} />
                </View>

                {/* Buttons */}
                <View style={styles.buttons}>
                    <Button
                        containerStyle={styles.firstButton}
                        title={'RELOAD'}
                        action={() => this.slidePuzzle.initializeBoard()} />
                    <Button
                        title={'NUMBERS'}
                        action={() => this.setState({
                            showNumbers: !this.state.showNumbers
                        })} />
                </View>
            </View>
        );
    }
}

// make this component available to the app
export default HomeScreen;
