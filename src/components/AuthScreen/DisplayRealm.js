import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, StyleSheet, } from 'react-native';
import { Schema } from '../../db/Schema';
import Realm, { User } from 'realm';
import { useNavigation } from '@react-navigation/native';

const DisplayRealm = ({ route }) => {

    const { show } = route.params;
    const navigation = useNavigation();
    const [users, setUsers] = useState('');
    // const [combined, setCombined] = useState('')

    // const migrateStates = async () => {
    //     try {
    //         Realm.open({
    //             schema: [Schema],
    //             schemaVersion: 3,
    //             migration: (oldRealm, newRealm) => {
    //                 // only apply this change if upgrading to schemaVersion 2
    //                 console.log("UC");
    //                 if (oldRealm.schemaVersion < 3) {
    //                     const oldObjects = oldRealm.objects('User');
    //                     const newObjects = newRealm.objects('User');
    //                     // loop through all objects and set the fullName property in the new schema
    //                     for (const objectIndex in oldObjects) {
    //                         const oldObject = oldObjects[objectIndex];
    //                         const newObject = newObjects[objectIndex];
    //                         newObject.combine = `${oldObject.userName} ${oldObject.password}`;
    //                         console.log('Working: ', newObject.combine);
    //                     }
    //                 }
    //             }
    //         });

    //     }
    //     catch (err) {
    //         console.log(err);
    //     }

    // }

    const getDataRealm = async () => {
        try {
            const realm = await Realm.open({
                schema: [Schema],
                schemaVersion: 4
            });
            if (show == '1') {
                const data = realm.objects('User').sorted("userName");
                setUsers(data);
            }
            else {
                const data = realm.objects('User');
                setUsers(data);
            }
            //  console.log("Successfully added");
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getDataRealm();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>List From Realm</Text>
            <Button title="Insert more" onPress={() => { navigation.navigate('Home') }} />
            {/* <Button title="Migrate" onPress={() => { migrateStates() }} /> */}
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={users}
                renderItem={
                    ({ item }) => (
                        <View style={{ margin: 5 }}>
                            <Text style={styles.textStyle1}>{item.userName}</Text>
                            <Text style={styles.textStyle2}>{item.email}</Text>
                            <Text style={styles.textStyle2}>{item.password}</Text>
                            <Text style={styles.textStyle2}>{item.age}</Text>

                        </View>
                    )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        margin: 10,
        marginBottom: 25,
        color: "blue",
        fontWeight: "bold",
        textDecorationLine: 'underline'
    },
    textStyle1: {
        fontSize: 30,
        fontWeight: "bold",
    },
    textStyle2: {
        fontSize: 20,
    }
});

export default DisplayRealm;