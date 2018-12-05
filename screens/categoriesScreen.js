import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import {
  getCurrentUserData,
  selectACategory,
  deselectACategory,
  getAllCategories
} from '../actions';

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
    const inCatList = this.state.selectedCategories.includes(id);

    let selectedCategories;
    if (inCatList) {
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

  render() {
    if (!this.props.categories) return <Text>LOADING...</Text>;
    const categories = Object.values(this.props.categories);

    return (
      <View style={styles.container}>
        <Text>I am...</Text>
        <View>{categories && this.createCategoryButtons(categories)}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 43
  },
  unselected: {
    backgroundColor: '#8f8f8f',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20
  },
  selected: {
    backgroundColor: '#FFBF77',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20
  },
  buttonText: {
    color: '#fff'
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
  deselectACategory: category_id => dispatch(deselectACategory(category_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesScreen);
