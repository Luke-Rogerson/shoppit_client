import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CustomMultiPicker from 'react-native-multiple-select-list';

import { connect } from 'react-redux';

import { selectACategory, deselectACategory,  getAllCategories } from '../actions';

class CategoriesScreen extends React.Component {

  componentDidMount() {
    this.props.getAllCategories();
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log('PROPS: ', this.props);
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
            console.log(res);
            // if (res.length > this.props.selectedCategories) {
            //   const categoryId = res[res.length - 1];
            //   this.props.selectACategory(categoryId);
            // } else {
            //   const categoryId = this.props.selectedCategories.find(category => !res.includes(category.category_id)).category_id;
            //   this.props.deselectACategory(categoryId);
            // }
          }} // callback, array of selected items
          rowBackgroundColor={'#eee'}
          rowHeight={50}
          rowRadius={5}
          iconColor={'#00a2dd'}
          iconSize={30}
          selectedIconName={'ios-checkmark-circle-outline'}
          scrollViewHeight={300}
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

const mapStateToProps = (state) => ({
  // categoriesrytrryeert: state.categoriesPage
  categories: state.pages.categoriesPage.categories.map(category_id => (
    state.entities.categories[category_id]
  )),
  selectedCategories: state.pages.categoriesPage.selectedCategories
});

const mapDispatchToProps = (dispatch) => ({
  getAllCategories: () => dispatch(getAllCategories()),
  // selectACategory: () => dispatch(selectACategory()),
  // deselectACategory: () => dispatch(deselectACategory())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesScreen);
