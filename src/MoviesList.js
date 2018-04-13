import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },

  movie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  avatar: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 25
  },

  name: {
    fontSize: 18,
    color: '#000'
  }
});

export default class MoviesList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    console.log('MoviesList ' + JSON.stringify(props.movies, 2, null));
    this.state = {
      ds: ds.cloneWithRows(props.movies)
    };
  }

  render() {
    return (
      <ListView
        dataSource = {this.state.ds}
        style={styles.list}
        renderRow={(movie) =>
          <View style={styles.movie}>
            <Image
              style={styles.avatar}
              source={{uri: movie.Cover}}
            />
            <Text style={styles.name}>
              {movie.MovieName}
            </Text>
          </View>
        }
      />
    );
  }
}
