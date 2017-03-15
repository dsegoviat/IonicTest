// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  document.addEventListener("deviceready", onDeviceReady, false);

  function setLocalStorage() {
    localStorage.setItem("name", "David");
    localStorage.setItem("job", "Developer");
    localStorage.setItem("project", "Cordova Project");
  }

  function showLocalStorage() {
    console.log(localStorage.getItem("name"));
    console.log(localStorage.getItem("job"));
    console.log(localStorage.getItem("project"));
  }

  function removeProjectFromLocalStorage() {
    localStorage.removeItem("project");
  }

  function getLocalStorageByKey() {
    console.log(localStorage.key(0));
  }

  function onDeviceReady() {
    document.getElementById("setLocalStorage").addEventListener(
      "click",
      setLocalStorage
    );

    document.getElementById("showLocalStorage").addEventListener(
      "click",
      showLocalStorage
    );

    document.getElementById("removeProjectFromLocalStorage").addEventListener(
      "click",
      removeProjectFromLocalStorage
    );

    document.getElementById("getLocalStorageByKey").addEventListener(
      "click",
      getLocalStorageByKey
    );

    document.getElementById("takePicture").addEventListener(
      "click",
      cameraTakePicture
    );
  }

  function cameraTakePicture() {
    console.log("Take a picture pressed");
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }
  }

});
