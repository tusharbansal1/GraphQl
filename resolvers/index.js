const User = require('../models/user')
const Post = require('../models/post')
const bcrpt = require("bcrypt")
const { Error } = require('mongoose')
const post = require('../models/post')

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

    createPost: async args => {
        try {
            const { body } = args.post
            const post = new Post({
                body
            })
            const newPost = await post.save()
            return {
                ...newPost._doc, _id: newPost._id
            }

        } catch (error) {
            throw error
        }

    },

    posts: async () => {
        try {
            const posts = await Post.find()
            return posts.map(post => {
                return {
                    ...post._doc,
                    body: post.body,
                    createdAt: new Date(post._doc.createdAt).toISOString(),
                }
            })

        }
        catch (error) {
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

    post: async (_id) => {
        try {
            const post = await Post.findById(_id)
            return {
                body: post.body
            }

        } catch (error) {
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
                },
                {new :true}
            )
            return {
                ...updateuser._doc,
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    updatePost: async args => {
        try {
            const { _id, body } = args.post
            const updatepost = await Post.findByIdAndUpdate({ _id: _id }, {
                body: body
            },{new :true})
            return{
                ...updatepost._doc
            }

        } catch (error) {
            throw error
        }

    },

    deleteUser: async (_id) => {
        try {
            const isUser = await User.findById(_id)
            if (!isUser) {
                throw new Error("user doesnot exists")
            }
            const deleteduser = await User.findByIdAndDelete(_id)
            return {
                ...deleteduser._doc,
                _id: deleteduser._id

            }
        } catch (error) {
            throw error
        }
    },
    deletePost: async (_id) => {
        try {
            const deletedpost = await Post.findByIdAndDelete(_id)
            return {
                ...deletedpost._doc,
                _id: deletedpost._id
            }

        } catch (error) {
            throw error
        }
    }
}

