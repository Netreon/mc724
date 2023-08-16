const { SlashCommandBuilder, Colors, PermissionFlagsBits, ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botpanel')
		.setDescription('7/24 Bot Paneli')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(client, interaction) {
		const add = new ButtonBuilder()
        .setCustomId('botgonder')
        .setLabel('Bot Gönder')
        .setStyle(ButtonStyle.Success);

        const remove = new ButtonBuilder()
        .setCustomId('prebotgonder')
        .setLabel('Bot Gönder (Premium)')
        .setStyle(ButtonStyle.Success);

        const get = new ButtonBuilder()
        .setCustomId('premium')
        .setLabel('Premium')
        .setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
            .addComponents(add, remove, get);
		
		const embed = new EmbedBuilder()
			.setTitle("Minecraft Hosting 7/24 Sunucu Hizmeti")
			.setColor(Colors.Blue)
			.setDescription("Aşağıdan, istediğiniz gibi sunuculara bot gönderip 7/24 tutabilirsiniz. Bu şekilde aşağıdaki yazıları kabul etmiş olursunuz.")
			.addFields(
				{ name: 'Gizlilik', value: `Gönderilen botların gönderildiği sunucular ve gönderen kişiler yetkililer tarafından görülebilir.`},
				{ name: 'Sorumluluk', value: `Sunucuya bir bot göndermek sizin sorumluluğunuzdadır. Yani başkalarının sunucularına vs. bot gönderme işleminden siz sorumlu tutulursunuz.`},
				{ name: 'Bozmak', value: `Sunucuların sisteme zarar vermesi, bozması yasaktır.`},
			)
		await interaction.reply({ content: "Panel gönderiliyor...", ephemeral: true }).catch(() => {return})
		await interaction.channel.send({ embeds: [embed], components: [row] }).catch(() => {return})
		await interaction.editReply("Panel gönderildi.").catch(() => {return})
	},
};