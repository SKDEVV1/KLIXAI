const axios = require('axios');

module.exports.config = {
  name: "nglspam",
  author: "developer",
  version: "1.0",
  category: "spam",
  description: "nglspam <usn> <mess> <amount> to send spam messages",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5,
};

module.exports.run = async function ({ event, args, api }) {
  const senderId = event.sender.id;
  const username = args[0];
  const amount = parseInt(args[args.length - 1], 10);
  const message = args.slice(1, args.length - 1).join(' ');

  if (!username || !message || isNaN(amount) || amount <= 0) {
    return api.sendMessage('Usage: nglspam [username] [message] [amount]', senderId);
  }

  api.sendMessage('⚙️ Processing your request to send messages to NGL username...', senderId);

  for (let i = 0; i < amount; i++) {
    try {
      const response = await axios.get('https://rest-api.joshuaapostol.site/ngl-spam', {
        params: {
          username,
          message,
          deviceId: 'myDevice',
          amount: 1,
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  api.sendMessage('All messages successfully sent ✅.', senderId);
};
