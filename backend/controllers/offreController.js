import Offre from "../models/Offre.js";
import OpenAI from "openai";

let openai;
function getOpenAIClient() {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

export const generateOffreWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ message: "Le texte est obligatoire." });
    }

    const systemPrompt = `Tu es un assistant qui transforme une courte description de poste en une offre d'emploi structurée.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ou après, sans balises markdown, au format exact suivant:
{
  "titre": "string",
  "description": "string (3-5 phrases, professionnelle, en français)",
  "lieu": "string (ville, pays — si non précisé, mets 'À définir')",
  "typeContrat": "CDI" | "CDD" | "STAGE" | "FREELANCE",
  "competencesRequises": [{ "nom": "string", "niveau": "string" }]
}`;

    const response = await getOpenAIClient().chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const rawText = response.choices[0].message.content.trim();

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      return res.status(502).json({
        message: "L'IA a renvoyé une réponse invalide, réessayez.",
      });
    }

    res.json(parsed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOffre = async (req, res) => {
  try {
    const offre = await Offre.create({
      ...req.body,
      recruteur: req.user._id,
    });

    res.status(201).json(offre);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllOffres = async (req, res) => {
  try {
    const offres = await Offre.find().populate("recruteur", "name email");

    res.json(offres);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOffreById = async (req, res) => {
  try {
    const offre = await Offre.findById(req.params.id);

    if (!offre) {
      return res.status(404).json({
        message: "Offre introuvable",
      });
    }

    res.json(offre);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateOffre = async (req, res) => {
  try {
    const offre = await Offre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!offre) {
      return res.status(404).json({
        message: "Offre introuvable",
      });
    }

    res.json(offre);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteOffre = async (req, res) => {
  try {
    const offre = await Offre.findByIdAndDelete(req.params.id);

    if (!offre) {
      return res.status(404).json({
        message: "Offre introuvable",
      });
    }

    res.json({
      message: "Offre supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
