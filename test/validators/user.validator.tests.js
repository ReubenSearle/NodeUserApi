var should = require('should');
var userValidator = require('../../validators/user.validator');

describe('api requests to', function() {

  describe('create a user', function() {

    it('should require a valid email address', function(done) {

      var badUserDetails = {
        email: 'testXXXtest.com',
        forename: 'test',
        surname: 'subject'
      };

      var err = function() {        
      };
      var next = function() { 
        throw new Error('Email validation malfunction.')           
      };

      userValidator.validateCreate(badUserDetails, err, next);

      done();
    });

    it('should require a valid forename', function(done) {

      var badUserDetails1 = {
        email: 'test@test.com',
        forename: '',
        surname: 'subject'
      };

      var badUserDetails2 = {
        email: 'test@test.com',
        forename: 'test000000000000000000000000000000000000000000000000000000000000' + 
        '00000000000000000000000000000000000000000000000000000000000000000000000000',
        surname: 'subject'
      };

      var err = function() {        
      };
      var next = function() {
        throw new Error('Forename validation malfunction.')           
      };

      userValidator.validateCreate(badUserDetails1, err, next);
      userValidator.validateCreate(badUserDetails2, err, next);

      done();
    });

    it('should not require a surname', function(done) {

      var goodUserDetails = {
        email: 'test@test.com',
        forename: 'test',
        surname: ''
      };

      var err = function() {   
        throw new Error('Surname validation malfunction.')  
      };
      var next = function() {                 
      };

      userValidator.validateCreate(goodUserDetails, err, next);      

      done();
    });

  });

});