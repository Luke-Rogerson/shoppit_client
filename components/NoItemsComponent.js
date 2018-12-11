import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const NoItemsComponent = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./../assets/carrot-small.png')} />
      <Text style={styles.title}>No liked items yet!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: 20,
    fontSize: 26,
    fontFamily: 'Walsheim',
    color: '#6F6E6C'
  }
});

export default NoItemsComponent;
