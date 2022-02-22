import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

const CountDown = ({minutes, onEnd, isPaused, onProgress}) => {

    const [millis, setMillis] = useState(minutesToMillis(minutes))
    const interval = React.useRef(null);

    const countDown = () => {
        setMillis((time) => {
            if (time === 0) {
                clearInterval(interval.current);
                onEnd();
                return time;
            }
            const timeLeft = time - 1000
            const progress = (timeLeft / minutesToMillis(minutes)) * 100
            onProgress(progress)
            return timeLeft;
        })
    }

    useEffect(() => {
        setMillis(minutesToMillis(minutes));

        return () => clearInterval(interval.current);
    }, [minutes])

    useEffect(() => {
        if (isPaused) {
            if (interval.current) {
                clearInterval(interval.current)
            }
            return;
        }

        interval.current = setInterval(countDown, 1000);
    }, [isPaused])

    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;

    return (
        <>
            <View style={styles.timeWrapper}>
                <Text style={styles.timeSection}>{formatTime(minute)}:{formatTime(seconds)}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    timeWrapper: {
        backgroundColor: '#383E79',
        width: 290,
        height: 160,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    timeSection: {
        fontFamily: 'Roboto-Black',
        fontWeight: 'bold',
        fontSize: 85,
        color: '#FFFFFF',
    },
});

export default CountDown;
