// satinal.js
const Discord = require('discord.js');
const db = require('quick.db');

function formatCurrency(amount, currency) {
  return `${amount.toLocaleString()} ${currency}`;
}

exports.run = async (client, message, args) => {
  const user = message.author;
  const userBalance = db.fetch(`bakiyeasreaper-${user.id}`);
  if (message.channel.type === 'dm') {
    return message.reply(client.ekoayarlar.dmmesajgondermemsg);
  }

  if (userBalance === null || userBalance < 0) {
    return message.reply(client.ekoayarlar.hesapolusturmsg);
  }

  const selectedItem = args[0];

  if (!selectedItem) {
    return message.reply(exports.help.usage);
  }

  const items = [
    { name: 'premium', price: 11000000, key: 'vip_stock', stock: 70 },
    { name: 'bilgisayar', price: 19000000, key: 'computer_stock', stock: 70 },
    { name: 'çarkbileti', price: 22000000, key: 'carkbileti_stock', stock: 70 },
    { name: 'birtl', price: 1, key: 'birlira_stock', stock: 70 },
    { name: 'olta', price: 15000, key: 'olta_stock', stock: 70 },
  ];

  const selectedShopItem = items.find((item) => item.name.toLowerCase() === selectedItem.toLowerCase());

  if (!selectedShopItem) {
    return message.reply('Belirtilen isimde bir ürün bulunamadı. <:deny:1188812328070819900>');
  }

  const stock = db.fetch(selectedShopItem.key) || selectedShopItem.stock;

  // Kullanıcının envanterini kontrol et
  const userInventory = db.fetch(`inventory_${user.id}`) || [];

  if (!userInventory.includes(selectedShopItem.name)) {
    if (stock > 0) {
      if (userBalance >= selectedShopItem.price) {
        // Kullanıcının bakiyesinden ürün fiyatını çıkar
        db.subtract(`bakiyeasreaper-${user.id}`, selectedShopItem.price);

        // Kullanıcının envanterine ürünü ekle
        userInventory.push(selectedShopItem.name);
        db.set(`inventory_${user.id}`, userInventory);

        // Stok miktarını güncelle
        db.set(selectedShopItem.key, stock - 1);

        // Mağaza.js'deki stoku güncelle
        client.emit('updateStock', selectedShopItem.key, stock - 1);

        message.reply(`**${formatCurrency(selectedShopItem.price, client.ekoayarlar.parabirimi)}** tutarında **${selectedShopItem.name}** adlı ürünü satın alma işleminiz başarıyla gerçekleşti. <:accepts:1188812293048369233>`);
      } else {
        message.reply('Yeterli paranız yok. <:deny:1188812328070819900>');
      }
    } else {
      message.reply(`**${selectedShopItem.name}** Ürün şu anda stokta yok. <:deny:1188812328070819900>`);
    }
  } else {
    message.reply(`**${selectedShopItem.name}** bu ürün envanterinizde zaten bulunuyor. <:deny:1188812328070819900>`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['buy'],
  permLevel: 0,
  category: 'Eğlence',
};

exports.help = {
  name: 'satinal',
  description: 'Mağazadan ürün satın alın.',
  usage: 'Doğru Kullanım: **.satinal <ürün>**',
};
