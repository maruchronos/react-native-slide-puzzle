
import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
// import CroppingView from 'react-native-cropping';
import styles from './styles';
import { images } from '../../config';

const PuzzlePiece = ({
    pieceSize,
    line,
    column,
    number,
    lastPiece,
    handlePress,
    showNumbers,
    numberColor
}) => {
    if (number === lastPiece) {
        return null;
    }
    return (
        <ImageBackground
            source={images.puzzleImages[number - 1]}
            style={[styles.piece, {
                top: (line * pieceSize),
                left: (column * pieceSize),
                width: pieceSize,
                height: pieceSize
            }]} >
            <TouchableOpacity
                hitSlop={{
                    top: pieceSize,
                    bottom: pieceSize,
                    left: pieceSize,
                    right: pieceSize
                }}
                onPress={() => handlePress(line, column)} >
                {showNumbers ? (
                    <View style={styles.numberContainer}>
                        <Text style={[styles.number, { color: numberColor }]}>{number}</Text>
                    </View>
                ) : null
                }
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default PuzzlePiece;
