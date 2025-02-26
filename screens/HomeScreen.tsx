import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Books from './../assets/icons/books.png';
import BookCover from './../assets/icons/bookCover.png';
import {useQuery, gql} from '@apollo/client';

const HomeScreen = () => {
  const GET_BOOKS = gql`
    query MyQuery {
  book_book {
    authorId
    id
    name
    publishingDate
    author {
      name
    }
  }
}

  `;
  const {data, loading, error, fetchMore} = useQuery<any>(GET_BOOKS, {
    variables: {limit: 5},
    fetchPolicy: 'cache-and-network',
  });

  if (error) return <Text>Error: {error.message}</Text>;

  console.log(data);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor="#ed894e" barStyle="light-content" />

        {/* Hamburger Menu Button */}
        <TouchableOpacity style={styles.hamburger}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>

        {/* Curved Header */}
        <View style={styles.header}>
          <Image source={Books} />
          <Text style={styles.title}>BOOOKOR</Text>
        </View>
        <View style={{marginTop: 24, paddingLeft: 8}}>
          <Text style={styles.sectionHeading}>Recommended Books</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#ed894e" />
          ) : (
            <FlatList
              data={data?.book_book}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 16}}
              renderItem={({item}) => (
                <View style={styles.bookContainer}>
                  <Image source={BookCover} style={styles.bookCover} />

                  <Text style={styles.cardDetail}>{item.name}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  hamburger: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 10,
  },
  hamburgerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  header: {
    height: '40%',
    backgroundColor: '#ed894e',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionHeading: {
    fontSize: 24,
    color: 'black',
  },
  bookContainer: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
  },
  bookCover: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  cardDetail: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
