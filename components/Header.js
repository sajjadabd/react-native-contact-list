import React , { useRef } from 'react'

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';



const Header = ({
  phone , 
  setPhone ,
  name ,
  setName ,
  contacts ,
  setContacts ,
  notInContacts ,
  convertPhone ,
  addConatctToTable ,
  addNewContact ,
}) => {

  const phoneRef = useRef(null);
  

  return (
    <View style={styles.header}>
        <View style={styles.headerBottom}>
        <TextInput
            value={name}
            style={[styles.textInput]}
            placeholder="name"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            // focus on phone input after submit
            onSubmitEditing={() => phoneRef.current.focus()}
            onChangeText={text => {
              setName(text);
            }}
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              // clear the input
              setName('');
              // clear phone
              setPhone('');
            }}
          >
            {/* <Text style={styles.buttonText}>CLEAR</Text> */}
            <Image
              source={require('../images/clean.png')}
              style={styles.clearButtonImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottom}>
          <TextInput
            value={phone}
            style={
              notInContacts(convertPhone(phone)) ?
              [styles.phoneInput] :
              [styles.phoneInput , styles.textInputError]
            }
            placeholder="phone number"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="phone-pad"
            ref={phoneRef}
            autoFocus = {true}
            onChangeText={text => {
              setPhone(text);
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              addNewContact();
            }}
          >
            <Text style={styles.buttonText}>
              {
                notInContacts(convertPhone(phone)) ?
                'Add Contact' :
                'Edit Contact'
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  header : {
    flexDirection: 'column',
    borderTopColor: '#264653',
    borderTopWidth: 1,
  },
  headerBottom : {
    flexDirection: 'row',
    borderTopColor: '#264653',
    borderTopWidth: 1,
  },
  textInput : { 
    flex : 1,
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  phoneInput : { 
    flex : 1,
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,

  },
  textInputError : {
    backgroundColor: '#e63946',
  },
  buttonText : {
    fontSize: 17,
  },
  button : {
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: 5,
    backgroundColor : '#264653',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  clearButton : {
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: 5,
    backgroundColor : '#264653',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  clearButtonImage : {
    width: 30,
    height: 30,
     
  },
});

export default Header