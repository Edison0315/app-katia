const { Schema, model } = require('mongoose')

const newSchema = Schema({
    type : {
        type: String,
        required: [true, 'Type field is required']
    },
    level: {
        type: Number,
        required: [true, 'Level field is required']
    },
    date: {
        type: String,
        required: [true, 'Date field is required']
    },
    time: {
        type: String,
        required: [true, 'Time field is required']
    },
    comments : {
        type: String,
        required: [true, 'Comments field is required']
    },
    icon : {
        type: String,
        required: [true, 'Icon field is required']
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

newSchema.methods.toJSON = function(){
    const {  __v, _id, ...neww } = this.toObject()
    neww.uid = _id
    return neww
}

module.exports = model('New', newSchema)