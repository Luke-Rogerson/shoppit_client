import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => this.props.navigation.navigate('HomeScreen')}
        style={styles.title}
      >
        Loading...
      </Text>

      <Image
        source={require('./../assets/bunny-hop.gif')}
        style={{ width: SCREEN_WIDTH }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#91C7A3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 36,
    fontFamily: 'Walsheim',
    color: '#fff'
  }
});

export default LoadingScreen;
