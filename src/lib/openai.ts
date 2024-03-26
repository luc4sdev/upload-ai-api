import 'dotenv/config'
import { OpenAI } from 'openai'

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    organization: 'org-SSA9Vu4Skx09oIlvBSCElVc7',
})