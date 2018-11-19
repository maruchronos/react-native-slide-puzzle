import colors from '../../config/colors';

const styles = {
    piece: {
        backgroundColor: colors.toastTextColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderColor: colors.backgroundScreens,
        borderWidth: 1
    },
    numberContainer: {
        width: 20,
        height: 20,
        backgroundColor: colors.backgroundScreens,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 10
    }
};

export default styles;
