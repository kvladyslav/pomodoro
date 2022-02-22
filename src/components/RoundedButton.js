import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const RoundedButton = ({onPress, children, styleButton, styleButtonText}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styleButton]}>
            <Text style={[styles.buttonText, styleButtonText]}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 58,
        height: 58,
        backgroundColor: '#25224E',
        borderRadius: 58,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderStyle: 'solid',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default RoundedButton;
