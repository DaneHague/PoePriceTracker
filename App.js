import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import ItemDisplay from "./Features/ItemDisplay/ItemDisplay";
import Dropdown from "./Features/Dropdown/Dropdown";
import React, {useState} from "react";


export default function App() {

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };
  
  return (
    <View style={styles.container}>
      <Dropdown onSelect={handleSelect} />
      {selectedItem === 'MageBlood' && <ItemDisplay itemName={'Mageblood'} />}
      {selectedItem === 'Headhunter' && <ItemDisplay itemName={'Headhunter'} />}
      {/**/}
      {/*<ItemDisplay itemName={'Headhunter'} />*/}
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
