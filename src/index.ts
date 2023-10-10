import { Conduit } from "@playful-systems/conduit";
import { executeSchema } from "./schemas";

type Options = {
  token: string;
}

export const createClient = (options: Options) => {
  const conduit = Conduit.create({
    baseURL: "https://prompt-manager-pro.com",
    headers: {
      authentication: options.token
    }
  })

  type Variables = Record<string, string | number>

  return {
    execute: (promptId: string) => async (variables: Variables) => {
      const response = await conduit.post(`/execute/${promptId}`, { variables })
      return executeSchema.parse(response.data).result
    },
    api: {
      view: async (promptId: string) => {
        const response = await conduit.get(`/api/prompts/${promptId}`)
        return response.data as Prompt
      },
      list: async () => {
        const response = await conduit.get(`/api/prompts/list`)
        return response.data as Prompts
      },
    }
  }
}

type Prompt = {
  name: string;
  variables: ({
    name: string;
    type: "string";
    minLength: number;
    maxLength: number;
  } | {
    name: string;
    type: "number";
    min: number;
    max: number;
  })[];
}

type Prompts = {
  promptId: string;
  name: string;
}[]