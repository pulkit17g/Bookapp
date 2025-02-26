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
import DatePicker from 'react-native-date-picker';
import AddBookModal from './AddBookModal';

interface Book {
  name: string;
  publishedDate: string;
  authorId?: string;
}

interface AddAuthorModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AddAuthorModal: React.FC<AddAuthorModalProps> = ({isModalOpen, setIsModalOpen}:{isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void}) => {
    const [date, setDate] = useState(new Date());
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
    const [authorName, setAuthorName] = useState("");
  return (
    <>
    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeader}>Add a New Author</Text>

        <Formik
          initialValues={{name: '', dateOfBirth: '', hometown: '', books: []}}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Author Name is required'),
            dateOfBirth: Yup.date(),
            hometown: Yup.string(),
            books: Yup.array().of(Yup.string()),

          })}
          onSubmit={values => {
            const submissionValues = {
              ...values,
              books: selectedBooks,
              dateOfBirth: values.dateOfBirth || date.toISOString().split('T')[0],
            };
            console.log('Form Submitted:', submissionValues);
            setSelectedBooks([]);
            
            setIsModalOpen(false);
          }}>
          {({handleChange, handleSubmit, values, errors, touched, setFieldValue,}) => (
            <>
              <Text style={styles.label}>Author Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Author Name"
                value={values.name}
                onChangeText={text => {
                    handleChange('name')(text);
                    setAuthorName(text); 
                  }}
              />
               <Text style={styles.label}>Publishing Date</Text>
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <DatePicker
              mode="date"
              date={date}
              onDateChange={date => {
                setDate(date);
                setFieldValue('dateOfBirth', date.toISOString().split('T')[0]);
              }}
            />
           </View>
           <Text style={styles.label}>Hometown</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Hometown"
                value={values.hometown}
                onChangeText={handleChange('hometown')}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
              <View style={styles.booksContainer}>
                <Text style={styles.booksLabel}>Books:</Text>
                <View style={styles.booksWrapper}>
                  {selectedBooks.map((book, index) => (
                    <View key={index} style={styles.bookChip}>
                      <Text style={styles.bookText}>{book.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
             <TouchableOpacity
                style={styles.submitButton}
                onPress={()=>{setIsBookModalOpen(true)}}>
                <Text style={styles.submitButtonText}>Add Books</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={()=>{handleSubmit()}}>
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
      <AddBookModal isModalOpen={isBookModalOpen} setIsModalOpen={setIsBookModalOpen} selectedBooks={selectedBooks} setSelectedBooks={setSelectedBooks} authorModal={true} authorName={authorName}/>
    </Modal>
    
    </>
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
  booksContainer: {
    marginVertical: 10,
  },
  booksLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  booksWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bookChip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  bookText: {
    fontSize: 14,
    color: '#333',
  },
});
