import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class homeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>HOME SCREEN</Text>
        <Button
          title="Back"
          onPress={() => {
            navigate('signInScreen');
          }}
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