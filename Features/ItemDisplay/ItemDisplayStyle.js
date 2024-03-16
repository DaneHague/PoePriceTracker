import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    chartTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 16,
        width: '100%',
    },
});
