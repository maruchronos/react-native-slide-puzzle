// import liraries
import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import SlidePuzzle from '../../containers/SlidePuzzle';
import { Button, Display, WinModal } from '../../components';
import styles from './style';
import { images, colors, anim } from '../../config';


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
            minutes: '00',
            seconds: '00',
            showNumbers: false,
            showModal: false,
            keepCounting: true
        };
    }

    componentDidMount() {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500
        });

        this.timerController = setInterval(() => {
            this.updtateTimer();
        }, 1000);
    }

    componentWillUnmount() {
        this.timerController.removeEventListener();
    }

    onMove = (movements) => {
        this.setState({
            movements
        });
    }

    onLoad = () => {
        this.setState({
            movements: 0,
            minutes: '00',
            seconds: '00',
            headerText: '',
            keepCounting: true
        });
    }

    onFinish = () => {
        this.setState({
            keepCounting: false,
            showModal: true
        });
    }

    updtateTimer = () => {
        if (!this.state.keepCounting) return;

        let auxSec = this.state.seconds;
        let auxMin = this.state.minutes;
        auxSec++;

        // Update Seconds
        if (auxSec < 10) {
            auxSec = `0${auxSec}`;
        } else if (auxSec > 59) {
            auxMin++;
            auxSec = '00';
            // Update minutes
            if (auxMin < 10) {
                auxMin = `0${auxMin}`;
            } else if (auxMin > 59) {
                auxMin = '00';
            }
        }

        this.setState({
            timer: `${auxMin}:${auxSec}`,
            seconds: auxSec,
            minutes: auxMin
        });
    }

    render() {
        const {
            showNumbers,
            timer,
            movements,
            headerText,
            showModal
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
                        onFinish={this.onFinish}
                        onLoad={this.onLoad}
                        onMove={moves => this.onMove(moves)} />
                </View>

                {/* Buttons */}
                <View style={styles.buttons}>
                    <Button
                        icon={'rotate-right'}
                        containerStyle={styles.firstButton}
                        title={'RELOAD'}
                        action={() => this.slidePuzzle.initializeBoard()} />
                    <Button
                        icon={'eye'}
                        title={'NUMBERS'}
                        action={() => this.setState({
                            showNumbers: !this.state.showNumbers
                        })} />
                </View>
                <View style={styles.versionContainer}>
                    <Text style={styles.version}>maruchronos 2018 - v 1.0.0</Text>
                </View>
                <WinModal
                    title={'CONGRATULATIONS!'}
                    timer={timer}
                    movements={movements}
                    visible={showModal}
                    onClose={() => {
                        this.setState({ showModal: false });
                        this.onLoad();
                        this.slidePuzzle.initializeBoard();
                    }}
                    animationSource={anim.trophy} />
            </View>
        );
    }
}

// make this component available to the app
export default HomeScreen;
