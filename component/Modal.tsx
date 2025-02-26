import {
  View,
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

const Modal = ({isOpen, withInput, children, ...props}: PROPS) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {children}
      </View>
    </KeyboardAvoidingView>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </View>
  );
  return (
    <RNModal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      statusBarTranslucent
      {...props}>
      {content}
    </RNModal>
  );
};

export default Modal;
