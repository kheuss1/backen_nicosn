const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createAdmin = async (req, res) => {
    const { prenom, nom, email, password } = req.body;
    try {
        const newAdmin = new Admin({ prenom, nom, email, password });
        await newAdmin.save();
        res.status(201).send(newAdmin);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err });
    }
};

exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.send(admins);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.send({ message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
};