// Dropdown.js
import React, { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import { getItems } from '../../Services/PoEPriceTracker/Implementations/GetItemPricesService';

const Dropdown = ({ onSelect }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getItems();
                const formattedData = data.map(item => ({ label: item.itemName, value: item.itemName }));
                setItems(formattedData);
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
            items={items}
            setOpen={setOpen}
            setValue={(value) => {
                setValue(value);
                onSelect(value);
            }}
            setItems={setItems}
        />
    );
};

export default Dropdown;
