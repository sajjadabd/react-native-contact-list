import React from 'react'

import {
  View,
  Text ,
  StyleSheet,
  Image ,
} from 'react-native'

import { Switch } from 'react-native-switch';




const SwitchContainer = ({
  switchValue,
  setSwitchValue,
}) => {

  const [isEnabled, setIsEnabled] = React.useState(false);

  

  const IconInsideCircle = () => {
    return (
      <View>
        {/* <Text>
          { switchValue ? 'WhatsApp' : 'Telegram' }
        </Text> */}
        <Image
          source={ 
            switchValue ? 
            require('../images/whatsapp.png') : 
            require('../images/telegram.png') 
          }
          style={{ width: 50, height: 50 }}
        />
      </View>
    );
  };

  return (
    <View style={styles.switchWrapper}>

      <Text
        style={styles.switchText}
      >
        Send Message To
      </Text>

    <Switch
        style={styles.switch}
        value={switchValue}
        onValueChange={(val) => setSwitchValue(val)}
        disabled={false}
        activeText={'On'}
        inActiveText={'Off'}
        circleSize={70}
        barHeight={50}
        circleBorderWidth={0}
        backgroundActive={'#075e54'}
        backgroundInactive={'#0076ba'}
        circleActiveColor={'#25d366'}
        circleInActiveColor={'#0088cc'}
        renderInsideCircle={() => <IconInsideCircle />} // custom component to render inside the Switch circle (Text, Image, etc.)
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
        outerCircleStyle={{}} // style for outer animated circle
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
      />

    </View>
  )
}


const styles = StyleSheet.create({
  switch : {
    marginHorizontal: 20,
  },
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    //backgroundColor: '#eee',
  },
  switchText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
  },
});


export default SwitchContainer