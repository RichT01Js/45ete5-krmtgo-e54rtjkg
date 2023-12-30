const Discord = require('discord.js');

exports.run = (client, message, args) => {
if (message.channel.type === 'dm') {
  return message.reply(client.ekoayarlar.dmmesajgondermemsg);
}
  const helpEmbed = new Discord.MessageEmbed()
    .setColor(client.ekoayarlar.renk)
    .setAuthor('Yapımcılar')
    .setDescription(`
> Yapımcılar: \`Richardd, Dominic\`
> # Biz Kimiz?
> 2018 yılından beri farklı projelerde bir araya gelen ve birlikte birçok deneyim kazanan iki arkadaş, kendileri arasında büyük bir karar alarak \`17 Aralık 2022\` tarihinde ekonomi botu açmaya karar verdiler. Discord sunucularındaki eğlence ve aktivite işlemlerini kolaylaştırmayı hedefleyen bu bot, kullanıcılarına benzersiz bir deneyim sunmak için tasarlandı. Geliştirdikleri ekonomi botu ile sunucu üyeleri, birbirinden eğlenceli aktivitelerle kumar oynayarak para kazanabilir, gelişip kasılabilmek için alışveriş yapabilir ve bir ekonomi düzeni içinde etkileşimde bulunabilirler. İki arkadaşın bir araya gelerek oluşturduğu bu proje, Discord topluluklarına değer katmayı amaçlamaktadır.

    `)
     .setFooter(client.ekoayarlar.embedmesajyapimci)
     .setImage(client.ekoayarlar.embedgif) // Embedin içinde büyük bir resim (image)
     .setTimestamp() // Embedin gönderildiği tarih ve saat
  message.channel.send(helpEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcılar' , 'owner'],
  permLevel: 0,
};

exports.help = {
  name: 'yapimcilar',
  description: 'Kullanılabilir komutları gösterir.',
  usage: 'help',
};