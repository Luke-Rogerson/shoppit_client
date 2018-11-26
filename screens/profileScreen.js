import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null
    };
  }

  componentDidMount() {
    fetch('http://private-e029e-wisher.apiary-mock.com/profile/me')
      .then(res => res.json())
      .then(data => this.setState({ userData: data }))
      // eslint-disable-next-line no-console
      .catch(error => console.error('Error:', error));
  }

  render() {
    const { userData } = this.state;
    const { navigate } = this.props.navigation;

    if (!userData) return <Text>Loading...</Text>;
    return (
      <View style={styles.container}>
        <Text>
          {this.state.userData.first_name} {this.state.userData.last_name}
        </Text>
        <Image
          source={{ uri: this.state.userData.avatar_url }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: 'black',
            margin: 5
          }}
        />
        <Button
          title="Imagine this is an item"
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
    alignItems: 'center'
  }
});
