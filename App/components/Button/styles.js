import { colors } from '../../config';

const styles = {
    buttonContainer: {
        flex: 1
    },
    buttonText: {
        backgroundColor: colors.buttonBg,
        marginTop: 10,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    icon: {
        marginRight: 5
    }
};
export default styles;
