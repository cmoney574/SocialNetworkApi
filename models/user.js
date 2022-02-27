const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      friends:[{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

  userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  })

  const User = model('user', userSchema);
  
  module.exports = User;