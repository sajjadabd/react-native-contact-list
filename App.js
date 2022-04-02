/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { useState , useRef , useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button ,
  TouchableOpacity,
  Linking,
  Image ,
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';




import Header from './components/Header';
import ContactList from './components/ContactList';

import SQLite from 'react-native-sqlite-storage';

import SwitchContainer from './components/SwitchContainer';


const db = SQLite.openDatabase(
  {
    name: 'contacts.db',
    createFromLocation: 2,
  },
  () => { 
    console.log('database opened');
  },
  (error) => {
    console.log('error opening database' , error);
  }
);

const createTable = () => {
  db.transaction(
    tx => {
      tx.executeSql(
        `create table if not exists contacts 
        ( 
          id integer primary key not null, 
          name text, 
          phone text
        )`
      );
    }
  );
};


const addConatctToTable = (name , phone) => {

  console.log(`add ${name} ${phone} to table`);

  db.transaction(
    tx => {
      tx.executeSql(
        `insert into contacts 
        (name , phone) 
        values (?,?)`
        , [name , phone]
      );
    }
  );
};


// edit a contact in table
const editContact = (id , name , phone) => {
  db.transaction(
    tx => {
      tx.executeSql(
        `update contacts
        set name = ? , phone = ?
        where id = ?`
        , [name , phone , id]
      );
    }
  );
};







const App = () => {

  /*
  const getData = async () => {

    const myPromise = new Promise((resolve, reject) => {  

      console.log(`fetch data from database...`);
      let contacts = []
      db.transaction(
        tx => {
          tx.executeSql(
            `select * from contacts`
            , [], 
            (_, { rows }) => {
              for(let i=0;i<rows.length;i++) {
                console.log(rows.item(i).phone);
                contacts = [...contacts , rows.item(i)];
              }
            }
          );
        }
      );

      resolve(contacts);// resolve the promise


    }). then(contacts => {
      console.log(`...data fetched...`);
      console.log(contacts);
      setContacts(contacts);
    });
    
    
    
  };
  */

  const [loading , setLoading] = useState(true);


  async function getData() {

    let promise = new Promise((resolve, reject) => {
      
      console.log(`fetch data from database...`);
      let contacts = []

      // truncate contacts table
      // db.transaction(
      //   tx => {
      //     tx.executeSql(
      //       `delete * from contacts`
      //     );
      //   }
      // );

      

      db.transaction(
        tx => {
          tx.executeSql(
            `select * from contacts`
            , [], 
            (_, { rows }) => {
              for(let i=0;i<rows.length;i++) {
                console.log(rows.item(i));
                contacts = [...contacts , rows.item(i)];
              }
              resolve(contacts);
            }
          );
        }
      );

    }).then(contacts => { 
      let reverseContacts = contacts.reverse();
      setContacts(reverseContacts);
      //setLoading(false);
    }).catch(error => {
      console.log(error);
      //setLoading(false);
    });

  
    //let result = await promise; // wait until the promise resolves (*)
    //console.log(`result : ` , result);

  }
  
  
  


  useEffect( () => {

    

    async function fetchData() {
      let res = await getData();
    }
    fetchData();
    createTable();
    setLoading(false);
  } , [] );



  


  const initiateWhatsApp = (phoneNumber) => {
    //return;
    let url;
    // send to telegram or whwtsapp based on switchValue
    if(switchValue == false) {
      url = `tg://resolve?domain=${phoneNumber}`;
      //url = `https://t.me/` + phoneNumber ;
    } else {
      url = 'https://wa.me/' + phoneNumber ;
    }


    //let url = 'https://wa.me/' + phoneNumber ;


    Linking.openURL(url)
      .then((data) => {
        console.log('Messenger Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };


  const deleteContact = (contact) => {
    //return;
    setContacts(contacts.filter(c => c.phone !== contact.phone));

    console.log(`delete ${contact.phone} from table`);
    // remove from database
    db.transaction(
      tx => {
        tx.executeSql(
          `delete from contacts where phone = ?`
          , [contact.phone]
        );
      }
    );
  }

  //chech phone number not in contacts
  const notInContacts = (phone) => {
    return contacts.filter(c => c.phone === phone).length === 0;
  }

  const addNewContact = () => {
    if(phone == '') {
      return ;
    }

    //check phone regular expression
    /*
    let phoneRegex = /^[0-9]{10}$/;
    if(!phoneRegex.test(phone)) {
      alert('Phone number is not valid');
      return ;
    }
    */

    let newPhone ;

    // if phone starts with 0 
    if(phone.startsWith('0')) {
      newPhone = convertPhone(phone);
    } else {
      newPhone = phone;
    }

    if( notInContacts(newPhone) == true ) {
      // remove 0 from phone and add +98
      setContacts([{ name , phone : newPhone } , ...contacts]);
      addConatctToTable(name ,newPhone);
      setPhone('');
      setName('');
    } else {
      // edit contact
      let contact = contacts.filter(c => c.phone === newPhone)[0];
      //edit contact in array 
      setContacts(contacts.map( c => {
          // c.phone === newPhone ? { name , phone : newPhone } : c)
          if(c.phone === newPhone) {
            return { name , phone : newPhone };
          } else {
            return c;
          }
        }) 
      );
      //edit contact in database
      editContact(contact.id , name , newPhone);
      setPhone('');
      setName('');
    }
    
  }

  const convertPhone = (phone) => {
    let newPhone;
    if(phone.startsWith('0')) {
      newPhone = phone.replace(/^0/ , '');
      newPhone = '+98' + newPhone;
    } else {
      newPhone = phone;
    }

    return newPhone;
  }



  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [phone , setPhone] = useState('');

  const [name , setName] = useState('');

  const [contacts , setContacts] = useState([]);

  const [switchValue, setSwitchValue] = React.useState(true);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <SwitchContainer 
          switchValue={switchValue}
          setSwitchValue={setSwitchValue}
        />
        {
          loading ?
          <View style={[styles.centerContainer]}>
            <ActivityIndicator 
              size="large" 
              color={Colors.primary} 
            />
          </View>
          :
          contacts.length > 0 ?
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.body}
          >
            <ContactList 
              contacts={contacts}
              setContacts={setContacts}
              setName={setName}
              setPhone={setPhone}
              deleteContact={deleteContact}
              initiateWhatsApp={initiateWhatsApp}
              backgroundStyle={backgroundStyle}
            /> 
          </ScrollView>
          :
          <View style={[styles.centerContainer]}>
            <Text style={styles.text}>
              No contacts yet
            </Text>
          </View>
        }

      

      <Header 
        phone={phone}
        setPhone={setPhone}
        name={name}
        setName={setName}
        contacts={contacts}
        setContacts={setContacts}
        notInContacts={notInContacts}
        convertPhone={convertPhone}
        addConatctToTable={addConatctToTable}
        addNewContact={addNewContact}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body : {
    flex: 1,
    backgroundColor: '#001219',
  },
  centerContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text : {
    fontSize: 14,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
