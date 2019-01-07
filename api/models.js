const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');


//User Schema
const UserSchema = new Schema({
    firstName: { 
        type: String,
        required: [true, 'First name is required!'] 
    },
    lastName: { 
        type: String,
        required: [true, 'Last name is required!'] 
    },
    emailAddress: {
        type: String,
        unique: true, //checks if the email address exists already
        validate: { //checks for proper email format
            validator: function(email) {
              return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
          },
        required: [true, 'Email address is required!']
    },
    password: { 
        type: String,
        required: [true, 'Password is required!'] 
    },
});



//hashing password with bcrypt before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

//Course schema
const CourseSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, ref: 'User',
        required: [true, 'User is requied!'] 
    },
    title: { 
        type: String,
        required: [true, 'Title is required!'] 
    },
    description: { 
        type: String,
        required: [true, 'Description is required!'] 
    },
    estimatedTime: String,
    materialsNeeded: String
});

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = [User, Course];
