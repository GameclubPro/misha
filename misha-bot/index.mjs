import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { Bot } from "grammy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const BOT_TOKEN = process.env.BOT_TOKEN?.trim();
const WEBAPP_URL = process.env.WEBAPP_URL?.trim();

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is missing; set it in misha-bot/.env");
}
if (!WEBAPP_URL) {
  throw new Error("WEBAPP_URL is missing; set it in misha-bot/.env");
}
try {
  new URL(WEBAPP_URL);
} catch {
  throw new Error("WEBAPP_URL is invalid; expected a full URL");
}

const bot = new Bot(BOT_TOKEN);
bot.catch((err) => {
  console.error("Bot error:", err);
});

bot.command("start", async (ctx) => {
  console.log("start", { from: ctx.from?.id });
  await ctx.reply("Жми кнопку и откроется Mini App:", {
    reply_markup: {
      keyboard: [[{ text: "🚀 Открыть Mini App", web_app: { url: WEBAPP_URL } }]],
      resize_keyboard: true,
    },
  });
});

bot.on("message:web_app_data", async (ctx) => {
  const data = ctx.message.web_app_data?.data;
  console.log("web_app_data", { from: ctx.from?.id, data });
  await ctx.reply(`Получил из Mini App: ${data}`);
});

bot.start();
