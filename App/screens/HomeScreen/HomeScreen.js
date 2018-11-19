// import liraries
import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import moment from 'moment';
import SplashScreen from 'react-native-smart-splash-screen';
import SlidePuzzle from '../../containers/SlidePuzzle';
import { Button, Display } from '../../components';
import styles from './style';
import { images, colors } from '../../config';

// create a component
class HomeScreen extends Component {
    static navigationOptions = (props) => {
        console.log('homeScreen props', props);
        return ({
            header: null,
            tabBarVisible: false,
            tabBarIcon: ({ tintColor }) =>
                (<Image source={images.homeIcon} style={[styles.icon, { tintColor }]} />)
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            headerText: '',
            movements: 0,
            timer: 50,
            showNumbers: false
        };
    }

    componentDidMount() {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500
        });

        this.timerController = setInterval(() => {
            let timer = this.state.timer + 1;
            timer = moment(timer, 'seconds').format('mm:ss');
            console.log(timer);
            this.setState({ timer });
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
            timer: 0,
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
                <View style={styles.displayContainer}>
                    <Display
                        label={'Movements'}
                        value={movements} />
                    <Display
                        label={'Time'}
                        value={timer} />
                </View>
                <Text style={styles.headerText}>{headerText}</Text>
                <View style={styles.puzzleContainer}>
                    <SlidePuzzle
                        ref={(slidePuzzle) => { this.slidePuzzle = slidePuzzle; }}
                        columns={3}
                        showNumbers={showNumbers}
                        onFinish={() => this.onFinish()}
                        onLoad={moves => this.onLoad(moves)}
                        onMove={moves => this.onMove(moves)} />
                </View>
                <View style={styles.buttons}>
                    <Button
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
