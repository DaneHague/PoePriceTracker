import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getResource } from '../../Services/PoEPriceTracker/Implementations/GetItemPricesService';
import styles from './ItemDisplayStyle';

const ItemDisplay = ({ itemName }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const data = await getResource(itemName, '2024-03-15', '2024-03-16');
                setItems(Array.isArray(data) ? data : [data]);
                console.log('Data:', data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [itemName]);

    const sortedItems = items.sort((a, b) =>
        new Date(a.timeRecorded).getTime() - new Date(b.timeRecorded).getTime()
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}h`;
    };
    
    const chartData = {
        labels: sortedItems.map(item =>
            `${new Date(item.timeRecorded).getHours()}h`
        ),
        datasets: [{
            data: sortedItems.map(item => item.price),
        }],
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <>
                    <Text style={styles.chartTitle}>{itemName} 24h</Text>
                    <LineChart
                        data={chartData}
                        width={Dimensions.get('window').width}
                        height={250}
                        yAxisLabel="D"
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: '6',
                                strokeWidth: '2',
                                stroke: '#ffa726',
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </>
            )}
        </View>
    );
};

export default ItemDisplay;
