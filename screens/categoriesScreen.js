import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import {
  getCurrentUserData,
  selectACategory,
  deselectACategory,
  getAllCategories,
  getAllRecommendedItems
} from '../actions';

import { Spinner } from 'native-base';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class CategoriesScreen extends React.Component {
  state = {
    selectedCategories: this.props.selectedCategories
  };

  componentDidMount() {
    this.props.getCurrentUserData();
    this.props.getAllCategories();
  }

  handleButtonPress = id => {
    const inSelected = this.state.selectedCategories.includes(id);

    let selectedCategories;
    if (inSelected) {
      selectedCategories = this.state.selectedCategories.filter(
        catID => catID !== id
      );
      this.props.deselectACategory(id);
    } else {
      selectedCategories = [...this.state.selectedCategories, id];
      this.props.selectACategory(id);
    }

    this.setState({ selectedCategories });
    this.setSelectedColors(id);
  };

  setSelectedColors = id => {
    return this.state.selectedCategories.includes(id)
      ? styles.selected
      : styles.unselected;
  };

  createCategoryButtons = catArray => {
    return catArray.map(cat => {
      return (
        <TouchableOpacity
          key={cat.category_id}
          title={cat.category_name}
          onPress={() => this.handleButtonPress(cat.category_id)}
          style={this.setSelectedColors(cat.category_id)}
        >
          <Text style={styles.buttonText}>{cat.category_name}</Text>
        </TouchableOpacity>
      );
    });
  };

  refreshRecommended = () => {
    // call get recommended items again with new categories
    this.props.getAllRecommendedItems();
    // navigate to home screen
    this.props.navigation.navigate('HomeScreen');
  };

  render() {
    const categories = Object.values(this.props.categories);

    if (!categories.length)
      return (
        <Spinner
          style={{
            height: SCREEN_HEIGHT / 1.3
          }}
        />
      );

    return (
      <View style={styles.main}>
        <ScrollView
          alwaysBounceVertical={'false'}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.header}>I am...</Text>
          {categories && this.createCategoryButtons(categories)}
        </ScrollView>
        <TouchableOpacity style={styles.OK} onPress={this.refreshRecommended}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F8FAFA',
    flex: 1
  },
  header: {
    position: 'absolute',
    color: '#6F6E6C',
    top: -60,
    fontFamily: 'Walsheim',
    fontSize: 36
  },
  container: {
    marginTop: 82,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  unselected: {
    alignSelf: 'flex-start',
    backgroundColor: '#C0C0C0',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginLeft: 3,
    marginRight: 3
  },
  selected: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFBF77',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginLeft: 3,
    marginRight: 3
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Walsheim',
    fontSize: 20
  },
  OK: {
    alignSelf: 'flex-end',
    backgroundColor: '#91C7A3',
    marginBottom: 15,
    borderRadius: 12,
    padding: 5,
    paddingHorizontal: 15,
    marginRight: 20
  }
});

const mapStateToProps = state => ({
  categories: state.pages.categoriesPage.categories.map(
    category_id => state.entities.categories[category_id]
  ),
  selectedCategories:
    state.entities.currentUser[state.pages.currentUserPage.currentUser].category
});

//state.pages.categoriesPage.selectedCategories,

const mapDispatchToProps = dispatch => ({
  getCurrentUserData: () => dispatch(getCurrentUserData()),
  getAllCategories: () => dispatch(getAllCategories()),
  selectACategory: category_id => dispatch(selectACategory(category_id)),
  deselectACategory: category_id => dispatch(deselectACategory(category_id)),
  getAllRecommendedItems: () => dispatch(getAllRecommendedItems())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesScreen);
