import React from 'react'

import {
  View , 
  Text , 
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'

const ContactList = ({
  contacts,
  setContacts,
  setName,
  setPhone,
  deleteContact,
  initiateWhatsApp ,
  backgroundStyle
}) => {

  const createTwoButtonAlert = (contact) =>
    Alert.alert(
      "Deleting Contact",
      "Are You sure delete this contact?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteContact(contact) }
      ]
    );


  return (
    <View
      style={[styles.wrapper, backgroundStyle]}
    >
        {contacts.map( contact => (
          <View 
            key={Math.random()}
          >
            <View style={styles.contactContainer}>
              <TouchableOpacity
                style={styles.deleteContainer}
                onPress={() => {
                  createTwoButtonAlert(contact);
                }}
              >
                <Image 
                  style={styles.deleteImage}
                  source={require('../images/delete.png')} 
                />
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.editContainer}
                onPress={() => {
                  setName(contact.name);
                  setPhone(contact.phone);
                }}
              >
                
                <Image 
                  style={styles.editImage}
                  source={require('../images/edit.png')} 
                />

              </TouchableOpacity>


              <TouchableOpacity
                style={styles.eachContact}
                onPress={() => initiateWhatsApp(contact.phone)}
              >
                
                <View style={styles.information}>
                  <Text style={styles.infoText}>{contact.name == '' ? '...' : contact.name  }</Text>
                  <Text style={styles.infoText}>{contact.phone}</Text>
                </View>

                <Image 
                  source={require('../images/user.png')} 
                  style={styles.image}
                />

              </TouchableOpacity>
 

            </View>
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper : {
    flex: 1,
    backgroundColor: '#eee',
  },
  text : {
    fontSize: 16,
    color : '#fff',
  },
  infoText : {
    fontSize: 16,
    color : '#fff',
    padding: 5,
  },
  image : {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 15,
    marginRight: 20,
  },
  contactContainer : {
    flex : 1,
    flexDirection : 'row',
    //backgroundColor : '#00b4d8',
    //borderBottomWidth : 2,
    //borderBottomColor : '#edf2f4',
  },
  eachContact : {
    flex : 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor : '#bb3e03',
  },
  information : {
    flex: 1,
    //backgroundColor: '#669bbc',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  deleteContainer : {
    //backgroundColor: '#d62828',
    //backgroundColor: 'rgba(214, 40, 40, .5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  editContainer : {
    //backgroundColor: '#48cae4',
    //backgroundColor: 'rgba(72, 202, 228, .5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  deleteImage : {
    width: 20,
    height: 20,
  },
  editImage : {
    width: 30,
    height: 30,
  },
  backgroundStyle : {
    flex: 1,
  },
});

export default ContactList