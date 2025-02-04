import { customAlphabet } from "nanoid";

export const generateEntityId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12);