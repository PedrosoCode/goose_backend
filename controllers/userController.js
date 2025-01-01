const mongoose = require('mongoose');

const collectionName = 'users';

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar se todos os campos necessários foram enviados
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos os campos (name, email, password) são obrigatórios." });
        }

        // Inserir o novo usuário na coleção 'users'
        const newUser = await mongoose.connection.collection(collectionName).insertOne({
            name: name,
            email: email,
            password: password,
            createdAt: new Date(), // Adicionando o campo createdAt
        });

        // Retornar a resposta com o id do novo usuário
        res.status(201).json({
            message: "Usuário criado com sucesso",
            userId: newUser.insertedId
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(400).json({ message: error.message });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const users = await mongoose.connection.collection(collectionName).find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await mongoose.connection.collection(collectionName).findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await mongoose.connection.collection(collectionName).updateOne(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (!user.matchedCount) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await mongoose.connection.collection(collectionName).deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (!user.deletedCount) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
