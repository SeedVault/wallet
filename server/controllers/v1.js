const { WalletService } = require('../../domain/wallet/services/WalletService');
const ValidationError = require('mongoose/lib/error/validation');

const v1 = {

  // POST - /api/v1/send
  send: async (req, res, next) => {
    try {
      const username = req.body.username || '';
      const to = req.body.to || '';
      const amount = req.body.amount || '0';
      const data = await WalletService.send(
        username,
        to,
        amount,
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

  // GET - /api/v1/balance
  getBalance: async (req, res, next) => {
    try {
      const username = req.query.username || '';
      const data = await WalletService.getWalletProfile(username);
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
module.exports = v1;
