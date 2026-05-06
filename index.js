const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
});

const TOKEN = process.env.TOKEN;
const KEYWORD = "/despiseW";
const ROLE_NAME = "pic perms";

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("presenceUpdate", async (_, presence) => {
  if (!presence || !presence.member) return;

  const status = presence.activities?.find(a => a.type === 4);
  if (!status || !status.state) return;

  const member = presence.member;
  const role = member.guild.roles.cache.find(r => r.name === ROLE_NAME);
  if (!role) return;

  const hasKeyword = status.state.includes(KEYWORD);

  if (hasKeyword) {
    if (!member.roles.cache.has(role.id)) {
      await member.roles.add(role);
    }
  } else {
    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
    }
  }
});

client.login(TOKEN);
