// pinfo.js
const Discord = require('discord.js');
const db = require('quick.db');

function formatCurrency(amount, currency) {
  return `${amount.toLocaleString()} ${currency}`;
}

function getAchievementText(completedCount, totalCount) {
  return `${completedCount}/${totalCount}`;
}

exports.run = async (client, message, args) => {
  let kllanç;
  if (message.channel.type === 'dm') {
    return message.reply(client.ekoayarlar.dmmesajgondermemsg);
  }

  if (args[0]) {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) return message.reply(exports.help.usage);
    kllanç = user;
  } else {
    kllanç = message.author;
  }

  const hesapDurumu = await db.fetch(`hesapdurumasreaper-${kllanç.id}`);
  if (!hesapDurumu) {
    if (args[0]) return message.reply(`Bakmak istediğin kullanıcının hesabı yok. <:deny:1188812328070819900>`);
    message.reply(client.ekoayarlar.hesapolusturmsg);
    return;
  }

  const hesapismi = await db.fetch(`hesapismiasreaper-${kllanç.id}`) || 'Bilinmiyor';
  const hesapTarihi = db.fetch(`hesaptarihireaper-${kllanç.id}`); // Hesap oluşturma tarihini al
  const now = hesapTarihi || kllanç.createdAt; // Hesap oluşturma tarihi yoksa Discord hesap oluşturma tarihini kullan

  const hesaptarihyıl = now.getFullYear();
  const hesaptarihay = now.getMonth() + 1;
  const hesaptarihgün = now.getDate();

  // Bakiyeyi alırken varsayılan değeri 0 olarak ayarla
  const bakiye = db.fetch(`bakiyeasreaper-${kllanç.id}`) || 0;

  // Kullanıcının envanterini kontrol et
  const userInventory = db.fetch(`inventory_${kllanç.id}`) || [];

  // Kullanıcının rütbelerini kontrol et
  const existingRoles = db.fetch(`ruthierarchyasreaper-${kllanç.id}`) || [];

  // Eğer rütbe yoksa Üye olarak varsay
  if (existingRoles.length === 0) existingRoles.push('Üye');

  // Kullanıcının başarımlarını kontrol et
  const allAchievements = ['Başlangıç Çarkı','Slotçu','Bağımlı','Kumarbaz I','Beleşçi','Cenabettin','Para Gözlü','Altın Çocuk', 'Çarkçı', 'Çark Ustası','Rulet Kralı','Kumarbaz II']; // Başarımları buraya ekleyin
  const userAchievements = db.fetch(`achievements_${kllanç.id}`) || [];
  const achievementsText = getAchievementText(userAchievements.length, allAchievements.length);

  const embed = new Discord.MessageEmbed()
    .setColor(client.ekoayarlar.renk)
    .setFooter(client.ekoayarlar.embedmesajyapimci)
    .setImage(client.ekoayarlar.embedgif)
    .setTitle("<:slotrushmember:1188809299451977808> Kullanıcı Bilgi")
  
    .setDescription(`
    > <:hesapsahibi:1188810775842799666> Hesap Sahibi: **${kllanç}**
    > <:hesapadi:1188811239284015114> Hesap Adı: **${hesapismi}**
    > <:cuzdan:1188540963153530930> Bakiye: **${formatCurrency(bakiye, client.ekoayarlar.parabirimi)}**
    > <:kullaniciid:1188810442156560464> ID: **${kllanç.id}**
    
    > <:slotrushmember:1188809299451977808> Rütbeler: 
    > **${existingRoles.join(', ')}**
    
    > <:hesapolusturmatarihi:1188813572067827742> Hesap Oluşturma Tarihi: **${hesaptarihay}/${hesaptarihgün}/${hesaptarihyıl}**
    > <:hesapolusturmatarihi:1188813572067827742> Durum: **${hesapDurumu}** <:accepts:1188812293048369233>
    > <:basarimlar:1188814034649235476> Başarımlar: **${achievementsText}**
    
    > <:envanter:1188814517308764271> Envanter:
    > **${userInventory.length > 0 ? userInventory.join('\n> ') : 'Eşya yok <:deny:1188812328070819900>'}**
    `);

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  katagori: 'Ekonomi',
};

exports.help = {
  name: 'cash',
  description: 'Kullanıcının hesap bilgilerini gösterir.',
  usage: 'Doğru Kullanım: **.pinfo @kullanıcı**',
};
