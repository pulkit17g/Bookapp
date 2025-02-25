import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { FlashList } from '@shopify/flash-list';
import BookCover from './assets/icons/bookCover.png';
const GET_BOOKS = gql`
  query GetBooks($limit: Int) {
    book_book(limit: $limit) {
      id
      name
      authorId
    }
  }
`;

export default function Books() {
  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: { limit: 20 }, // Fetch 20 books initially
    fetchPolicy: 'cache-first',
  });

  if (loading) return <ActivityIndicator size="large" color="#ed894e" />;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Books List</Text>
      <FlashList
        data={data?.book_book}
        keyExtractor={(item: any) => item.id}
        numColumns={2} // Ensure two books appear per row
        estimatedItemSize={100} // Optimize for performance
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            <Image source={BookCover} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  bookCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
    padding: 12,
    elevation: 3, // Adds a subtle shadow
  },
  bookImage: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
