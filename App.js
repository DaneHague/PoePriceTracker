import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import ItemDisplay from "./Features/ItemDisplay/ItemDisplay";


export default function App() {
  return (
    <View style={styles.container}>
      <Button title={'test'}>Press me</Button>
      <ItemDisplay itemName={'Mageblood'} />
      <ItemDisplay itemName={'Headhunter'} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
