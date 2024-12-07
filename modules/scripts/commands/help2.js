const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "help2",
  author: "developer",
  version: "1.0",
  category: "utility",
  description: "Shows available commands.",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5,
};

module.exports.run = function ({ event, args, api }) {
  if (event.type === "message" || event.postback.payload === "HELP_PAYLOAD") {
    const commandsPath = path.join(__dirname, "../commands");

    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    const categorizedCommands = {};

    commandFiles.forEach((file) => {
      const command = require(path.join(commandsPath, file));
      if (command.config) {
        const category = command.config.category || "Uncategorized";
        if (!categorizedCommands[category]) {
          categorizedCommands[category] = [];
        }
        categorizedCommands[category].push(`${command.config.usePrefix ? "/" : ""}${command.config.name}`);
      }
    });

    let message = "";
    Object.keys(categorizedCommands).forEach((category) => {
      message += `◙◙ ${category} ◙◙\n`;
      categorizedCommands[category].forEach((command) => {
        message += `• ${command}\n`;
      });
      message += "\n";
    });

    const totalCommands = commandFiles.length;
    const commandsPerPage = 25;
    const totalPages = Math.ceil(totalCommands / commandsPerPage);
    let page = parseInt(args[0], 10);

    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const startIndex = (page - 1) * commandsPerPage;
    const endIndex = startIndex + commandsPerPage;
    const commandsForPage = commandFiles.slice(startIndex, endIndex);

    if (commandsForPage.length === 0) {
      message = `Invalid page number. There are only ${totalPages} pages.`;
      return api.sendMessage(message, event.sender.id);
    }

    let pageMessage = `Commands List [Page ${page} of ${totalPages}]:\n\n`;
    commandsForPage.forEach((file, index) => {
      const command = require(path.join(commandsPath, file));
      pageMessage += `${startIndex + index + 1}. ${command.config.name} - ${command.config.description}\n`;
    });

    pageMessage += `\nType "help [page number]" to see another page of available commands.`;

    api.sendMessage(pageMessage, event.sender.id);
  }
};
