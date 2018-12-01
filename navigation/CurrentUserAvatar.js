import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';

class CurrentUserAvatar extends React.Component {
  render() {
    const { uri } = this.props;
    return (
      <Image
        source={{ uri }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 10,
          marginBottom: 10
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  const currentUserId = state.pages.currentUserPage.currentUser;
  const currentUser = state.entities.currentUser[currentUserId];
  return {
    uri: currentUser.avatar_url
  };
};
export default connect(mapStateToProps)(CurrentUserAvatar);
