// mağaza.js
const Discord = require('discord.js');
const db = require('quick.db');

const items = [
  { name: 'Premium <:slotrushvip:1188551679780589608>', price: 29000000, key: 'vip_stock', description: 'VIP Hakkında daha fazla bilgi almak için `.vipbilgi`', stock: 70 },
  { name: 'Bilgisayar<:slotrushcomputer:1188552164344340571>', price: 19000000, key: 'computer_stock', description: 'Bilgisayarda mining yaparak kar elde edebilirsin. daha fazla bilgi almak için `.chelp`', stock: 70 },
  { name: 'Çark Bileti<:slotrushticket:1188553012558446622>', price: 22000000, key: 'carkbileti_stock', description: 'ÇarkıFelek oyununu oynayabilmek için çark bileti almanız gerekmektedir. daha fazla bilgi almak için `.chelp` ', stock: 70 },
  { name: 'Madeni Para (1tl)<a:slotcoin:1188515137716506736>', price: 1, key: 'birlira_stock', description: '1 TL.', stock: 70 },
  { name: 'Olta<:slotrushfish:1188553678441938954>', price: 15000, key: 'olta_stock', description: 'Olta kullanarak balık avına çık daha fazla bilgi için `.chelp`', stock: 70 },
];

function formatCurrency(amount, currency) {
  return `${amount.toLocaleString()} ${currency}`;
}

exports.run = async (client, message, args) => {
  const user = message.author;

  if (message.channel.type === 'dm') {
    return message.reply(client.ekoayarlar.dmmesajgondermemsg);
  }

  const hasAccount = db.fetch(`hesapdurumasreaper-${user.id}`);
  if (!hasAccount) {
    return message.reply(client.ekoayarlar.hesapolusturmsg);
  }

  const userBalance = db.fetch(`bakiyeasreaper-${user.id}`);
  if (userBalance === null || userBalance < 0) {
    db.set(`bakiyeasreaper-${user.id}`, 0);
    return message.reply(`Sanırım yeterli bakiyeniz bulunmuyor. <:deny:1188812328070819900>`);
  }

  const embed = new Discord.MessageEmbed()
    .setColor(client.ekoayarlar.renk)
    .setTitle(client.ekoayarlar.store + client.ekoayarlar.botismi + ' Mağaza')
    .setImage(client.ekoayarlar.embedgif)
    .setDescription(`\n\n\n# >  ${formatCurrency(userBalance, client.ekoayarlar.parabirimi)}\nDesteğe mi ihtiyacın var? [Destek Sunucusuna](https://discord.gg/cNTCqVYQH9) katıl.`)
    .setTimestamp(); //zaman

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const stock = db.fetch(item.key) || item.stock;

    embed.addField(
      `▍**${item.name}**`,
      `> Stok Sayısı: **${stock}** \n> Ürün Fiyatı: **${formatCurrency(item.price, client.ekoayarlar.parabirimi)}** \n> Açıklama: **${item.description}**`
    );
  }

  embed.setFooter(client.ekoayarlar.embedmesajyapimci);

  message.channel.send(embed).then(async (shopMessage) => {
    for (let i = 0; i < items.length; i++) {
      await shopMessage.react(`🛒`);
    }

    const filter = (reaction, user) => {
      return reaction.emoji.name === '🛒' && user.id === message.author.id;
    };

    const collector = shopMessage.createReactionCollector(filter, { time: 60000 });

    collector.on('collect', async (reaction) => {
      reaction.users.remove(user);

      const selectedItemIndex = items.findIndex((item) => item.name.toLowerCase() === reaction.emoji.name.toLowerCase());

      if (selectedItemIndex !== -1) {
        const selectedItem = items[selectedItemIndex];

        const stock = db.fetch(selectedItem.key) || selectedItem.stock;

        // Kullanıcının envanterini kontrol et
        const userInventory = db.fetch(`inventory_${user.id}`) || [];

        if (!userInventory.includes(selectedItem.name)) {
          if (stock > 0) {
            if (userBalance >= selectedItem.price) {
              // Kullanıcının bakiyesinden ürün fiyatını çıkar
              db.subtract(`bakiyeasreaper-${user.id}`, selectedItem.price);

              // Kullanıcının envanterine ürünü ekle
              userInventory.push(selectedItem.name);
              db.set(`inventory_${user.id}`, userInventory);

              // Stok miktarını güncelle
              db.set(selectedItem.key, stock - 1);

              // Update the stock in the embed field
              embed.fields[selectedItemIndex].value = `> Stok Sayısı: **${stock - 1}** \n> Ürün Fiyatı: **${formatCurrency(selectedItem.price, client.ekoayarlar.parabirimi)}** \n> Açıklama: **${selectedItem.description}**`;
              shopMessage.edit(embed);

              message.reply(`**${formatCurrency(selectedItem.price, client.ekoayarlar.parabirimi)}** tutarında **${selectedItem.name}** adlı ürünü satın aldınız.`);
            } else {
              message.reply('Yeterli paran yok. <:deny:1188812328070819900>');
            }
          } else {
            message.reply(`**${selectedItem.name}** Ürün şu anda stokta yok. <:deny:1188812328070819900>`);
          }
        } else {
          message.reply(`Zaten **${selectedItem.name}** adlı ürünü satın almışsınız. <:deny:1188812328070819900>`);
        }
      }
    });

    collector.on('end', () => {
      shopMessage.reactions.removeAll().catch((error) => console.error('Reactions could not be removed:', error));
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['store', 'shop'],
  permLevel: 0,
  category: 'Eğlence',
};

exports.help = {
  name: 'mağaza',
  description: 'Mağazaya göz atın ve ürünler satın alın.',
  usage: 'shop',
};
