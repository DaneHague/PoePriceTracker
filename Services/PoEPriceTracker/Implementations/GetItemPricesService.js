const BASE_URL = 'https://poe-functions-test.azurewebsites.net/api/GetItemPrices/';


const fetchResource = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    return data;
  } catch (error) { 
    console.error('Fetching error:', error);
    throw error;
  }
};

export const getResource = async (itemName, dateFrom, dateTo) => {
  return await fetchResource(`/${itemName}/${dateFrom}/${dateTo}`);
};