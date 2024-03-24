// CurrencyDropdown.js
import React, { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

const CurrencyDropdown = ({ onSelect }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = ["Divine", "Vaal", "Chaos"];
                const formattedData = data.map(currency => ({ label: currency, value: currency }));
                setCurrencies(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={currencies}
            setOpen={setOpen}
            setValue={(value) => {
                setValue(value);
                onSelect(value);
            }}
            setItems={setCurrencies}
        />
    );
};

export default CurrencyDropdown;