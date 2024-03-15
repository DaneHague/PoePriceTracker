import React, { useEffect, useState } from 'react';
import { getResource } from '../Services/PoEPriceTracker/Implementations/GetItemPricesService';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const ItemComponent = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>Name: {item.name}</Text>
        <Text>Type: {item.type}</Text>
        <Text>Stack Size: {item.stackSize}</Text>
        <Text>Max Stack Size: {item.maxStackSize}</Text>
    </View>
);

const ItemDisplay = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Adjust the resourceId as needed
                const data = await getResource('GetCurrency');
                // Assuming the data is an array; if it's a single object, wrap it in an array
                setItems(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={items}
                    renderItem={({ item }) => <ItemComponent item={item} />}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
};

export default ItemDisplay;
