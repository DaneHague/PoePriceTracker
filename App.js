// App.js
import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import ItemDisplay from "./Features/ItemDisplay/ItemDisplay";
import Dropdown from "./Features/Dropdown/Dropdown";
import CurrencyDropdown from "./Features/CurrencyDropdown/CurrencyDropdown";
import React, {useState} from "react";


export default function App() {

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
    };

    return (
        <View style={styles.container}>
            <Dropdown onSelect={handleSelect} />
            <CurrencyDropdown onSelect={handleCurrencySelect} />
            {selectedItem && selectedCurrency && <ItemDisplay itemName={selectedItem} currency={selectedCurrency} />}
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
});