"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeApp = void 0;

var _googleSignin = require("@react-native-google-signin/google-signin");

var _Credentials = require("./Credentials");

var initializeApp = function initializeApp() {
  _googleSignin.GoogleSignin.configure(); // GoogleSignin.configure({
  //     webClientId: googleCredentials.clientId,
  // });

};

exports.initializeApp = initializeApp;