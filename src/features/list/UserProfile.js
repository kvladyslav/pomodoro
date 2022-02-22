import React from 'react';


const UserProfile = ({navigaton, route}) => {
    return (
        <View>
            <Text>{route.params.name}</Text>
        </View>
    )}

export default UserProfile;