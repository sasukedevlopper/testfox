const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const { Client, Util } = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'Hi') {
    msg.reply('Hello , Wasup bro');
  }
});

client.on('message', msg => {
	if (msg.content === 'm!invite') {
	  msg.reply('https://discordapp.com/oauth2/authorize?client_id=420380392407695360&scope=bot&permissions=8');
	}
  });
  
  client.on('message', message => {
	// If the message is "what is my avatar"
	if (message.content === 'm!avatar') {
	  // Send the user's avatar URL
	  message.reply(message.author.avatarURL);
	}
  });
  
  client.on('message', message => {
	// Ignore messages that aren't from a guild
	if (!message.guild) return;
  
	// If the message content starts with "!kick"
	if (message.content.startsWith('m!kick')) {
	  // Assuming we mention someone in the message, this will return the user
	  // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
	  const user = message.mentions.users.first();
	  // If we have a user mentioned
	  if (user) {
		// Now we get the member from the user
		const member = message.guild.member(user);
		// If the member is in the guild
		if (member) {
		  /**
		   * Kick the member
		   * Make sure you run this on a member, not a user!
		   * There are big differences between a user and a member
		   */
		  member.kick('Optional reason that will display in the audit logs').then(() => {
			// We let the message author know we were able to kick the person
			message.reply(`Successfully kicked ${user.tag}`);
		  }).catch(err => {
			// An error happened
			// This is generally due to the bot not being able to kick the member,
			// either due to missing permissions or role hierarchy
			message.reply('I was unable to kick the member');
			// Log the error
			console.error(err);
		  });
		} else {
		  // The mentioned user isn't in this guild
		  message.reply('That user isn\'t in this guild!');
		}
	  // Otherwise, if no user was mentioned
	  } else {
		message.reply('You didn\'t mention the user to kick!');
	  }
	}
  });




  client.on('message', message => {
	// Ignore messages that aren't from a guild
	if (!message.guild) return;
  
	// If the message content starts with "!ban"
	if (message.content.startsWith('m!ban')) {
	  // Assuming we mention someone in the message, this will return the user
	  // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
	  const user = message.mentions.users.first();
	  // If we have a user mentioned
	  if (user) {
		// Now we get the member from the user
		const member = message.guild.member(user);
		// If the member is in the guild
		if (member) {
		  /**
		   * Ban the member
		   * Make sure you run this on a member, not a user!
		   * There are big differences between a user and a member
		   */
		  member.ban('Optional reason that will display in the audit logs').then(() => {
			// We let the message author know we were able to ban the person
			message.reply(`Successfully banned ${user.tag}`);
		  }).catch(err => {
			// An error happened
			// This is generally due to the bot not being able to ban the member,
			// either due to missing permissions or role hierarchy
			message.reply('I was unable to ban the member');
			// Log the error
			console.error(err);
		  });
		} else {
		  // The mentioned user isn't in this guild
		  message.reply('That user isn\'t in this guild!');
		}
	  // Otherwise, if no user was mentioned
	  } else {
		message.reply('You didn\'t mention the user to ban!');
	  }
	}
  });





  client.on('message', message => {
	if (message.content.startsWith('m!members')) { 
		let pages = [`**
	:green_heart: online:   ${message.guild.members.filter(m=>m.presence.status == 'online').size}
	:heart:  dnd:       ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}
	:yellow_heart:  idle:     ${message.guild.members.filter(m=>m.presence.status == 'idle').size}
	:diamond_shape_with_a_dot_inside:   membersCount:  ${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size}
	:bulb: bots: ${message.guild.members.filter(m=>m.user.bot).size} **
	`,` **
	:green_heart: المتواجدين :   ${message.guild.members.filter(m=>m.presence.status == 'online').size}
	:heart:  الخاملين :       ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}
	:yellow_heart:  مشغولين :     ${message.guild.members.filter(m=>m.presence.status == 'idle').size}
	:diamond_shape_with_a_dot_inside:   عدد اعضاء :  ${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size}
	:bulb: عدد البوتات : ${message.guild.members.filter(m=>m.user.bot).size} ** `]
		let page = 1;
	 
		let embed = new Discord.RichEmbed() // 
		.setColor('RANDOM')
					.setAuthor('Members info ',client.user.avatarURL)
				.setThumbnail(client.user.avatarURL)
		.setFooter(`Page ${page} of ${pages.length}`)
		.setDescription(pages[page-1])
	 
		message.channel.sendEmbed(embed).then(msg => { 
	 
			msg.react('◀').then( r => {
				msg.react('▶')
	 
	 
			const backwordsFilters = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
			const forwordsFilters = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
	 
	 
			const backwords = msg.createReactionCollector(backwordsFilters, { time: 20000000});
			const forwords = msg.createReactionCollector(forwordsFilters, { time: 20000000});
	 
	 
	 
			backwords.on('collect', r => {
				if (page === 1) return;
				page--;
				embed.setDescription(pages[page-1]);
				embed.setFooter(`Page ${page} of ${pages.length}`); 
				msg.edit(embed)
			})
			forwords.on('collect', r => {
				if (page === pages.length) return;
				page++;
				embed.setDescription(pages[page-1]);
				embed.setFooter(`Page ${page} of ${pages.length}`); 
				msg.edit(embed)
			})
			})
		})
		}
	});





	client.on('message',message =>{
		let command = message.content.split(" ")[0];
		if (command == "m!moreinfo") {
		var server = client.guilds.find(c => c.id === message.content.split(" ")[1]);
		if(!server) return message.channel.send('**I Can\'t find this server :x:**')
		message.channel.send(new Discord.RichEmbed()
		.setColor('#36393e')
		.setTitle(`📖 **${server.name}** Info`)
		.setImage(`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=1024`)
		.addField('**Members Cout:**',`**${server.memberCount - server.members.filter(m=>m.user.bot).size}** | **${server.members.filter(m=>m.user.bot).size}** bots`,true)
		.addField(`**Channels [${server.channels.size}]**`,`**${server.channels.filter(m => m.type === 'text').size}** Text | **${server.channels.filter(m => m.type === 'voice').size}** Voice | **${server.channels.filter(m => m.type === 'category').size}** Category`,true)
		.addField('**Server Region:**',server.region,true)
		.addField('**Server Owner**',`**${server.owner}**`,true)
		.addField(`**Roles Count [${server.roles.size}]**`,`** **`,true)
		.addField(`**verification Level [ ${server.verificationLevel} ]**`,`** **`,true)
		)
		  }
		});


		client.on('message',message =>{
			if(!message.guild) return;
			if(message.author.id == client.user.id) return;
			var log = message.guild.channels.find(c => c.name === 'logs');
			if(!log) return;
			if(message == '') return;
			log.send(`> **#${message.channel.name} \`>\` ${message.author.tag}**: ${message}`)
			});



			client.on('message',message =>{
				let command = message.content.split(" ")[0];
				if (command == "m!deafen") {
				if(!message.member.hasPermission('MUTE_MEMBERS')) return;
				let user = message.mentions.members.first() || message.guild.members.get(message.content.split(" ")[1])
				if(!user.voiceChannel) return message.channel.send(`**:rolling_eyes: This member isn't in a voicechannel**`)
				user.setDeaf(true)
				message.channel.send(`**Done deafen ${user}**`)
				}
				if (command == "m!undeafen") {
				if(!message.member.hasPermission('MUTE_MEMBERS')) return;
				let user = message.mentions.members.first() || message.guild.members.get(message.content.split(" ")[1])
				if(!user.voiceChannel) return message.channel.send(`**:rolling_eyes: This member isn't in a voicechannel**`)
				user.setDeaf(false)
				message.channel.send(`**Done undeafen ${user}**`)
				}
				});


				client.on('message', message =>{
					let command = message.content.split(" ")[0];
					if (command == "!unban") {
					if(!message.member.hasPermission('BAN_MEMBERS')) return;
					let args = message.content.split(" ").slice(1).join(" ");
					if(args == 'all') {message.guild.fetchBans().then(zg => {
					zg.forEach(NoNo => {message.guild.unban(NoNo);})});
					return message.channel.send('**✅ Unbanned all members **')}
					if(!args) return message.channel.send('**Please Type the member ID / all**');
					message.guild.unban(args).then(m =>{message.channel.send(`**✅ Unbanned ${m.username}**`);
					}).catch(stry =>{message.channel.send(`**🙄 - I can't find \`${args}\` in the ban list**`)});
					}});




					client.on('message',message =>{
						let command = message.content.split(" ")[0];
						if (command == "m!nick") {
						if(!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`You Don't has premisson`)
						if(!message.guild.member(client.user).hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`**I Don\'t have \`MANAGE_NICKNAMES\` Permission**`)
						var user = message.guild.members.get(message.content.split(" ")[1]) || message.mentions.members.first();
						let MrNono = message.content.split(" ").slice(2).join(" ");
						if(!user) return message.channel.send(`**:rolling_eyes: I can't find this member**`);
						if(!MrNono) {
						user.setNickname("",`By : ${message.author.tag}`)
						.catch(MrNoNo =>{});
						return message.channel.send(`**✅ ${user}'s nick has been reset.**`);
						}user.setNickname(MrNono,`By : ${message.author.tag}`)
						.catch(NoNo =>{});
						message.channel.send(`✅ Done changed ${user} nickname to **\`${MrNono}\`**`);}});














						client.on('message', message => {                      
							if(!message.channel.guild) return;
							   if(message.content.startsWith('m!colors')) {
							   if(!message.channel.guild) return message.channel.send('**This is only for servers**').then(m => m.delete(5000));
							   message.channel.sendFile(`https://image.prntscr.com/image/Kg_MFmuqS7yOaPgjAPbD5A.png`).then(msg => {
							   
							   
							   
								msg.react('🖤').then(r=>{
								msg.react('❤').then(r=>{
								msg.react('💛').then(r=>{
								msg.react('💚').then(r=>{
								msg.react('💙').then(r=>{
								msg.react('🐸').then(r=>{
								msg.react('💩').then(r=>{
								msg.react('😡').then(r=>{
								msg.react('😈').then(r=>{
								msg.react('💀').then(r=>{
								msg.react('😜').then(r=>{
								msg.react('❌').then(r=>{
						 
						 
							   
						   
						 
						 
						   
							 
							 let activeFilter = (reaction, user) => reaction.emoji.name === '🖤' && user.id === message.author.id;
							 
							   let active = msg.createReactionCollector(activeFilter, { time: 15000 });
							 
															//red                    
													   active.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "Black"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#000000")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 
						})
						 
						 
						//لون اسود
						 
						 
						 let y1Filter = (reaction, user) => reaction.emoji.name === '❤' && user.id === message.author.id;
							 
							   let y1 = msg.createReactionCollector(y1Filter, { time: 15000 });
							 
															//t                    
													   y1.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "D-Red"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#FF0000")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 
						 
						 
						   })
						 
						 //لون احمر
						let y2Filter = (reaction, user) => reaction.emoji.name === '💛' && user.id === message.author.id;
							 
							   let y2 = msg.createReactionCollector(y2Filter, { time: 15000 });
							 
																		   
													   y2.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "Yellow"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#e7fa02")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 
						 
						 
													   })
													   
													   //الون الاخضر
						 
						let dgFilter = (reaction, user) => reaction.emoji.name === '💚' && user.id === message.author.id;
							 
							   let dg = msg.createReactionCollector(dgFilter, { time: 15000 });
							 
																		   
													   dg.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "D-Green"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#09fa2a")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 })
							//الون اللبني
						 
						let aqFilter = (reaction, user) => reaction.emoji.name === '💙' && user.id === message.author.id;
							 
							   let aq = msg.createReactionCollector(aqFilter, { time: 15000 });
							 
																		   
													   aq.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "Aqua"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#00BFFF")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						})
						   //الون الازرق فاتح
						 
						let grFilter = (reaction, user) => reaction.emoji.name === '🐸' && user.id === message.author.id;
							 
							   let gr = msg.createReactionCollector(grFilter, { time: 15000 });
							 
																		   
													   gr.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "Green"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#00FF00")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 
						})
								 
						let brFilter = (reaction, user) => reaction.emoji.name === '💩' && user.id === message.author.id;
							 
							   let br = msg.createReactionCollector(brFilter, { time: 15000 });
							 
																		   
													   br.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "Brown"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#3B170B")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 
						})
						 
						let reFilter = (reaction, user) => reaction.emoji.name === '😡' && user.id === message.author.id;
							 
							   let re = msg.createReactionCollector(reFilter, { time: 15000 });
							 
																		   
													   re.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "Red"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#FF0000")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 
						})
								 
						let prFilter = (reaction, user) => reaction.emoji.name === '😈' && user.id === message.author.id;
							 
							   let pr = msg.createReactionCollector(prFilter, { time: 15000 });
							 
																		   
													   pr.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "Purple"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#A901DB")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 
						})
						 
						let whFilter = (reaction, user) => reaction.emoji.name === '💀' && user.id === message.author.id;
							 
							   let wh = msg.createReactionCollector(whFilter, { time: 15000 });
							 
																		   
													   wh.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "White"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#ffffff")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 
						})
						 
						let orFilter = (reaction, user) => reaction.emoji.name === '😜' && user.id === message.author.id;
							 
							   let or = msg.createReactionCollector(orFilter, { time: 15000 });
							 
																		   
													   or.on("collect", r => {
														   message.member.addRole(message.guild.roles.find("name", "Orange"))
														   
														   
												   
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("#FFBF00")
						 
							  .setDescription("**:art:Enjoy Your Color :)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 
						})
						 
						let y6Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
							 
							   let y6 = msg.createReactionCollector(y6Filter, { time: 15000 });
							 
																		   
													   y6.on("collect", r => {
														   message.member.removeRole(message.guild.roles.find("name", "black"))
														   message.member.removeRole(message.guild.roles.find("name", "D-Red"))
														   message.member.removeRole(message.guild.roles.find("name", "Yellow"))
														   message.member.removeRole(message.guild.roles.find("name", "D-Green"))
														   message.member.removeRole(message.guild.roles.find("name", "Aqua"))
														   message.member.removeRole(message.guild.roles.find("name", "Green"))
														   message.member.removeRole(message.guild.roles.find("name", "Brown"))
														   message.member.removeRole(message.guild.roles.find("name", "Red"))
														   message.member.removeRole(message.guild.roles.find("name", "Purple"))
														   message.member.removeRole(message.guild.roles.find("name", "White"))
														   message.member.removeRole(message.guild.roles.find("name", "Orange"))                
														 
						 
							 const embed = new Discord.RichEmbed()
							  .setColor("RANDOM")
						 
							  .setDescription("**:art:Color Removed:)**")
							  .setFooter(message.author.tag , message.author.avatarURL)
						 
						message.channel.sendEmbed(embed).then();
						 
						 
													   })
								})
						})
						})
							   
						})
						})
						})
						})
						})
						})
						})
						})
						})                            
														   })
							   }
														   
														   });

