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
  selectACategory,
  deselectACategory,
  getAllCategories
} from '../actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class CategoriesScreen extends React.Component {
  componentDidMount() {
    this.props.getAllCategories();
    // console.log('----------');
    // console.log(this.props.currentUser);
  }

  dispatchButtonPress = id => {
    console.log('😱 YOU CLICKED ON:');
    console.log(id);
  };

  checkSelectedCats = id => {
    // ooooo
  };

  createCategoryButtons = catArray => {
    return catArray.map(cat => {
      return (
        <TouchableOpacity
          key={cat.category_id}
          title={cat.category_name}
          onPress={() => this.dispatchButtonPress(cat.category_id)}
          style={styles.unselected}
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
    backgroundColor: '#FFBF77'
  },
  buttonText: {
    color: '#fff'
  }
});

const mapStateToProps = state => ({
  categories: state.pages.categoriesPage.categories.map(
    category_id => state.entities.categories[category_id]
  ),
  selectedCategories: state.pages.categoriesPage.selectedCategories,
  currentUser:
    state.entities.currentUser[state.pages.currentUserPage.currentUser]
});

const mapDispatchToProps = dispatch => ({
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
