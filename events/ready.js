const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');

module.exports = client => {
  console.log("");
  console.log("");
  console.log("");
  console.log("");
  console.log("");
  console.log("");

  // Belirli bir sunucunun ID'sini girin
  const targetGuildId = '1179793856624082974';

  // Birden fazla aktivite mesajını içeren dizi
  const activities = [
    { name: 'Tag me for help!', type: 'WATCHING' },
    { name: 'Sign Up for free', type: 'PLAYING' },
    { name: 'free 5,000,000 money', type: 'PLAYING' },
    { name: '.yapımcılar', type: 'PLAYING' },
    { name: '.bot', type: 'PLAYING' },
  ];

  let activityIndex = 0; // Aktivitenin sıra indeksi

  // İlk aktiviteyi ayarla
  client.user.setActivity(activities[activityIndex]);

  console.log(chalk.red(` [RedSystem] Bot, ${client.user.tag} olarak giriş sağladı... `));
  console.log(chalk.red(` [RedSystem] richard ve dominic tarafından yapıldı.`));
  console.log(chalk.red(` [RedSystem] ${client.guilds.cache.size} sunucuya ekli. `));
  console.log(chalk.red(` [RedSystem] 2${client.users.cache.size} kullanıcıya sahip. `));
  
  // Belirli sunucudaki kullanıcı sayısını al ve konsola yazdır
  const targetGuild = client.guilds.cache.get(targetGuildId);
  if (targetGuild) {
    const memberCount = targetGuild.memberCount;
    console.log(chalk.yellow(` [RedSystem] Destek sunucusunda ${memberCount} adet üye bulunmakta.`));
  } else {
    console.log(chalk.red(` [RedSystem] Belirtilen sunucu bulunamadı!`));
  }

  console.log(` [RedSystem] Gerekli kurulum tamamlandı!`);
  console.log("--------------------------------------------");

  // Aktivite değiştirmek için zamanlayıcı
  setInterval(() => {
    // Sıradaki aktiviteye geç
    activityIndex = (activityIndex + 1) % activities.length;

    // Bot Glitch üzerinden yeniden başlatıldığında durumu kontrol et
    if (process.env.NODE_ENV === 'development') {
      client.user.setActivity('Yeniden Başlatılıyorum');
    } else {
      client.user.setActivity(activities[activityIndex]);
    }

  }, 10000); // Her 10 saniyede bir değiştirilecek, istediğiniz süreyi ayarlayabilirsiniz.
};