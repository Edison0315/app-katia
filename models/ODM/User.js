const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender field is required'],
        enum: ['Male', 'Female', 'Other']
    },
    phone: {
        type: String,
        required: [true, 'Phone field is required']
    },
    birthdate: {
        type: String,
        required: [true, 'Birthdate field is required']
    },
    patient_id: {
        type: Number,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }, 
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
})

module.exports = model('User', UserSchema)