const db = require('../../db')

exports.list = {
    command: 'list',
    description: 'Display the list with all sounds.',
    callback: (message) => {
        let sound_list = '';
        db.get_sounds((sounds) => {
            for(let s of sounds) {
                sound_list += ('**» **' + s.name + '\n')
            }
            message.channel.send(sound_list)
        })
    }
}

exports.upload = {
    command: 'upload',
    description: 'Upload a sound to the bot',
    expected_args: '<sound name> <mp3 file as attachment>',
    attachment: true,
    role: 'Vip',
    callback: (message, args) => {
        let attachment = message.attachments.first()
        if(attachment.name.split('.')[1] == 'mp3') {
            if(attachment.size < 1001000) {
                db.insert_sound({name: args[0], url: attachment.url}, () => {
                    console.log(`-- ${args[0]} sound added to the list --`)
                    message.react('✔️')
                })
            }
            else message.reply('File too big or name too long.')
        }
        else message.reply('The file must be a mp3 file.')
    }
}

exports.remove = {
    command: 'remove',
    description: 'Remove a sound from the bot',
    expected_args: '<sound name>',
    role: 'Vip',
    callback: (message, args) => {
        db.remove_sound(args[0], () => {
            message.react('✔️')
        })
    }
}


exports.join = {
    command: 'join',
    description: 'Join the bot in your current voice channel.',
    callback: async (message) => {
        await message.member.voice.channel.join()
        
    }
}

exports.leave = {
    command: 'leave',
    description: 'Leave the bot from the voice channel.',
    callback: async (message) => {
        await message.member.voice.channel.leave()
    }
}





