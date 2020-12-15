const moongose = require('mongoose')
const {Schema} = moongose

const budget = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    message: {
        type: String
    }
}, {
    timestamps: true
});

moongose.model('Budget', budget)