const aiService = require('../services/ai.service');
const usageModel = require('../models/usage.models');
async function aiResponse(req, res) {
    const { prompt, model } = req.body;
    if (!prompt || !model) {
        return res.status(400).json({ message: "Prompt and model are required" })
    }
    try {
        const response = await aiService.generateResponse(prompt, model);
        const usage = req.usageRecord;
        if (!usage) {
            await usageModel.create({ identifier: req.identifier, usage: 1, date: req.today });
        } else {
            usage.usage += 1;
            await usage.save();
        }
        res.send(response);
    } catch (error) {
        console.error('Error interacting with AI:', error);
        res.status(500).json({ message: "Failed to generate response", error: error.message });
    }
}

module.exports = { aiResponse };