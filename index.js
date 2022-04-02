/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { I18nManager } from "react-native";
//import RNRestart from "react-native-restart";

//I18nManager.allowRTL(false);
I18nManager.forceRTL(false);


AppRegistry.registerComponent(appName, () => App);
