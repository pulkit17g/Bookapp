import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Modal from './Modal';
const AddAuthorModal = ({isModalOpen, setIsModalOpen}:{isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void}) => {
  return (
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
  );
};

export default AddAuthorModal;

const styles = StyleSheet.create({
  errorText: {fontSize: 14, color: 'red', textAlign: 'left', marginBottom: 5},
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    elevation: 3,
  },
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
