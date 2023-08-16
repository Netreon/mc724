const { Events, Colors, EmbedBuilder } = require('discord.js');
const mineflayer = require("mineflayer")
const config = require("../config.js")

const { Hercai } = require('hercai');
const herc = new Hercai();

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const sentlist = []

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		if (!interaction.isModalSubmit()) return
		
		if (interaction.customId == "botaddmodal") {
			const ip = interaction.fields.getTextInputValue('serverip');

			if (sentlist.includes(ip)){
				const alreadyEmbed = new EmbedBuilder()
				.setTitle("Hata")
				.setColor(Colors.Red)
				.setDescription("Zaten bu sunucuya bir bot gönderilmiş!")
				return await interaction.reply({ embeds: [alreadyEmbed], ephemeral: true }).catch(() => {return})
			}

			const usernameEnd = await makeid(5)

			const bot = await mineflayer.createBot({
				host: ip,
				username: config.name + "_" + usernameEnd
			})

			const sendingEmbed = new EmbedBuilder()
			.setTitle("Bot Gönderiliyor")
			.setColor(Colors.Blue)
			.setDescription(`Bot ${ip} IP'li sunucuya gönderiliyor...`)
			await interaction.reply({ embeds: [sendingEmbed], ephemeral: true }).catch(() => {return})

			bot.on("login", async () => {
				sentlist.push(ip)
				const sentEmbed = new EmbedBuilder()
				.setTitle("Bot Gönderildi")
				.setColor(Colors.Green)
				.setDescription(`Bot ${ip} IP'li sunucuya ${config.name + "_" + usernameEnd} ismiyle gönderildi!`)
				await interaction.editReply({ embeds: [sentEmbed]}).catch(() => {return})

				const logEmbed = new EmbedBuilder()
				.setTitle("Bot Gönderildi")
				.setColor(Colors.Green)
				.setDescription(`Bot ${ip} IP'li sunucuya ${config.name + "_" + usernameEnd} ismiyle ${interaction.user.toString()} kullanıcısı tarafından gönderildi!`)
				await interaction.guild.channels.cache.get(config.logkanalid).send({ embeds: [logEmbed]}).catch(() => {return})
			})

			bot.on('error', async () => {
				const sentEmbed = new EmbedBuilder()
				.setTitle("Bot Gönderilemedi")
				.setColor(Colors.Red)
				.setDescription(`Bot ${ip} IP'li sunucuya ${config.name + "_" + usernameEnd} ismiyle gönderilirken bir hata oluştu!`)
				await interaction.editReply({ embeds: [sentEmbed]}).catch(() => {return})
			})
			
			bot.on('kicked', async () => {
				const sentEmbed = new EmbedBuilder()
				.setTitle("Bot Gönderilemedi")
				.setColor(Colors.Red)
				.setDescription(`Bot ${ip} IP'li sunucuya ${config.name + "_" + usernameEnd} ismiyle gönderilirken bir hata oluştu!`)
				await interaction.editReply({ embeds: [sentEmbed]}).catch(() => {return})
			})
		}
		if (interaction.customId == "prebotaddmodal") {
			const ip = interaction.fields.getTextInputValue('serverip');

			const name = interaction.fields.getTextInputValue('botname');

			const bot = await mineflayer.createBot({
				host: ip,
				username: name
			})

			const sendingEmbed = new EmbedBuilder()
			.setTitle("Bot Gönderiliyor")
			.setColor(Colors.Blue)
			.setDescription(`Bot ${ip} IP'li sunucuya gönderiliyor...`)
			await interaction.reply({ embeds: [sendingEmbed], ephemeral: true }).catch(() => {return})

			bot.on("login", async () => {
				sentlist.push(ip)
				const sentEmbed = new EmbedBuilder()
				.setTitle("Bot Gönderildi")
				.setColor(Colors.Green)
				.setDescription(`Bot ${ip} IP'li sunucuya ${name} ismiyle gönderildi!`)
				await interaction.editReply({ embeds: [sentEmbed]}).catch(() => {return})

				const logEmbed = new EmbedBuilder()
				.setTitle("Bot Gönderildi (PREMIUM)")
				.setColor(Colors.Green)
				.setDescription(`Bot ${ip} IP'li sunucuya ${name} ismiyle ${interaction.user.toString()} kullanıcısı tarafından gönderildi!`)
				await interaction.guild.channels.cache.get(config.logkanalid).send({ embeds: [logEmbed]}).catch(() => {return})

				async function intervalFunc() {
					try {
						bot.setControlState("forward", true)
						await bot.waitForTicks(1)
						bot.setControlState("sprint", true)
						bot.setControlState("jump", true)
						await bot.waitForTicks(11)
						bot.clearControlStates()
					} catch {
						return
					}
				}
				  
				setInterval(intervalFunc, 10000);
			})

			bot.on('error', async () => {
				const sentEmbed = new EmbedBuilder()
				.setTitle("Bot Gönderilemedi")
				.setColor(Colors.Red)
				.setDescription(`Bot ${ip} IP'li sunucuya ${name} ismiyle gönderilirken bir hata oluştu!`)
				await interaction.editReply({ embeds: [sentEmbed]}).catch(() => {return})
			})

			bot.on("spawn", async () => {
				setInterval(() => {
					const entity = bot.nearestEntity()

					if (!entity) return
					bot.lookAt(entity.position.offset(0, entity.height, 0))
				}, 1000)
			})
			
			bot.on('kicked', async () => {
				const sentEmbed = new EmbedBuilder()
				.setTitle("Bot Gönderilemedi")
				.setColor(Colors.Red)
				.setDescription(`Bot ${ip} IP'li sunucuya ${name} ismiyle gönderilirken bir hata oluştu!`)
				await interaction.editReply({ embeds: [sentEmbed]}).catch(() => {return})
			})

			bot.on('chat', async (username, message) => {
				if (username == bot.username) return
				const lowercased = message.toLocaleLowerCase()
				const namexd = config.name.toLowerCase()
				if (lowercased.includes(bot.username) || lowercased.includes(namexd)) {
					await herc.question({ model: "v2", content: message }).then(response => {
						const editedResponse = response.reply.replaceAll("@User", username.toString()).replaceAll("Hercai", config.name).replaceAll("Herc.ai", config.name).replaceAll("fivesobes", config.name)
						try {
							bot.chat(editedResponse)
						} catch {
							return
						}
					}).catch((er) => {return})
				}
			})
		}
	},
};