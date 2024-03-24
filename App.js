import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import ItemDisplay from "./Features/ItemDisplay/ItemDisplay";
import Dropdown from "./Features/Dropdown/Dropdown";
import CurrencyDropdown from "./Features/CurrencyDropdown/CurrencyDropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from "react";

export default function App() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [searchPressed, setSearchPressed] = useState(false);

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
    };

    const handleSearchPress = () => {
        setSearchPressed(prevState => !prevState);
    };

    return (
        <View style={styles.container}>
            <View style={styles.dropdownContainer}>
                <View style={styles.dropdown}>
                    <Dropdown onSelect={handleSelect} />
                </View>
                <View style={styles.dropdown}>
                    <CurrencyDropdown onSelect={handleCurrencySelect} />
                </View>
            </View>
            <View style={styles.datePickerContainer}>
                <Text style={styles.dateText}>Start Date</Text>
                <DateTimePicker
                    style={styles.datePicker}
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setStartDate(selectedDate || startDate);
                    }}
                />
                <Text style={styles.dateText}>End Date</Text>
                <DateTimePicker
                    style={styles.datePicker}
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setEndDate(selectedDate || endDate);
                    }}
                />
            </View>
            <Button title="Search" onPress={handleSearchPress} />
            {selectedItem && selectedCurrency && searchPressed && <ItemDisplay itemName={selectedItem} currency={selectedCurrency} startDate={startDate} endDate={endDate} />}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingTop: 50,
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: 100,
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        zIndex: 2,
        backgroundColor: '#FFFFFF',
    },
    dropdown: {
        flex: 1,
    },
    datePicker: {
        backgroundColor: '#FFFFFF',
    },
    dateText: {
        color: '#000000',
    }
});