import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import mockdb from '../mockdb.json';

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
        <Text style={styles.text}>
          {this.state.userData.first_name} {this.state.userData.last_name}
        </Text>
        <Image
          source={{ uri: this.state.userData.avatar_url }}
          style={styles.profile_pic}
        />
        <Text style={styles.category_name}>{this.state.userData.categories[1].category_name}</Text>
        <ScrollView>
          {mockdb.fitness.map((item, i) => {
            return (
              <TouchableHighlight onPress={() => navigate('ItemDetailScreen')} key={i}>
                <Image
                  source={{ uri: item.img_url }}
                  style={styles.item_images}
                />
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  text: {
    margin: 10,
    backgroundColor: 'lightgrey'
  },
  profile_pic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10
  },
  item_images: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    borderRadius: 10
  },
  category_name: {
    textTransform: 'capitalize',
    fontWeight: 'bold'
  }
});
