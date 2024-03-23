import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getResource } from '../../Services/PoEPriceTracker/Implementations/GetItemPricesService';
import styles from './ItemDisplayStyle';

const ItemDisplay = ({ itemName, currency }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError('');
            const dateTo = new Date();
            dateTo.setHours(23, 59, 59, 0);
            const dateFrom = new Date();
            dateFrom.setDate(dateTo.getDate() - 1);
            dateFrom.setHours(0, 0, 0, 0);

            const formatDate = (date) => date.toISOString();

            try {
                const data = await getResource(itemName, formatDate(dateFrom), formatDate(dateTo), currency);
                setItems(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [itemName, currency]);

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
                        yAxisLabel={"D"}
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
