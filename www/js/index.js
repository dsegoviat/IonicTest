// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    document.addEventListener("deviceready", onDeviceReady, false);

    function createFile() {
      var type = window.TEMPORARY;
      var size = 5 * 1024 * 1024;

      window.requestFileSystem(type, size, successFileSystem, failFileSystem);

      function successFileSystem(fs) {
        fs.root.getFile('log.txt', {create: true, exclusive: true}, function (fileEntry) {
          alert('File creation successfull!');
        }, failFileSystem);
      }

      function failFileSystem(error) {
        var msg = '';
        switch (error.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
          case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
          case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
          case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
          case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
          default:
            msg = 'Files has already been created';
            break;
        }
        alert('Error: ' + msg);
      }
    }

    function writeFile() {
      var type = window.TEMPORARY;
      var size = 5*1024*1024;

      window.requestFileSystem(type, size, successCallback, errorCallback);

      function successCallback(fs) {

        fs.root.getFile('log.txt', {create: true}, function (fileEntry) {
          fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
              alert('Write completed.');
            };

            fileWriter.onerror = function(e) {
              alert('Write failed: ' + e.toString());
            };

            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
            fileWriter.write(blob);
          }, errorCallback);
        }, errorCallback);
      }

      function errorCallback(error) {
        alert('Error: ' + error.code);
      }
    }

    function readFile() {
      var type = window.TEMPORARY;
      var size = 5*1024*1024;

      window.requestFileSystem(type, size, successCallback, errorCallback);

      function successCallback(fs) {

        fs.root.getFile('log.txt', {}, function (fileEntry) {
          fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function (e) {
              var textArea = document.getElementById('textArea');
              textArea.value = this.result;
            };

            reader.readAsText(file);


          }, errorCallback);
        }, errorCallback);

      }

      function errorCallback(error) {
        var textArea = document.getElementById('textArea');
        textArea.value = 'File does not exist.';
        alert('Error: ' + error.message);
      }

    }

    function deleteFile() {

      var type = window.TEMPORARY;
      var size = 5*1024;

      window.requestFileSystem(type, size, successCallback, errorCallback);

      function successCallback(fs) {

        fs.root.getFile('log.txt', {create: false}, function (fileEntry) {
          fileEntry.remove(function () {
            alert('Removed successfully');
          }, errorCallback)
        }, errorCallback)

      }

      function errorCallback(error) {
        alert(('Error: ' + error.message));
      }

    }

    function onDeviceReady() {
      document.getElementById("createFile").addEventListener(
        "click",
        createFile
      );

      document.getElementById("writeFile").addEventListener(
        "click",
        writeFile
      );

      document.getElementById("readFile").addEventListener(
        "click",
        readFile
      );

      document.getElementById("deleteFile").addEventListener(
        "click",
        deleteFile
      );
    }


  });
