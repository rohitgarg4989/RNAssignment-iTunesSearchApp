/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {Image, Text} from 'react-native-elements';

const Details = ({route}) => {
  const {trackData} = route.params;

  let bannerUri = null;
  if (trackData.artworkUrl100) {
    const thumbNailType = trackData.artworkUrl100.split('.').pop();
    if (thumbNailType) {
      bannerUri =
        trackData.artworkUrl100.replace(/\/[^/]*$/, '/500x500') +
        '.' +
        thumbNailType;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerImageContainer}>
        <Image
          style={styles.image}
          source={{uri: bannerUri ? bannerUri : ''}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.detailsAndControlsContainer}>
        <ScrollView style={{flex: 1}}>
          <Text style={styles.detailsText}>
            Track Name - {trackData.trackName}
          </Text>
          <Text style={styles.detailsText}>
            Album Name - {trackData.collectionName}
          </Text>
          <Text style={styles.detailsText}>
            Artist - {trackData.artistName}
          </Text>
          <Text style={styles.detailsText}>Kind - {trackData.kind}</Text>
          <Text style={styles.detailsText}>
            Genre - {trackData.primaryGenreName}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  bannerImageContainer: {
    flex: 7,
  },
  detailsAndControlsContainer: {
    padding: 5,
    flex: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsText: {
    padding: 5,
  },
});

export default Details;
