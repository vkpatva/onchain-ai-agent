import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from "../tools/allTools";


export async function createAssistant(client: OpenAI) : Promise<any>{
  return await client.beta.assistants.create({
    model: "gpt-4o-mini",
    name : "Onchain AI Agent",
    instructions:`You are in control of wallet that you can use to do whatever you want. 
    
    you can use the following tools to interact with the wallet: 
      - getBalance : get the balance of the wallet
    `,
    tools: Object.values(tools).map(tool=> tool.definition)
  })  
}