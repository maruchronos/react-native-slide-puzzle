import { colors } from '../../config';

const styles = {
    title: {
        fontSize: 22,
        color: colors.backgroundScreens,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 12
    },
    modal: {
        width: '100%',
        height: '100%'
    },
    overlay: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: colors.overlay
    },
    whiteBox: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    defaultTextStyle: {
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 18
    },
    statsValue: {
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 22,
        textAlign: 'right'
    },
    defaultButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 40
    },
    animation: {
        height: 200,
        width: 200,
        backgroundColor: 'red'
    },
    defaultButton: {
        marginLeft: 15,
        marginRight: 15
    },
    stats: {
        width: '100%',
        backgroundColor: colors.backgroundScreens,
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        borderRadius: 10,
        padding: 5
    },
    statsValueContainer: {
        flex: 1
    },
    finished: {
        width: 80,
        height: 80,
        marginRight: 12,
        borderRadius: 5
    },
    buttonContainer: {
        width: '100%',
        height: 90
    },
    buttonStyle: {
        backgroundColor: colors.backgroundScreens
    }
};

export default styles;
