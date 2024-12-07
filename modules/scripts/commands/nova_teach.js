const axios = require("axios");

module.exports.config = {
  name: "teach",
  author: "developer",
  version: "1.0",
  category: "chat",
  description: "Teach SimSimi a new response",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5,
};

module.exports.run = async function ({ event, args, api }) {
  const senderId = event.sender.id;
  try {
    const text = args.join(" ");
    const text1 = text.substr(0, text.indexOf(' => '));
    const text2 = text.split(" => ").pop();

    if (!text1 || !text2) {
      return api.sendMessage("Usage: Teach hi => hello", senderId);
    }

    const apiUrl = `https://simsimi-api-pro.onrender.com/teach?ask=${encodeURIComponent(text1)}&ans=${encodeURIComponent(text2)}`;
    const response = await axios.get(apiUrl);

    api.sendMessage(`Your ask: ${text1}\nSim respond: ${text2}\nSuccessfully taught SimSimi!`, senderId);
  } catch (error) {
    console.error("An error occurred:", error);
    api.sendMessage("Please provide both a question and an answer.\nExample: Teach hi => hello", senderId);
  }
};
