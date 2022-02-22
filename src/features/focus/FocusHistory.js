import React from 'react';
import {StyleSheet, Text, FlatList, SafeAreaView} from 'react-native';

import RoundedButton from '../../components/RoundedButton';
import Task from '../../components/Task';

const FocusHistory = ({focusHistory = [], clearHistory}) => {

    return (
        <>
            <SafeAreaView
                style={styles.container}>
                <Text style={styles.tasksTitle}>Things we've focused on:</Text>
                {!!focusHistory.length && (
                    <FlatList
                        style={{width: '100%', height: '100%', paddingTop: 16}}
                        contentContainerStyle={{alignItems: 'center'}}
                        data={focusHistory}
                        renderItem={({item, index}) => (
                            <Task key={item.id} square text={item.subject}/>
                        )}
                    />
                )}
                {!focusHistory.length && (
                    <Text style={{color: '#000'}}>Nothing yet in tasks list</Text>
                )}

                <RoundedButton
                    onPress={clearHistory}
                    styleButton={{
                        position: 'absolute',
                        borderRadius: 85,
                        bottom: 16,
                        width: 85,
                        height: 85,
                        alignSelf: 'center',
                    }}>
                    Clear
                </RoundedButton>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flex: 1,
        alignItems: 'center',
    },
    tasksTitle: {
        fontFamily: 'Roboto-Black',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 28,
        color: '#FFFFFF',
        paddingHorizontal: 25,
        paddingBottom: 10,
    },
});

export default FocusHistory;
