import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Constants from "expo-constants";
import {Entypo, EvilIcons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './UserProfile'


const UserList = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    // const [seed, setSeed] = useState(1);

    const makeRemoteRequest = () => {
        const url = `https://randomuser.me/api/?seed=1&page=${page}&results=20`;
        setLoading(true);
        console.log('makeRemoteRequest');

        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setData(page === 1 ? res.results : [...data, ...res.results]);
                setLoading(false);
                setRefreshing(false);
            })
            .catch((err) => {
                console.error(err.toString());
                setLoading(false);
            });
    };

    useEffect(() => {
        makeRemoteRequest();
    }, []);

    useEffect(() => {
        makeRemoteRequest();
    }, [page]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const handleRefresh = () => {
        setPage(1);
        // setSeed(1);
        setRefreshing(true);
    };

    const renderFooter = () => {
        if (!loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: '#CED0CE',
                }}>
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {!!data.length && (
                <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('UserProfile')}
                        >
                            <View style={styles.userLogo}>
                                <Image style={styles.logo} source={{uri: item.picture.large}}/>
                                <Text style={{marginTop: 5, fontWeight: 'bold'}}>{item.name.first}</Text>
                                <Text style={{fontWeight: 'bold'}}>{item.name.last}</Text>
                            </View>
                            <View style={styles.userInfo}>
                                <View style={styles.userInfoItem}>
                                    <Entypo name="email" size={24} color="#25224E"/>
                                    <Text style={styles.userInfoItemText}>{item.email}</Text>
                                </View>
                                <View style={styles.userInfoItem}>
                                    <Entypo name="phone" size={24} color="#25224E"/>
                                    <Text style={styles.userInfoItemText}>{item.phone}</Text>
                                </View>
                                <View style={styles.userInfoItem}>
                                    <Entypo name="gauge" size={24} color="#25224E"/>
                                    <Text style={styles.userInfoItemText}>{item.dob.age}</Text>
                                </View>
                                <View style={styles.userInfoItem}>
                                    <Entypo name="location-pin" size={24} color="#25224E"/>
                                    <Text
                                        style={styles.userInfoItemText}>{item.location.city}, {item.location.state}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.phone}
                    ListFooterComponent={renderFooter}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        backgroundColor: '#25224E',
    },
    itemContainer: {
        width: 340,
        marginBottom: 10,
        backgroundColor: '#FFF',
        borderRadius: 8,
        flexDirection: 'row',
    },
    userLogo: {
        alignItems: 'center',
        padding: 10,
        width: 100,
    },
    userInfo: {
        justifyContent: 'space-evenly',

    },
    logo: {
        borderColor: '#25224E',
        borderWidth: 2,
        width: 75,
        height: 75,
        borderRadius: 75,

    },
    userInfoItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userInfoItemText: {
        marginLeft: 7,
        maxWidth: '80%',
    }
});