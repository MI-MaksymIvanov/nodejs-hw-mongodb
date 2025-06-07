import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    // name - string, required
    // phoneNumber - string, required
    // email - string
    // isFavourite - boolean, default false
    // contactType - string, enum(’work’, ‘home’, ‘personal’), required, default ‘personal’

    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    photo: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Contact = mongoose.model('Contact', contactSchema);
