import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
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
  componentDidMount() {
    this.props.getCurrentUserData();
    this.props.getAllCategories();

    console.log('-----🌟-----');
    console.log(this.props.selectedCategories);
  }

  handleButtonPress = id => {
    const inCatList = this.props.selectedCategories.includes(id);
    this.props.selectedCategories = inCatList
      ? [...this.props.selectedCategories.filter(catID => catID !== id)] // dispatch addCategory action here
      : [...this.props.selectedCategories, id]; // dispatch removeCategory action here
    console.log('😱 YOU CLICKED ON:');
    console.log(id);
    console.log('selectedCategories', this.props.selectedCategories);
    this.setSelectedColors(id);
  };

  setSelectedColors = id => {
    return this.props.selectedCategories.includes(id)
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
    const { navigate } = this.props.navigation;

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
    backgroundColor: '#6F6E6C',
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

// <CustomMultiPicker
// options={categories}
// multiple={true}
// returnValue={'value'}
// callback={res => {
//   const selectedCategories = res;
//   if (this.props.selectedCategories.length === 0 && res.length > 1) {
//     const categoryId =
//       selectedCategories[selectedCategories.length - 1];

//     this.props.selectACategory(categoryId);
//   } else if (
//     res.length === 1 &&
//     this.props.selectedCategories.length === 0
//   ) {
//     return;
//   }

//   const selectedItem = this.props.selectedCategories.reduce(
//     (acc, el) =>
//       !el || (el && selectedCategories.includes(el.toString()))
//         ? acc
//         : [...acc, el],
//     []
//   )[0];

//   if (!selectedItem) {
//     const categoryId =
//       selectedCategories[selectedCategories.length - 1];

//     this.props.selectACategory(categoryId);
//   } else {
//     this.props.deselectACategory(selectedItem);
//   }
// }}
// rowBackgroundColor={'#eee'}
// rowHeight={50}
// rowRadius={5}
// iconColor={'#00a2dd'}
// iconSize={30}
// selectedIconName={'ios-checkmark-circle-outline'}
// scrollViewHeight={SCREEN_HEIGHT - 180}
// />
