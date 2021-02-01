import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import mapActions from '../redux/actions/mapActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Image, SearchBar, Text} from 'react-native-elements';

const DashBoard = ({navigation, executeGetSearchRequest, searchResponse}) => {
  const [searchTextState, setSearchTextState] = React.useState('');
  const [selectedEntityState] = React.useState('song');

  const updateSearch = (search) => {
    setSearchTextState(search);
  };

  const onSearchClick = () => {
    if (searchTextState) {
      executeGetSearchRequest(searchTextState, selectedEntityState);
    }
  };

  const onListItemClick = (item) => {
    navigation.navigate('Details', {trackData: item});
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.searchViewContainer}>
          <View style={styles.searchBtnContainer}>
            <SearchBar
              placeholder="Search Here..."
              onChangeText={updateSearch}
              onSubmitEditing={onSearchClick}
              value={searchTextState}
              returnKeyType="search"
            />
          </View>
        </View>
        {searchResponse ? (
          <FlatList
            initialNumToRender={
              searchResponse && searchResponse.resultCount
                ? searchResponse.resultCount
                : 0
            }
            data={
              searchResponse &&
              searchResponse.results &&
              Array.isArray(searchResponse.results)
                ? searchResponse.results
                : []
            }
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() => onListItemClick(item)}>
                <Image
                  style={styles.imageThumbnail}
                  source={{uri: item.artworkUrl100}}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </TouchableOpacity>
            )}
            numColumns={3}
            keyExtractor={(_item, index) => index}
          />
        ) : (
          <View style={styles.noResultContainer}>
            <Text> No result found</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  searchViewContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  searchBtnContainer: {flex: 7},
  listItemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  noResultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({mapReducer}) => {
  return {...mapReducer};
};
const mapDispatchToProps = (dispatch) => {
  const allActions = {...mapActions};
  return {...bindActionCreators(allActions, dispatch)};
};
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoard);
export default ConnectedComponent;
