import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class CategoriesScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>CATEGORIES SCREEN</Text>
        <Button
          title="Next"
          onPress={() => navigate('ReadyScreen')}
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
