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

  render() {
    if (!this.props.categories) return <Text>LOADING...</Text>;
    const categories = Object.values(this.props.categories);

    return (
      <View style={styles.main}>
        <ScrollView
          alwaysBounceVertical={'false'}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.header}>I am...</Text>
          {categories && this.createCategoryButtons(categories)}
        </ScrollView>
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
    top: -62,
    fontFamily: 'Walsheim',
    fontSize: 36
  },
  container: {
    marginTop: 210,
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
    backgroundColor: '#91C7A3',
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
