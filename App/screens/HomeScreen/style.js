import { colors } from '../../config';

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.backgroundScreens,
        padding: 12
    },
    mainTitle: {
        color: colors.primary,
        fontSize: 24
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: colors.primary,
        marginVertical: 12
    },
    headerText: {
        color: colors.primary
    },
    displayContainer: {
        flexDirection: 'row'
    },
    puzzleContainer: {
        width: '100%',
        backgroundColor: colors.backgroundCanvas,
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.primary
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    }
};

export default styles;
