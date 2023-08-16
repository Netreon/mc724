const { Events, ModalBuilder, TextInputStyle, TextInputBuilder, Colors, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const config = require("../config.js")

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		if (!interaction.isButton()) return
		
		if (interaction.customId == "botgonder") {
			const botAddModal = new ModalBuilder()
				.setCustomId('botaddmodal')
				.setTitle('Bot Gönder');
			
			const serverIpInput = new TextInputBuilder()
				.setCustomId('serverip')
				.setLabel("Sunucu IP'si (ZORUNLU)")
				.setStyle(TextInputStyle.Short)
				.setRequired(true)

			const firstActionRow = new ActionRowBuilder().addComponents(serverIpInput);
			await botAddModal.addComponents(firstActionRow);
			await interaction.showModal(botAddModal).catch(() => {return})
		}
		if (interaction.customId == "prebotgonder") {

			if (!interaction.member.roles.cache.has(config.premiumroleid)){
				const premiumEmbed = new EmbedBuilder()
				.setTitle("Premium")
				.setColor(Colors.Gold)
				.setDescription("Premium ile botlarının adını özelleştirebilirsin!")
				await interaction.reply({ embeds: [premiumEmbed], ephemeral: true }).catch(() => {return})
			}

			const botAddModal = new ModalBuilder()
				.setCustomId('prebotaddmodal')
				.setTitle('Bot Gönder (PREMIUM)');
			
			const serverIpInput = new TextInputBuilder()
				.setCustomId('serverip')
				.setLabel("Sunucu IP'si (ZORUNLU)")
				.setStyle(TextInputStyle.Short)
				.setRequired(true)
			
			const botNameInput = new TextInputBuilder()
				.setCustomId('botname')
				.setLabel("Botun Adı")
				.setStyle(TextInputStyle.Short)
				.setRequired(true)

			const firstActionRow = new ActionRowBuilder().addComponents(serverIpInput);
			const threeActionRow = new ActionRowBuilder().addComponents(botNameInput);
			await botAddModal.addComponents(firstActionRow, threeActionRow);
			await interaction.showModal(botAddModal).catch(() => {return})
		}
		if (interaction.customId == "premium") {
			const premiumEmbed = new EmbedBuilder()
			.setTitle("Premium")
			.setColor(Colors.Gold)
			.setDescription("Aşağıda Premium avantajları yer alıyor!")
			.addFields(
				{ name: "Özel İsim", value: "Botunuza özel isim verebilirsiniz.", inline: true },
				{ name: "Chatbot", value: "Botunuzda bir chatbot bulunmaktadır. Botunuzun adını söyleyebilir veya " + config.name + " diyip sorunuzu vs. yazıp kullanabilirsiniz.", inline: true },
				{ name: "Hareket", value: "Bot hem en yakındaki entitylere bakacak, hemde otomatik olarak hareket edecektir.", inline: true }
			)
			await interaction.reply({ embeds: [premiumEmbed], ephemeral: true }).catch(() => {return})
		}
	},
};