client.on('message', message => {
if(message.content.startsWith('m!info')) {
var ping = `${Date.now() - message.createdTimestamp}`
let info = new Discord.RichEmbed()
.setColor('BLUE')
.setAuthor(`${client.user.tag} info`, client.user.avatarURL)
.setDescription(`**Bot ping: \`${ping}\`\n\nServers Size: \`${client.guilds.size}\`\n
Bot Owner's: <@341343814415286272> <@583343680778272783> <@462025609447473172> **`) 
message.channel.send(info)
}
});

client.on('message', message => {
	if (message.content === 'm!twitter') {
	  message.react(`❤`)
		message.channel.sendMessage("https://twitter.com/masterguardbot")
	}
  });
														   
  client.on('message', message => {
	if (message.content === 'm!support') {
	  message.react(`❤`)
		message.channel.sendMessage("https://discord.gg/cnPKPU")
	}
  });
		
  















  client.on('message', message => {
    if (message.guild) return undefined;
    var roomid = "620636650258563078";
    var room = client.channels.get(roomid);
    if (!room) return undefined;
    var emb = new Discord.RichEmbed()
    .setColor("#36393e")
    .setAuthor(message.author.username,message.author.displayAvatarURL)
    .setDescription(`**Message From ${message.author} In The Bot DM**\n\`\`\`apache\nMessage; ${message.content}\`\`\``)
    .setThumbnail(message.author.displayAvatarURL)
    .setTimestamp();
    room.send(emb);
});



