import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Task from '../../components/Task';
import CountDown from '../../components/CountDown';
import Constants from 'expo-constants';
import RoundedButton from '../../components/RoundedButton';
import Timing from './Timing';
import TimingPicker from "./TimingPicker";

const DEFAULT_TIME = 0.1;

const Timer = ({onTimerEnd, focusSubject, addFocusHistory, clearSubject}) => {
    const [isStarted, setStarted] = useState(false);
    const [isPicker, setPicker] = useState(false);
    const [timeValue, setTimeValue] = useState(DEFAULT_TIME);
    const [progress, setProgress] = useState(1);

    const onProgress = (p) => {
        setProgress(p / 100);
    };

    const changeTime = (min) => () => {
        setProgress(1);
        setStarted(false);
        setTimeValue(min);
    };

    const onEnd = async () => {
        onTimerEnd();
    };

    return (
        <View style={styles.container}>
            <CountDown
                minutes={timeValue}
                onEnd={onEnd}
                isPaused={!isStarted}
                onProgress={onProgress}
            />
            <Text style={styles.taskTitle}>Focusing on:</Text>
            <Task
                taskTextStyle={{color: '#FFFFFF'}}
                taskStyle={{marginTop: 10, backgroundColor: '#383E79'}}
                text={focusSubject}
                addFocusHistory={addFocusHistory}
            />
            <View style={{alignSelf: 'stretch', padding: 0, marginTop: 30}}>
                <ProgressBar progress={progress} color='#5875D5' style={{backgroundColor: '#FFF'}}/>
            </View>
            <Timing
                changeTime={changeTime}
            />
            {!isStarted ? (
                <RoundedButton
                    onPress={() => setStarted(true)}
                    styleButton={styles.styleButton}>
                    Start
                </RoundedButton>
            ) : (
                <RoundedButton
                    onPress={() => setStarted(false)}
                    styleButton={styles.styleButton}>
                    Pause
                </RoundedButton>
            )}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
                <RoundedButton
                    onPress={changeTime(0)}
                    styleButton={{
                        marginHorizontal: 110,
                    }}>
                    -
                </RoundedButton>
                <RoundedButton
                    onPress={() => setPicker(!isPicker)}
                    styleButton={{
                        marginHorizontal: 110,
                    }}>
                    ...
                </RoundedButton>
            </View>
            {isPicker && (<TimingPicker
                selectedValue={timeValue}
                onValueChange={(timeValue) => {
                    setProgress(1);
                    setStarted(false);
                    setTimeValue(timeValue);
                }}
            />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#25224E',
        alignItems: 'center',
    },
    taskTitle: {
        marginTop: 40,
        fontFamily: 'Roboto-Black',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
    },
    styleButton: {
        borderRadius: 125,
        width: 125,
        height: 125,
        marginTop: 30,
    },
});

export default Timer;
