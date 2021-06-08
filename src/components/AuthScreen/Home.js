import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Schema } from '../../db/Schema';
import Realm from 'realm';
import { useNavigation } from '@react-navigation/native';


const Home = () => {

    const navigation = useNavigation();
    const [editMode, setEditMode] = useState(false);
    const [updateName, setUpdateName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');

    const onInsert = async () => {
        try {
            const newUser = {
                userName,
                email,
                password,
                age
            };
            // Open up the database so we can write to it.
            const realm = await Realm.open({
                schema: [Schema],
                schemaVersion: 4
            });
            realm.write(() => {
                realm.create('User', newUser);
            });
            console.log('User Added');
            emptyField();
            navigation.navigate('DisplayRealm', {
                show: 0
            });
        } catch (err) {
            console.log(err);
        }
    };

    const onUpdate = async () => {
        try {
            const realm = await Realm.open({
                schema: [Schema],
                schemaVersion: 4
            });
            realm.write(() => {
                const dataf = realm.objects('User');
                const data = dataf.filtered(`userName = "${updateName}"`)[0];
                data.userName = userName;
                data.password = password;
                data.email = email;
                data.age = age;
            });
            console.log("User Updated");
            setEditMode(!editMode);
            emptyField();
            navigation.navigate('DisplayRealm', {
                show: 0
            })

        } catch (error) {
            console.log(error)
        }
    }

    const emptyField = () => {
        setUserName('');
        setEmail('');
        setPassword('');
        setAge('');
        setUpdateName('');
    }
    // const sortData = async () => {
    //     try {
    //         const realm = await Realm.open({ schema: [Schema] });
    //         const data = realm.objects('User');
    //         const sortbyName = data.sorted("userName");
    //         //  console.log('Sorted Data by Name: ', sortbyName);
    //         console.log(
    //             `list of users after sorting by name: ${sortbyName.map(
    //                 (sortbyName) => sortbyName.userName
    //             )}`);
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }

    // }

    // const deleteData = async () => {
    //     try {
    //         const realm = await Realm.open({ schema: [Schema] });
    //         const data = realm.objects('User');
    //         const deleteUser = data.filtered("userName = 'hjuhj'");
    //         console.log(deleteUser);
    //         realm.write(() => {
    //             // Delete the task from the realm.
    //             realm.delete(deleteUser);
    //             // Discard the reference.
    //             // deleteUser = null;
    //         });
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }

    // }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>SignUp</Text>
            <View style={styles.mainView}>
                {editMode ?
                    <TextInput
                        style={styles.fieldContainer}
                        placeholder="Search name"
                        onChangeText={(text) => setUpdateName(text)}
                        value={updateName}
                    /> : null}
                <TextInput
                    style={styles.fieldContainer}
                    placeholder="Username"
                    onChangeText={(text) => setUserName(text)}
                    value={userName}
                />
                <TextInput
                    style={styles.fieldContainer}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={styles.fieldContainer}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <TextInput
                    style={styles.fieldContainer}
                    placeholder="Age"
                    onChangeText={(text) => setAge(Number(text))}
                    value={age}
                />
                {editMode ?
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                        onUpdate();
                    }}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity> : null}

            </View>

            <View>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                    onInsert();
                }}>
                    <Text style={styles.buttonText}>Insert</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                    navigation.navigate('Delete');
                }}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                    navigation.navigate('DisplayRealm', {
                        show: 0
                    });
                }}>
                    <Text style={styles.buttonText}>Display Data</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                    setEditMode(!editMode);
                }}>
                    <Text style={styles.buttonText}>Update Data</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                    navigation.navigate('DisplayRealm', {
                        show: 1
                    });
                }}>
                    <Text style={styles.buttonText}>Sort Data</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                    emptyField();
                }}>
                    <Text style={styles.buttonText}>Empty</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: "bold",
        color: "blue",
        margin: 20,
        textDecorationLine: 'underline'
    },
    fieldContainer: {
        backgroundColor: "#0EB2BF",
        padding: 10,
        borderRadius: 10,
        fontWeight: "bold",
        fontSize: 18,
        margin: 5,
        height: 50
    },
    mainView: {
        width: '70%',
        backgroundColor: "lightblue",
        padding: 20,
        borderRadius: 15,
        margin: 10
    },
    buttonStyle: {
        //   width: '40%',
        backgroundColor: "#4E4AAD",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 5,
        margin: 5
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }
});

export default Home;