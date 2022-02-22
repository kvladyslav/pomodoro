import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
} from 'react-native';

const Task = ({text, taskStyle, taskTextStyle, square}) => {
    const image = {
        uri: 'https://toppng.com/uploads/preview/blue-tick-icon-blue-tick-11562968592afefiqpjrw.png',
    };
    return (
        <View style={[styles.item, taskStyle]}>
            {square ? (
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={styles.square}></View>
                </ImageBackground>
            ) : null}
            {square ? (
                <Text style={[styles.itemText, taskTextStyle]}>{text}</Text>
            ) : (
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text
                        style={[
                            styles.itemText,
                            taskTextStyle,
                            {maxWidth: '95%', textAlign: 'center'},
                        ]}>
                        {text}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: 280,
    },
    image: {
        width: 24,
        height: 24,
        borderRadius: 5,
        marginRight: 10,
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 10,
    },
    itemText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        maxWidth: '85%',
        textAlign: 'justify',
    },
});

export default Task;
