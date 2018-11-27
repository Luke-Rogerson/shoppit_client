import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import mockdb from '../mockdb.json';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null
    };
  }

  componentDidMount() {
    fetch('http://private-e029e-wisher.apiary-mock.com/me')
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
        {/* <Text style={styles.category_name}>
          {this.state.userData.categories[1].category_name}
        </Text> */}
        <ScrollView>
          {mockdb.fitness.map((item, i) => {
            return (
              <TouchableHighlight
                onPress={() => navigate('ItemDetailScreen')}
                key={i}
              >
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
    color: '#6F6E6C',
    fontSize: 20
  },
  profile_pic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10
  },
  item_images: {
    flex: 1,
    resizeMode: 'cover',
    height: 300,
    width: SCREEN_WIDTH - 20,
    margin: 10,
    borderRadius: 5,
    padding: 10
  },
  category_name: {
    textTransform: 'capitalize',
    color: '#6F6E6C',
    padding: 10
  }
});
