import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CustomMultiPicker from 'react-native-multiple-select-list';

export default class CategoriesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null
    };
  }

  componentDidMount() {
    fetch('http://private-e029e-wisher.apiary-mock.com/categories')
      .then(res => res.json())
      .then(data => this.setState({ categories: data }))
      // eslint-disable-next-line no-console
      .catch(error => console.error('Error:', error));
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.categories) return <Text>LOADING...</Text>;

    return (
      <View style={styles.container}>
        {this.state.categories.map((category, index) => {
          // return <Text key={index}>{category.category_name} </Text>;
          return (
            <CustomMultiPicker
              key={index}
              options={category}
              multiple={true} //
              returnValue={'value'} // label or value
              callback={res => {
                return res;
              }} // callback, array of selected items
              rowBackgroundColor={'#eee'}
              rowHeight={40}
              rowRadius={5}
              iconColor={'#00a2dd'}
              iconSize={30}
              selectedIconName={'ios-checkmark-circle-outline'}
              scrollViewHeight={130}
            />
          );
        })}
        <View>
          <Button title="Next" onPress={() => navigate('ReadyScreen')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  }
});
