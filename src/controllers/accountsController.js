const AccountModel = require('../models/accountModel');

const accountsController = {
  getAllAccounts: async (req, res) => {
    try {
      const accounts = await AccountModel.find();
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAccountById: async (req, res) => {
    try {
      const account = await AccountModel.findById(req.params._id);
      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }
      res.json(account);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createAccount: async (req, res) => {
    try {
      const newAccount = await AccountModel.create(req.body);
      res.status(201).json({ success: true, message: 'Account created successfully', account: newAccount });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create account', error: error.message });
    }
  },

  updateAccount: async (req, res) => {
    try {
      const updatedAccount = await AccountModel.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedAccount);
    } catch (error) {
      console.error('Error while updating the account:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const deletedAccount = await AccountModel.findByIdAndDelete(req.params._id);
      if (!deletedAccount) {
        return res.status(404).json({ error: 'Account not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = accountsController;
