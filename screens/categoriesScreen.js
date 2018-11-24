import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class categoriesScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>CATS</Text>
        <Button
          title="Next"
          onPress={() => {
            navigate('readyScreen');
          }}
        >

        </Button>
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
