import React, {Component} from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Alert, Switch, Button} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Card, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { } from 'react-native-gesture-handler'; 
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showDateTimeModal: false,
            mode: 'date',
        }
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\n' +
            'Smoking? ' + this.state.smoking + '\n' +
            'Date and Time ' + this.state.date.toISOString(),
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log('Cancel pressed');
                        this.resetForm();
                    },
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        console.log('Ok pressed');
                        this.presentLocalNotification(
                            this.state.date.toLocaleDateString());
                        this.resetForm();
                    },
                }
            ],
            { cancelable: false}
        )
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showDateTimeModal: false,
            mode: 'date',
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(
            Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(
                Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permision not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });

        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Your Reservation',
                body: "Reservation for " + date + " requested",
            },
            trigger: null,
        });
    }

    render() {
        return (
            <Animatable.View
                animation="zoomIn"
                delay={200}
                duration={1000}
            >
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>
                        Number of Guests
                    </Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({guests: itemValue})
                    }>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>
                        Smoking/Non-Smoking?
                    </Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>
                        Date and Time
                    </Text>
                    <TouchableOpacity
                        style={styles.formItem}
                        style={{
                            padding: 7,
                            borderColor: '#512DA8',
                            borderWidth: 1,
                            flexDirection: 'row',
                        }}
                        onPress={() => this.setState({showDateTimeModal: true, mode: 'date'})}
                    >
                        <Icon
                            type='font-awesome'
                            name='calendar'
                            color='#512DA8'
                            size={20}
                        />
                        <Text>
                            {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
                        </Text>
                    </TouchableOpacity>
                    {/* Date Time Picker */}
                    {this.state.showDateTimeModal && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={this.state.mode}
                            minimumDate={new Date()}
                            onChange={
                                (event, date) => {
                                    if (date === undefined) {
                                        this.setState({showDateTimeModal: false})
                                    } else {
                                        this.setState({
                                            showDateTimeModal: this.state.mode === "time" ? false : true,
                                            mode: "time",
                                            date: new Date(date),
                                        })
                                    }
                                }
                            }
                        />
                    )}
                </View>
                <View style={styles.formRow}>
                    <Button
                        title='Reserve'
                        color='#512DA8'
                        onPress={() => this.handleReservation() }
                        accessibilityLabel='Learn more about reservations'
                    />
                </View>
            </Animatable.View>
        );
    }

}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 15,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    }

});

export default Reservation;