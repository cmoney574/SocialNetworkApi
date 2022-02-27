const { Schema, model } = require('mongoose');
const Reaction = require('./reaction')

const thoughtSchema = new Schema(
    {
      reactions: [Reaction],
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

  thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  })
  
  const Thought = model('thought', thoughtSchema);
  
  module.exports = thoughtSchema;