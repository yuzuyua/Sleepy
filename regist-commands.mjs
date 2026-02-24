import fs from "fs";
import path from "path";
import { REST, Routes } from "discord.js";

export default async function CommandsRegister(client) {

const MODE = process.env.COMMAND_MODE || "deploy";

  
  const commandsGlobal = [];
  const commandsSaba = [];
  const commandsPath = path.join(process.cwd(), "commands");

  console.log("=== Command Loader Debug ===");
  console.log("commandsPath:", commandsPath);
  console.log("files in commandsPath:", fs.readdirSync(commandsPath));
  console.log("============================");
  
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".mjs"));

  
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    
    if (command.data) {
      
         //重複コマンドがあったら登録をスキップ
      if (client.commands.has(command.data.name)) {
        console.warn(`⚠ 重複コマンド名: ${command.data.name}（${file}）`);
        continue;
      }
      
      if (command.devOnly){
        commandsSaba.push(command.data.toJSON());
      } else {
        commandsGlobal.push(command.data.toJSON());
      }
      
      client.commands.set(command.data.name, command);
      console.log(`よみこみ完了！: ${command.data.name}`);
    }
 }
  
  //コマンド削除モード
if( MODE === "delete"){
  console.log("コマンド削除モード");
  
  try{
    console.log("ギルドコマンド削除中…")
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body : [] }
    );

    console.log("グローバルコマンド削除中...")
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body : [] }
    );
  
    console.log("全コマンド削除完了！");
  } catch (error){
    console.error("削除失敗…", error);
  }
  return;
}
  

  try {
  console.log(`鯖内用コマンド登録: ${commandsSaba.length}件`);
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commandsSaba }
  );

  console.log(`Global コマンド登録: ${commandsGlobal.length}件`);
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commandsGlobal }
  );
    
    console.log("登録完了！");
  } catch (error) {
    console.error("失敗…:", error);
  }
}
