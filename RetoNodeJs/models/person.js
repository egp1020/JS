const mongoose = require('mongoose');

Schema = mongoose.Schema;

let PersonSchema = new Schema({
    TypeDocument: {
        type: String,
        required: true,
    },
    Identification: {
        type: Number,
        required: true,
    },
    Names: {
        type: String,
        required: true,
    },
    LastNames: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    HomePhone: {
        type: String,
        required: true,
    },
    CellPhone: {
        type: String,
        required: true,
    },
    WebSite: {
        type: String,
        required: true,
    },
    ProfileDescription: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    }
});

module.exports = mongoose.model('inscripcion', PersonSchema);