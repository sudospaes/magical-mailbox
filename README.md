# Magical MailBox 🪄

A magic mailbox where people can deliver their mails to you anonymously. And you read them and answer . 😉 This mailbox also has some magical features. The sent letters can be edited or you can react to them. 🥰✨

**This mailbox does support:**

- 💬 Text
- 🔉 Voice/Audio
- 🎞 Video/Video note
- 🎆 Sticker/Gif
- 📁 Document
- 🥰 Reactions

## Commands

| Command  | Description                     | Accessibility |
| -------- | ------------------------------- | ------------- |
| /start   | Show supported formats          | All users     |
| /block   | Block a sender messages         | Admin         |
| /unblock | Unblock blocked sender messages | Admin         |

## Usage

How to use it is simple. The senders just need to send their message like a normal message and the admin just needs to reply to the messages he receives to answer them. You can also use the command "/block" and "/unblock" when replying to a message.

## Setup and deploy bot

1.  Install [Bun](https://bun.sh)
2.  Download latest version from [Releases](https://github.com/sudospaes/magical-mailbox/releases)
3.  Extract downloaded zip
4.  Move to extracted directory
5.  Run `bun i` to install dependencies
6.  Create `config.env` in the current directory and paste these in that

```env
token=your_telegram_bot_token
admin=your_user_id // You can get it from @userinfobot
```

7. Run `bun start`
