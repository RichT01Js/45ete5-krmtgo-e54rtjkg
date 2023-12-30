// vip.js (VIP komutu)
const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if (message.channel.type === 'dm') {
    return message.reply(client.ekoayarlar.dmmesajgondermemsg);
  }
  
  const vipRutbe = 'Premium';
  const vipSuresi = 1000; // 3 gün (milisaniye cinsinden)

  const userInventory = db.fetch(`inventory_${message.author.id}`) || [];

  if (userInventory.includes('premium')) {
    let existingRoles = await db.fetch(`ruthierarchyasreaper-${message.author.id}`) || [];

    if (!existingRoles.includes(vipRutbe)) {
      existingRoles.push(vipRutbe);

      await db.set(`ruthierarchyasreaper-${message.author.id}`, existingRoles);
      message.reply(`3 Günlük Premium başarıyla etkinleştirildi.`);

      // VIP süresi boyunca rolünü koruması için süreyi ekleyelim
      setTimeout(async () => {
        // VIP süresi bittiğinde rolü kaldır
        existingRoles = existingRoles.filter(role => role !== vipRutbe);
        await db.set(`ruthierarchyasreaper-${message.author.id}`, existingRoles);

        // VIP süresi bittiğinde envanterden VIP ürününü kaldır
        db.delete(`inventory_${message.author.id}`);

        // Kullanıcıya DM'den mesaj gönder
        const dmChannel = await message.author.createDM();
        dmChannel.send('Premium üyeliğinizin süresi doldu. Teşekkür ederiz!');
      }, vipSuresi);
    } else {
      message.reply(`Zaten Premium üyesisin.`);
    }
  } else {
    message.reply(`Premium olabilmeniz için mağazadan **VIP etkinleştirme** satın almalısınız. **${client.ekoayarlar.botunuzunprefixi}mağaza**`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  katagori: 'Rütbe',
};

exports.help = {
  name: 'vip',
  description: 'VIP rütbesini kullanıcıya ekler.',
  usage: '/vip',
};
