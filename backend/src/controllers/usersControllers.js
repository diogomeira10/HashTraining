const Users = require("../models/userModel")
const Session = require("../models/sessionModel")
const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid')

/* const bcrypt = require('bcrypt'); */

const userSignUp = async (req, res) => {
    const { username, password, passwordConfirmation, profileImage} = req.body;


    const hasUsername = await Users.findOne({ username });
   

    if (hasUsername) {
        return res.status(400).json({ message: 'Os dados introduzidos não são válidos.', errors: { username: 'O endereço introduzido já está registado.' } });
    }

  
    if (password !== passwordConfirmation) {
        return res.status(400).json({ message: 'Os dados introduzidos não são válidos.', errors: { passwordConfirmation: 'As passwords não coincidem.' } });
    }

    try {
        console.log(1)
        const user = await Users.create({ username, password, passwordConfirmation, profileImage});
        res.status(201).json({messsage:"Utilizador criado com sucesso","_id": user._id});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(2)
    }
}


const userLogin = async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: 'O utilizador não foi encontrado!' });
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'A password introduzida é inválida!' });
    }

    const token = uuidv4();

    await Session.create({ userId: user._id, token });

    res.status(200).json({ _id: user._id, token });
}



const getUser = async (req, res) => {
   
    const token = req.headers.authorization;
    console.log(token)

   
    if (!token) {
        return res.status(401).json({ message: 'Não foi enviado o token de autenticação!' });
    }


    const session = await Session.findOne({ token });


    if (!session) {
        return res.status(403).json({ message: 'Não existe nenhuma sessão com o token indicado!' });
    }

  
    const user = await Users.findById(session.userId);

  
    if (!user) {
        return res.status(404).json({ message: 'O utilizador não foi encontrado!' });
    }

   
    res.status(200).json({ _id: user._id, email: user.email });
}



const getUserById = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Não foi enviado o token de autenticação!' });
    }

    const session = await Session.findOne({ token });

    if (!session) {
        return res.status(403).json({ message: 'Não existe nenhuma sessão com o token indicado!' });
    }

    const sameUser = session.userId === id;


    res.status(200).json({ sameUser });
};


const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    userSignUp,
    userLogin,
    getUser,
    getUserById,
    getAllUsers
}