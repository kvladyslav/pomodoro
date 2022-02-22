import React from 'react';
import {View, StyleSheet} from 'react-native';
import RoundedButton from "../../components/RoundedButton";

const Timing = ({changeTime}) => {

    return (
        <View style={styles.container}>
            <View style={styles.timingButton}>
                <RoundedButton styleButton={styles.styleButton} onPress={changeTime(0.1)}>6s</RoundedButton>
            </View>
            <View style={styles.timingButton}>
                <RoundedButton styleButton={styles.styleButton} onPress={changeTime(0.2)}>12s</RoundedButton>
            </View>
            <View style={styles.timingButton}>
                <RoundedButton styleButton={styles.styleButton} onPress={changeTime(0.3)}>18s</RoundedButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 30,
    },
    timingButton: {
        marginHorizontal: 20
    },
    styleButton: {
        borderRadius: 75,
        width: 75,
        height: 75,
    }
});

export default Timing;
