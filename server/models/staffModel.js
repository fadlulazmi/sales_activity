const mongoose = require('mongoose');
const {Schema} = mongoose;
const Helper = require('../helpers/helper')

const staffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: function(value) {
                    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                        throw 'Invalid email format'
                    }
                },
            },
            {
                validator: async function(value) {
                    try{
                        let stf = await Staff.find({
                            _id: { $ne: this._id },
                            email: value
                        })

                        if(stf.length !== 0) {
                            throw 'Email has been registered';
                        }
                    }
                    catch(err) {
                        throw err;
                    }
                }
            }
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password min length is 4'],
    },
    address: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    }
});

staffSchema.pre('save', async function(next, done) {
    try {
        let logged_staff = await Staff.findOne({email : this.email})
        if(!logged_staff){
            this.password = Helper.hashPassword(this.password)
        }
        next()
    } catch (error) {
        next(error)
    }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff