module.exports.config = {
  name: "about",
  author: "Khaile",
  version: "1.0",
  category: "utility",
  description: "information about the bot.",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5
};

module.exports.run = function ({ event, args }) {
    const aboutMessage = `
      **Bot Name:** [Klix Botify]
      **Version:** [1.0]
      **Description:** [Ai assistant that can help you]
      **Developed by:** [Yan modified by kenlie]
      **Contact:** [fb: https://www.facebook.com/localhostsoriano.8080]
    `;
api.sendMessage(message, event.sender.id);
  };
