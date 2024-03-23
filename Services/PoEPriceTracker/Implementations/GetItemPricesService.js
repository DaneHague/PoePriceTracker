const BASE_URL = 'https://poe-functions-test.azurewebsites.net/api';


const fetchResource = async (endpoint, options = {}) => {
  try {
    console.log(`${BASE_URL}/${endpoint}`);
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    const data = await response.json();
    return data;
  } catch (error) { 
    console.error('Fetching error:', error);
    throw error;
  }
};

export const getResource = async (itemName, dateFrom, dateTo, currency) => {
  return await fetchResource(`GetItemPrices/${itemName}/${dateFrom}/${dateTo}/${currency}`);
};

export const getItems = async () => {
    return await fetchResource('GetItems');
}