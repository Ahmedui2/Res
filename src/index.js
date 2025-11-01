import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js';
import { initializeDatabases } from './config/database.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildWebhooks
  ],
  partials: [Partials.Channel, Partials.Message, Partials.GuildMember]
});

client.commands = new Collection();
client.tempData = {};

async function loadCommands() {
  const commandsPath = join(__dirname, 'commands');
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(`file://${filePath}`);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      console.log(`✅ Loaded command: ${command.data.name}`);
    }
  }
}

async function loadEvents() {
  const eventsPath = join(__dirname, 'events');
  
  const loadEventFiles = async (path) => {
    const entries = readdirSync(path, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(path, entry.name);
      
      if (entry.isDirectory()) {
        await loadEventFiles(fullPath);
      } else if (entry.name.endsWith('.js')) {
        const event = await import(`file://${fullPath}`);
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          client.on(event.name, (...args) => event.execute(...args));
        }
        console.log(`✅ Loaded event: ${event.name}`);
      }
    }
  };

  await loadEventFiles(eventsPath);
}

async function startBot() {
  try {
    console.log('🚀 Starting Discord Protection Bot...');
    
    await initializeDatabases();
    
    await loadCommands();
    await loadEvents();

    const token = process.env.DISCORD_TOKEN;
    if (!token) {
      console.error('❌ DISCORD_TOKEN is required! Please set it in your environment.');
      process.exit(1);
    }

    await client.login(token);
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
  console.error('Uncaught exception:', error);
});

startBot();
