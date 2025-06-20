"use server";

import { GoogleGenAI } from "@google/genai";

const GEMINIAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
