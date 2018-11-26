import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ItemDetailScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>COOL ITEM HERE</Text>
        <Text>$1buzillion</Text>
        <Button
          title="BUY"
          onPress={() => navigate('ItemDetailScreen')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
