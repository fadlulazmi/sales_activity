const Staff = require('../models/staffModel')
const {comparePassword, generateJWT} = require('../helpers/helper')

class StaffController {
    
    static async register(req, res, next){
       try {
           const {name, email, password, company, address} = req.body
           let image = req.body.photo || req.file.cloudStoragePublicUrl
           let new_staff = await Staff.create({
               name, email, password, company, address,
               photo : image
            })
            console.log('new_staff: ', new_staff);
            res.status(201).json(new_staff)
       } catch (error) {
           next(error)
       } 
    }

    static async login(req, res, next){
        try {
            const {email, password} = req.body
            let log_staff = await Staff.findOne({email})
            if(!log_staff){
                next({msg : 'wrong email / password'})
            } else {
                if(comparePassword(password, log_staff.password)){
                    log_staff._doc.token = generateJWT({...log_staff._doc})
                    console.log('log_staff: ', log_staff);
                    res.json(log_staff)
                } else {
                    next({msg : 'wrong email / password'})
                }
            }
        } catch (error) {
            next(error)
        } 
    }
    
    static async findAll(req, res, next){
        try {
            let staffs = await Staff.find({})
            res.json(staffs)
        } catch (error) {
            next(error)
        }
    }
    
    static async findOne(req, res, next){
        try {
            let staff = await Staff.findById(req.params.id)
            res.json(staff)
        } catch (error) {
            next(error)
        }
    }
    
    static async update(req, res, next){
        try {
            let {name, email, company, address, photo, password} = req.body
            let obj = {}

            if (name) obj.name = name
            if (email) obj.email = email
            if (company) obj.company = company
            if (address) obj.address = address
            if (photo) obj.photo = photo
            if (password) obj.password = password

            if(req.file){
                console.log('========================');
                if( req.file.cloudStoragePublicUrl) obj.photo =  req.file.cloudStoragePublicUrl
            }
            let staff = await Staff.findByIdAndUpdate(req.params.id, obj, {new : true})
            res.json(staff)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next){
        try {
            let staff = await Staff.findByIdAndDelete(req.params.id)
            res.json(staff)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = StaffController