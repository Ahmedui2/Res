# 🛡️ Discord Protection Bot

Ultra-fast Discord protection bot with parallel processing and real-time protection against malicious tools.

## ⚡ Features

### Channel Protection (14 Types)
- ✅ Create Channel
- ✅ Delete Channel (Auto-recovery with messages)
- ✅ Change Name
- ✅ Change Topic
- ✅ Change Permissions
- ✅ Change Region
- ✅ Change Slowmode
- ✅ Change NSFW
- ✅ Change Bitrate
- ✅ Change User Limit
- ✅ Create Webhook
- ✅ Delete Webhook
- ✅ Change Category
- ✅ Change Position

### Coming Soon
- 👥 Role Protection
- 💬 Chat Protection
- 🏰 Server Protection
- 🛠️ Mod Protection

## 🚀 Performance

- **Bulk Recovery**: 100+ channels in < 1 second
- **Rate Limit Check**: < 1ms (Redis)
- **Message Cache**: Last 200 messages per channel
- **Parallel Processing**: All actions executed simultaneously

## 📋 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file or use the ask_secrets tool:
```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_client_id
REDIS_URL=redis://localhost:6379
```

### 3. Deploy Commands
```bash
node src/deploy-commands.js
```

### 4. Start Bot
```bash
npm start
```

## 🎮 Usage

### Prefix Commands (!)
```
!protection  - فتح نظام الحماية | Open protection system
!help        - عرض المساعدة | Show help
!حماية       - نفس !protection
```

### Slash Commands (/)
```
/protection  - Same as !protection
```

### الاستخدام | How to Use:
1. استخدم `!protection` أو `/protection`
2. اختر نوع الحماية من المنيو
3. اضغط على الحماية لتفعيلها/تعطيلها
4. حدد الحدود عبر المودال
5. اختر العقوبات من زر "Set Punishments"
6. حدد قنوات اللوق من زر "Set Logs"

## ⚙️ Punishments

- 🔴 Remove All Roles
- ⏱️ Timeout (10 minutes)
- 👢 Kick
- 🔨 Ban
- ♻️ Revert Only (no punishment)

## 🏗️ Architecture

- **Memory Cache**: Map/Set for O(1) lookups
- **Redis**: Ultra-fast rate limiting
- **Parallel Processing**: Promise.all for bulk operations
- **Event-Driven**: No delays, instant response

## 📊 Directory Structure

```
src/
├── commands/          # Slash commands
├── components/        # Buttons, menus, modals
├── config/           # Constants & database
├── events/           # Event handlers
├── handlers/         # Cache, rate limit, punishment, recovery
└── utils/            # Embed builders, helpers
```

## 🔒 Security

- No secrets in code
- Environment-based configuration
- Audit log verification
- Bot action filtering

## 📝 License

MIT
