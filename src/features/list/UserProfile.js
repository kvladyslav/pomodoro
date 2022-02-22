import React from 'react';
import {
    View,
    Text
} from 'react-native';

const UserProfile = ({navigaton, route}) => {
    return (
        <View>
            <Text>{route.params.name}</Text>
        </View>
    )}

export default UserProfile;