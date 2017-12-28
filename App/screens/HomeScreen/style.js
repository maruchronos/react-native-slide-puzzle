import { colors } from '../../config';

const styles = {
    headerText: {
        color: colors.primary
    },
    reloadButton: {
        color: colors.primary,
        backgroundColor: colors.activeColor,
        marginTop: 10,
        padding: 5

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundScreens
    },
    icon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    }
};

export default styles;
