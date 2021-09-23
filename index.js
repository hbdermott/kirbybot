import { Client, MessageEmbed } from 'discord.js';
import fs from 'fs';
import classify from './toxic.js';
const client = new Client();

client.on('ready', () => {
  console.log('I am ready!');
});


client.on('message', async (message) => {
    if (message.author.bot) return;

    if (message.content === "!eat") {
		let embed = new MessageEmbed()
			// Set the title of the field
			.setTitle("Yummers!")
			// Set the color of the embed
			.setColor(0xff00bf)
			.setFooter("For logged messages: !log")
			// Set the main content of the embed
			.setImage(
				"https://media1.tenor.com/images/6fcb725ffe9f1b0d0565b2d276ef462c/tenor.gif?itemid=12929504"
			);
		message.channel
			.bulkDelete(20, true)
			.then( messages => {
				messages.each(message => fs.appendFile(`${message.channel.name}_log.txt`, `${message.author.username} wrote: '${message.content}' at ${message.createdAt.toISOString()}\n`, (err) => {if (err) throw err;}));
				embed.setDescription(`I ate and logged ${messages.size} messages`);
				message.channel.send(embed);
				return;
			})
			.catch(console.error);
	}
	else if(message.content === '!log'){
		let log_embed = new MessageEmbed().setColor(0xff00bf);

		if(fs.existsSync(`${message.channel.name}_log.txt`)){
				log_embed.setTitle("Here Ya Go!!!")
				.setImage(
					"https://thumbs.gfycat.com/ShoddyWaterloggedHowlermonkey-max-1mb.gif"
				)
				.attachFiles(`${message.channel.name}_log.txt`);

		}

		else{
			log_embed.setTitle("Kirby Couldn't Find the Log!")
				.setFooter("Sorry <3")
				.setImage(
					"https://29.media.tumblr.com/tumblr_lp89s4uVFM1qiog0do1_400.gif"
				);
		}

		message.channel.send(log_embed);
	}
	else if(message.content.toLowerCase().includes('poyo')){
		message.channel.send("POYO POYO!");
	}
	else if(message.content.search(/[Hh]+([eE]+[yY]+|[iI]+|[eE]+[lL]+[oO]+)/g) >= 0){
		message.channel.send("HAI!");
	}


    const isToxic = await classify(message.content);
    if(isToxic){
        message.channel.send(`Woah ${message.author.username}! Toxicity is anti-poggers.`)
    }
});

client.login("Nzk5NDM1NTE5ODg4NTg4ODQw.YADiWA.624I58J44TuuVRTg_FD09BbB9ps");