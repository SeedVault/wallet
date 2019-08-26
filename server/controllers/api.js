const { WalletService } = require('../../domain/wallet/services/WalletService');
const ValidationError = require('mongoose/lib/error/validation');

const api = {

  // GET - /api/dashboard
  getDashboard: async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json('Forbidden');
    }
    try {
      const data = await WalletService.getDashboardInfo(req.user.username);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  // GET - /api/wallet
  getWallet: async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json('Forbidden');
    }
    try {
      const data = await WalletService.getWalletProfile(req.user.username);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  // POST - /api/wallet/verify
  verifyWallet: async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json('Forbidden');
    }
    try {
      const data = await WalletService.send(
        req.user.username,
        req.body.to,
        req.body.amount,
        false
      );
      res.json(data);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(422).json(err);
      } else {
        return res.status(500).json(err);
      }
    }
  },

  // POST - /api/wallet/send
  send: async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json('Forbidden');
    }
    try {
      const data = await WalletService.send(
        req.user.username,
        req.body.to,
        req.body.amount,
        true
      );
      res.json(data);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(422).json(err);
      } else {
        return res.status(500).json(err);
      }
    }
  },
}
module.exports = api;
