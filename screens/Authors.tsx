import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {FlashList} from '@shopify/flash-list';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {GET_AUTHORS} from '../schema/queries';
import Modal from '../component/Modal';
import AddAuthorModal from '../component/AddAuthorModal';

export default function Authors() {
  const {data, loading, error} = useQuery(GET_AUTHORS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePress = () => setIsModalOpen(true);

  console.log(data);

  if (loading) return <ActivityIndicator size="large" color="#ed894e" />;
  if (error)
    return <Text style={styles.errorText}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Authors List</Text>
      {/* <Text style={styles.totalAuthors}>
        Total Authors: {data?.author_author_aggregate?.aggregate?.count}
      </Text> */}

      <FlashList
        data={data?.author_author}
        keyExtractor={(item) => item.id}
        numColumns={1}
        estimatedItemSize={80}
        renderItem={({item}) => (
          <View style={styles.authorCard}>
            <Text style={styles.name}>Author Name: {item?.name}</Text>
            {item?.getAllBookIdFromAuthorId && <Text style={styles.name}>No of Books: {item?.getAllBookIdFromAuthorId.split(',').length}</Text>}
            {item.hometown && <Text style={styles.name}>Hometown: {item.hometown}</Text>}
            {item.Age && <Text style={styles.name}>Age: {item.Age}</Text>}
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Add Author</Text>
      </TouchableOpacity>
      <AddAuthorModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
  totalAuthors: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {fontSize: 14, color: 'red', textAlign: 'left', marginBottom: 5},
  authorCard: {
    margin: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    elevation: 3,
  },
  name: {fontWeight: 'bold'},
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
