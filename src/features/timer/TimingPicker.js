import React from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker'

const Timing = ({selectedValue, onValueChange}) => {

    return (
        <>
            <Picker
                selectedValue={selectedValue}
                style={styles.timePicker}
                onValueChange={onValueChange}>
                <Picker.Item color="#FFF" label="3s" value={0.05}/>
                <Picker.Item color="#FFF" label="9s" value={0.15}/>
                <Picker.Item color="#FFF" label="15s" value={0.25}/>
            </Picker>
        </>
    );
};

const styles = StyleSheet.create({
    timePicker: {
        height: 50,
        width: 150,
        fontSize: 22,
        color: '#FFF',
        backgroundColor: '#25224E',
        fontFamily: 'Roboto-Black',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#25224E',
        borderWidth: 2,
        bottom: 15,
        position: 'absolute'
    },
});

export default Timing;