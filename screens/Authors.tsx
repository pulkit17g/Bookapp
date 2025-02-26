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

export default function Authors() {
  const {data, loading, error} = useQuery(GET_AUTHORS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePress = () => setIsModalOpen(true);
  const bookIds = data?.author_author?.getAllBookIdFromAuthorId?.split(',');
  const noOfBooks = bookIds?.length;
  console.log(data);
  console.log(noOfBooks);

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

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add a New Author</Text>

          <Formik
            initialValues={{name: ''}}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Author Name is required'),
            })}
            onSubmit={values => {
              console.log('Form Submitted:', values);
              setIsModalOpen(false);
            }}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <>
                <Text style={styles.label}>Author Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Author Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalOpen(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContainer: {backgroundColor: 'white', padding: 20, borderRadius: 10, width:'80%', borderColor:'gray', borderWidth:1, elevation:3},
  modalHeader: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  label: {fontSize: 14, fontWeight: 'bold', marginTop: 10},
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#ed894e',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {color: 'white', textAlign: 'center', fontWeight: 'bold'},
  closeButton: {marginTop: 10},
  closeButtonText: {textAlign: 'center', color: '#ed894e', fontWeight: 'bold'},
});
