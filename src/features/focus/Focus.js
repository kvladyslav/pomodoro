import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import Constants from 'expo-constants';
import RoundedButton from '../../components/RoundedButton';
import FocusHistory from './FocusHistory';

const Focus = ({setFocusSubject, focusHistory, clearHistory}) => {
    const [task, setTask] = useState();


    const handleAddTask = () => {
        setFocusSubject(task);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.taskQuestion}>
                What would you like to focus on:
            </Text>
            <View style={styles.writeTaskWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={'Write a task'}
                    value={task}
                    onChangeText={(text) => setTask(text)}
                />
                <RoundedButton onPress={() => handleAddTask()}>+</RoundedButton>
            </View>
            <FocusHistory focusHistory={focusHistory}
                          clearHistory={clearHistory}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#25224E',
        padding: 8,
    },
    taskQuestion: {
        fontFamily: 'Roboto-Black',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 28,
        color: '#FFFFFF',
        paddingTop: 140,
        paddingHorizontal: 25,
    },
    writeTaskWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 14,
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 3,
        borderColor: '#25224E',
        borderWidth: 1,
        width: '80%',
        height: 60,
    },
});

export default Focus;