module.exports.config = {
  name: "about",
  author: "Khaile",
  version: "1.0",
  category: "utility",
  description: "Information",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5,
};

module.exports.run = async function ({ event, api, args }) {
  const aboutMessage = `
    **Bot Name:** Klix Botify
    **Version:** 1.0
    **Description:** AI assistant that can help you with tasks
    **Developed by:** Yan, modified by Kenlie
    **Contact:** [Facebook](https://www.facebook.com/localhostsoriano.8080)
  `;
  try {
    api.sendMessage(aboutMessage, event.sender.id);
  } catch (err) {
    console.log(err);
  }
};
