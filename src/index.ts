import OpenAI from 'openai';
import dotenv from 'dotenv';
import { createAssistant } from './openai/createAssistant';
import { createThread } from './openai/createThread';
import { createRun } from './openai/createRun';
import { performRun } from './openai/performRun';

dotenv.config();

async function main() {
    if (!process.env.AI_API_KEY) {
        console.error('Error: AI_KEY is not set in the environment variables.');
        process.exit(1);
    }
    const client = new OpenAI({
        apiKey: process.env.AI_API_KEY,
        baseURL: process.env.AI_API_URL || 'https://api.openai.com/v1',
    });
    // const assistants = await createAssistant(client);
    // console.log("assistant created",assistants)
    const message = "Do I have sufficient Eth in the following account to make transfer eth 0x42097c7a271090e367e9Ab7f44EEfaA24c19436d & 0xa4F07F05a3AcB12A17934017f1644c55AC3CebAb "
    const thread = await createThread(client,message)

    const assistantId : string = process.env.ASSISTANT_ID as string;
    const run = await createRun(client,thread,assistantId)
    const result = await performRun(run,client,thread)

    console.log(result)
}
main();

