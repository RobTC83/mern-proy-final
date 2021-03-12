const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = mongoose.Schema({
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
        unique: true
    },
    password: {
        type: String,
        required: true,
        trime: true
    },
    profilePictureUrl: String,
    incomeInfo: {
        type: Array
    },
    budgetInfo: {
        type: Array
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model('Users', UsersSchema)