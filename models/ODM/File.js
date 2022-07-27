const { Schema, model } = require('mongoose')

const fileSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    file_type: {
        type: String,
        required: [true, 'File type field is required'],
        enum: ['Suggar', 'Pressure', 'Other']
    },
    url: {
        type: String
    },
    patient_id: {
        type: Number
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

module.exports = model('File', fileSchema)