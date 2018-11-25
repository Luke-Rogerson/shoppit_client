import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>PROFILE SCREEN</Text>
        <Button
          title="Go to item-detail page"
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
