const Customer = require('../models/customerModel')

class CustomerController {
    static async create(req, res, next){
        try {
            const {name, address} = req.body
            let image = req.body.photo || req.file.cloudStoragePublicUrl
            let new_customer = await Customer.create({name, address, photo : image})

            res.status(201).json(new_customer)
            
        } catch (error) {
            next(error)
        }
    }
    
    static async findAll(req, res, next){
        try {
          let all_customer = await Customer.find()  
          res.status(200).json(all_customer)
        } catch (error) {
            next(error)
        }
    }
    
    static async findOne(req, res, next){
        try {
            let customer = await Customer.findById(req.params.id)
            res.status(200).json(customer)
        } catch (error) {
            next(error)
        }
    }
    
    static async update(req, res, next){
        try {
            let {name, address, photo} = req.body
            let obj = {}
            if(name) obj.name = name
            if(address) obj.address = address
            if(photo) obj.photo = photo
            if(req.file){
                if( req.file.cloudStoragePublicUrl) obj.photo =  req.file.cloudStoragePublicUrl
            }
            let upd_customer = await Customer.findByIdAndUpdate(req.params.id, obj, {new:true})
            res.status(200).json(upd_customer)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCustomer(req, res, next){
        try {
            let deleteCstmr = await Customer.findByIdAndDelete(req.params.id)
            res.status(200).json(deleteCstmr)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CustomerController