const User = require('../models/user')
const bcrpt = require("bcrypt")
const { Error } = require('mongoose')

module.exports = {
    createUser: async args => {
        try {
            const { firstName, lastName, number, email, address, password } = args.user
            const isUser = await User.findOne({ email })
            if (isUser) {
                throw new Error("user already exists")
            }

            let pwd = await bcrpt.hash(password, Number(10))
            const user = new User({
                firstName,
                lastName,
                number,
                email,
                address,
                password: pwd
            })
            const newUser = await user.save()
            return { ...newUser._doc, _id: newUser.id, password: "" }
        } catch (error) {
            throw error
        }
    },

    users: async () => {
        try {
            const users = await User.find()
            return users.map(user => {
                return {
                    // ...user._doc,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    number: user.number,
                    email: user.email,
                    address: user.address,
                    password: "",
                    createdAt: new Date(user._doc.createdAt).toISOString(),
                    updatedAt: new Date(user._doc.updatedAt).toISOString(),
                }
            })
        } catch (error) {
            throw error
        }
    },
    user: async (_id) => {
        try {
            const users = await User.findById(_id)
            return {
                firstName: users.firstName,
                lastName: users.lastName,
                number: users.number,
                email: users.email,
                address: users.address,
                password: "",
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    updateUser: async args => {
        try {
            const { _id, firstName, lastName, number, address, email } = args.user
            const updateuser = await User.findByIdAndUpdate({ _id: _id },
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    number: number,
                    address: address
                }
            )
            return `User ${updateuser.id} updated successfully`
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    deleteUser: async (_id) =>{
        try {
            const isUser = await User.findById(_id)
            if(!isUser){
                throw new Error("user doesnot exists")
            }
            const deleteduser= await User.findByIdAndDelete(_id)
            return{
                ...deleteduser._doc,
                _id:deleteduser._id
                
            }
        } catch (error) {
            throw error
        }
    }
}

