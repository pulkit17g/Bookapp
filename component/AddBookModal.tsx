import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
import React, { useState } from 'react'
import Modal from './Modal';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GET_AUTHORS } from '../schema/queries';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import { useQuery } from '@apollo/client';

interface AddBookModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedBooks: any[];  // replace 'any' with your book type if available
  setSelectedBooks: (books: any[]) => void;
  authorModal?: boolean;
  authorName?: string;
}

interface BookFormValues {
  name: string;
  publishedDate: string;
  authorId: string;
  author?: string;
}

const AddBookModal: React.FC<AddBookModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedBooks,
  setSelectedBooks,
  authorModal,
  authorName
}) => {
    const {data: authorsData} = useQuery(GET_AUTHORS);
    console.log(authorsData);
    const [_datePickerVisible, setDatePickerVisible] = useState(false);
    const [date, setDate] = useState(new Date());
  
    const authorOptions =
      authorsData?.author_author?.map((author: { id: string; name: string }) => ({
        label: author.name,
        value: author.id,
      })) || [];
  return (
    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalHeader}>Add a New Book</Text>

      <Formik<BookFormValues>
        initialValues={{
          name: '',
          publishedDate: '',
          authorId: authorName ? 'preset' : '',
          author: authorName || ''
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Book Name is required'),
          publishedDate: Yup.string().required('Publishing Date is required'),
          authorId: authorName ? Yup.string() : Yup.string().required('Author is required'),
        })}
        onSubmit={values => {
          const submissionValues = {
            ...values,
            author: authorName || values.author,
          };
          console.log('Form Submitted:', submissionValues);
          setIsModalOpen(false);
          if(authorModal){
            setSelectedBooks([...selectedBooks, submissionValues]);
          }
        }}>
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
            <Text style={styles.label}>Book Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Book Name"
              value={values.name }
              onChangeText={handleChange('name')}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <Text style={styles.label}>Publishing Date</Text>
            {/* <TouchableOpacity
              style={styles.input}
              onPress={() => setDatePickerVisible(true)}>
              <Text>{values.publishedDate || 'Select Date'}</Text>
            </TouchableOpacity> */}
            {touched.publishedDate && errors.publishedDate && (
              <Text style={styles.errorText}>{errors.publishedDate}</Text>
            )}
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <DatePicker
              mode="date"
              date={date}
              onDateChange={date => {
                setDate(date);
                setFieldValue('publishedDate', date.toISOString().split('T')[0]);
                setDatePickerVisible(false);
              }}
            />
           </View>

            <Text style={styles.label}>Author</Text>
            {authorName ? (
              <View style={styles.input}>
                <Text>{authorName}</Text>
              </View>
            ) : (
              <RNPickerSelect
                onValueChange={value => setFieldValue('authorId', value)}
                items={authorOptions}
                style={pickerSelectStyles}
                placeholder={{label: 'Select an author', value: ''}}
              />
            )}
            {touched.authorId && errors.authorId && (
              <Text style={styles.errorText}>{errors.authorId}</Text>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmit()}>
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
  )
}

export default AddBookModal

const styles = StyleSheet.create({
    errorText: {fontSize: 14, color: 'red', textAlign: 'left', marginBottom: 5},
    modalContainer: {backgroundColor: 'white', padding: 20, borderRadius: 10, paddingHorizontal:40, width:'80%', borderColor:'gray', borderWidth:1, elevation:3},
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
})

const pickerSelectStyles = {inputIOS: styles.input, inputAndroid: styles.input};