client.on('message', async message => {
 
   if (message.content.startsWith("m!new")) {  
        const reason = message.content.split(" ").slice(1).join(" ");  
        if (!message.guild.roles.exists("name", "▪️ Support")) return message.channel.send(`\`Support\`Error`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    /// ALPHA CODES
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "▪️ Support");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });  
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: Ticket Created, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(d1631e)
                .addField(`Hey ${message.author.username}!`, `:white_check_mark:  Ticked Created  , #ticket`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith("m!close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
       message.channel.send(`  Please Type : =  confirm To Close It`)
           .then((m) => {
               message.channel.awaitMessages(response => response.content === 'confirm', {
                       max: 1,
                       time: 10000,
                       errors: ['time'],
                   })  
                   .then((collected) => {
                       message.channel.delete();
                   })  
                   .catch(() => {
                       m.edit('Error').then(m2 => {
                           m2.delete();
                       }, 3000);
                   });
           });
   }
 
});
 
const devs = ["341343814415286272","583343680778272783"]
const adminprefix = "1";
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;
     
  if (message.content.startsWith(adminprefix + 'ply')) {
    client.user.setGame(argresult);
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
    if (message.content === (adminprefix + "leave")) {
    message.guild.leave();        
  } else  
  if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else    
    if (message.content.startsWith(adminprefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.sendMessage(`**${argresult}** : Done :>`)
  return message.reply("**You Can't Change Your Name ,Only After Two Hours :>**");
  } else
    if (message.content.startsWith(adminprefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
        } else    
  if (message.content.startsWith(adminprefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/mohamedgamal");
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  }
 
  }); 
 
  client.on('message', message => {
    if(!message.channel.guild) return;
    if(message.content.startsWith('m!ping')) { // حقوق مداكس تو
        if (message.author.bot) return;
        if(!message.channel.guild) return;
        var Bping =`${Math.round(client.ping)}` // Mdax77x CopyRight | Toxic Codes
                const E1ping = new Discord.RichEmbed()
        .setTitle('ــــــــــــــــــــــــــــــ')
        .addField(`**BOT Ping Is** :__${Bping}📶__`,"ــــــــــــــــــــــــــــــ")
        .setFooter(`Requested by | ${message.author.tag}`) // حقوق مداكس
        .setColor('RANDOM')
        message.channel.send(E1ping);
    }
});

client.login(process.env.BOT_TOKEN);
