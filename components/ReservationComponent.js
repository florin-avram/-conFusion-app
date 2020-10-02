import React, {Component} from 'react';
import { Text, View, StyleSheet, ScrollView, Switch, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Card, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false,
            mode: 'date',
        }
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        alert(JSON.stringify(this.state));

        // reset form
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false,
            mode: 'date',
        });
    }

    render() {
        return (
            <ScrollView>
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
                        style= {{
                            padding: 7,
                            borderColor: '#512DA8',
                            borderWidth: 1,
                            flexDirection: 'row',
                        }}
                        onPress={() => this.setState({showModal: true, mode: 'date'})}
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
                    {this.state.showModal && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={this.state.mode}
                            minimumDate={new Date()}
                            onChange={
                                (event, date) => {
                                    if (date === undefined) {
                                        this.setState({showModal: false})
                                    } else {
                                        this.setState({
                                            showModal: this.state.mode === "time" ? false : true,
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
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    }

});

export default Reservation;