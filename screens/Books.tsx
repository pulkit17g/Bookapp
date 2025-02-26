import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {FlashList} from '@shopify/flash-list';
import {Formik} from 'formik';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import BookCover from './../assets/icons/bookCover.png';
import {GET_BOOKS, GET_AUTHORS} from '../schema/queries';
import Modal from '../component/Modal';
import AddBookModal from '../component/AddBookModal';

export default function Books() {
  const {data, loading, error} = useQuery(GET_BOOKS, {
    variables: {limit: 20},
    fetchPolicy: 'cache-first',
  });


  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePress = () => setIsModalOpen(true);

  if (loading) return <ActivityIndicator size="large" color="#ed894e" />;
  if (error)
    return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Books List</Text>
      <Text style={styles.totalBooks}>
        Total Books: {data?.book_book_aggregate?.aggregate?.count}
      </Text>

      <FlashList
        data={data?.book_book}
        keyExtractor={(item: any) => item.id}
        numColumns={1}
        estimatedItemSize={100}
        renderItem={({item}) => (
          <View style={styles.bookCard}>
            <Image source={BookCover} style={styles.bookImage} />
            <View style={styles.details}>
              <Text style={styles.title}>Book Name: {item?.name}</Text>
              {item?.author?.name && (
                <Text style={styles.author}>Author: {item?.author?.name}</Text>
              )}
              {item.publishedDate && (
                <Text style={styles.date}>
                  Published: {item?.publishedDate}
                </Text>
              )}
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Add Book</Text>
      </TouchableOpacity>
      <AddBookModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
  totalBooks: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {fontSize: 14, color: 'red', textAlign: 'left', marginBottom: 5},
  bookCard: {
    flexDirection: 'row',
    margin: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    elevation: 3,
  },
  bookImage: {width: 60, height: 50, resizeMode: 'contain', marginBottom: 8},
  details: {flex: 1, marginLeft: 10},
  title: {fontWeight: 'bold'},
  author: {fontStyle: 'italic'},
  date: {fontSize: 12, color: 'gray'},
  button: {
    backgroundColor: '#ed894e',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    bottom:10,
    position:'absolute',
  },
  buttonText: {color: 'white', fontWeight: 'bold'},

});

// const pickerSelectStyles = {inputIOS: styles.input, inputAndroid: styles.input};
