import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import MoviesList from './src/MoviesList';
import * as API from './src/api/API';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: {}
    };
  }

  componentDidMount() {
    API.getMoviesHome()
    .then((json) => {
      // console.log('getMoviesHome ' + JSON.stringify(json.Movies_Banners, 2, null));

      this.setState({
        isLoading: false,
        dataSource: json.Movies_Banners
      })
    });

    API.getCategory(false)
    .then((json) => {
      console.log('getCategory ' + JSON.stringify(json, 2, null));
    });

    API.getCategoryDetail(75, 0, 3)
    .then((json) => {
      console.log('getCategoryDetail ' + JSON.stringify(json, 2, null));
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <MoviesList movies={this.state.dataSource} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
