import React, { Component } from 'react';
import { Text, View, Modal, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button } from '../../components';
import styles from './styles';
import { images } from '../../config';

class WinModal extends Component {
    constructor(props) {
        super(props);
        this._animation = null;
    }

    componentWillUnmount() {
        this._animation = null;
    }

    renderContent = () => {
        const {
            animationSource,
            title,
            onClose,
            timer,
            movements
        } = this.props;
        return (
            <View style={styles.overlay}>
                <View style={styles.whiteBox}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.stats}>
                        <Image source={images.finished} style={styles.finished} />
                        <View style={styles.statsValueContainer}>
                            <View style={styles.row}>
                                <Text style={styles.defaultTextStyle}> Time </Text>
                                <Text style={styles.statsValue}>{timer}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.defaultTextStyle}> Movements </Text>
                                <Text style={styles.statsValue}>{movements}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.animation}>
                        <LottieView
                            ref={(ref) => { this._animation = ref; }}
                            loop
                            source={animationSource} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            containerStyle={styles.buttonStyle}
                            icon={'rotate-right'}
                            title={'RELOAD'}
                            action={onClose} />
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { visible, onClose } = this.props;
        return (
            <Modal
                onRequestClose={onClose}
                animationType={'slide'}
                visible={visible}
                transparent
                onShow={() => {
                    if (this._animation) this._animation.play();
                }}
                style={styles.modal}>
                {this.renderContent()}
            </Modal>
        );
    }
}

WinModal.defaultProps = {
    visible: false,
    titleStyle: styles.title,
    messageStyle: styles.message,
    buttons: [{
        label: 'OK',
        onPress: () => { },
        textStyle: styles.defaultTextStyle,
        buttonStyle: styles.defaultButtonStyle
    }],
    errorMessage: null,
    successMessage: null
};


export default WinModal;
