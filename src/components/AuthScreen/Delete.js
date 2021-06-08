import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, StyleSheet, TextInput } from 'react-native';
import { Schema } from '../../db/Schema';
import Realm from 'realm';
import { useNavigation } from '@react-navigation/native';


const Delete = () => {

    const navigation = useNavigation();
    const [deleteData, setDeleteData] = useState('');

    //function to delete data by searching for name
    const onDelete = async () => {
        try {
            const realm = await Realm.open({
                schema: [Schema],
                schemaVersion: 4
            });
            const data = realm.objects('User');
            const deleteUser = data.filtered(`userName = "${deleteData}"`);
            console.log(deleteUser);
            realm.write(() => {
                // Delete the task from the realm.
                realm.delete(deleteUser);
                // Discard the reference.
                // deleteUser = null;
            });
            navigation.navigate('DisplayRealm', {
                show: 0
            });
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TextInput
                style={{
                    backgroundColor: "#0EB2BF",
                    padding: 10,
                    borderRadius: 10,
                    fontWeight: "bold",
                    fontSize: 18,
                    margin: 5,
                    height: 50
                }}
                placeholder="User name"
                onChangeText={(text) => setDeleteData(text)}
            />

            <Button title="Delete" onPress={() => {
                onDelete()
            }} />
        </View>

    );
}

export default Delete;
