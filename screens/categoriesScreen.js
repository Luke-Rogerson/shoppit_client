import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import CustomMultiPicker from 'react-native-multiple-select-list';

import { connect } from 'react-redux';

import {
  selectACategory,
  deselectACategory,
  getAllCategories
} from '../actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class CategoriesScreen extends React.Component {
  componentDidMount() {
    this.props.getAllCategories();
  }

  render() {
    const { navigate } = this.props.navigation;

    if (!this.props.categories) return <Text>LOADING...</Text>;
    const categories = this.props.categories.reduce(
      (accum, category) => ({
        ...accum,
        [category.category_id]: category.category_name
      }),
      {}
    );

    return (
      <View style={styles.container}>
        <CustomMultiPicker
          options={categories}
          multiple={true}
          returnValue={'value'}
          callback={res => {
            const selectedCategories = res;
            if (this.props.selectedCategories.length === 0 && res.length > 1) {
              const categoryId =
                selectedCategories[selectedCategories.length - 1];

              this.props.selectACategory(categoryId);
            } else if (
              res.length === 1 &&
              this.props.selectedCategories.length === 0
            ) {
              return;
            }

            const selectedItem = this.props.selectedCategories.reduce(
              (acc, el) =>
                !el || (el && selectedCategories.includes(el.toString()))
                  ? acc
                  : [...acc, el],
              []
            )[0];


            if (!selectedItem) {
              const categoryId =
                selectedCategories[selectedCategories.length - 1];

              this.props.selectACategory(categoryId);
            } else {
              // const categoryId = selectedCategories.find(
              //   category_id =>
              //     !this.props.selectedCategories.includes(
              //       category_id.toString()
              //     )
              // );
              this.props.deselectACategory(selectedItem);
            }
          }} // callback, array of selected items
          rowBackgroundColor={'#eee'}
          rowHeight={50}
          rowRadius={5}
          iconColor={'#00a2dd'}
          iconSize={30}
          selectedIconName={'ios-checkmark-circle-outline'}
          scrollViewHeight={SCREEN_HEIGHT - 180}
        />
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
    flexDirection: 'column',
    textTransform: 'capitalize'
  }
});

const mapStateToProps = state => ({
  categories: state.pages.categoriesPage.categories.map(
    category_id => state.entities.categories[category_id]
  ),
  selectedCategories: state.pages.categoriesPage.selectedCategories
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
