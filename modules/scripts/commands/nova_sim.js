const axios = require("axios");

module.exports.config = {
  name: "sim",
  author: "developer",
  version: "1.0",
  category: "chat",
  description: "Talk to SimSimi and get a response",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5,
};

module.exports.run = async function ({ event, args, api }) {
  const senderId = event.sender.id;
  const content = encodeURIComponent(args.join(" "));

  if (!args[0]) {
    return api.sendMessage("Please type a message...", senderId);
  }

  try {
    const apiUrl = `https://simsimi-api-pro.onrender.com/sim?query=${content}`;
    const response = await axios.get(apiUrl);
    const respond = response.data.respond;

    api.sendMessage(respond, senderId);
  } catch (error) {
    console.error("Error calling SimSimi API:", error);
    api.sendMessage("An error occurred while fetching the data.", senderId);
  }
};
