import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class FriendListScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>FRIEND LIST SCREEN</Text>
        <Button title="Friend #1" onPress={() => navigate('ProfileScreen')} />
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
