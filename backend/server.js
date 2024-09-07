const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Endpoint to get Facebook User Data
app.get('/api/fb-user-data', async (req, res) => {
    const accessToken = req.query.accessToken;
    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }
    try {
        const userProfile = await axios.get(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${accessToken}`);
        res.json(userProfile.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user data' });
    }
});
  
// Endpoint to get Facebook Pages
app.get('/api/fb-pages', async (req, res) => {
    const accessToken = req.query.accessToken;
    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }
    try {
        const pages = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`);
        res.json(pages.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching pages' });
    }
});
  
// Endpoint to get Facebook Page Insights
app.get('/api/fb-page-insights', async (req, res) => {
    const { accessToken, pageId } = req.query;
    if (!accessToken || !pageId) {
        return res.status(400).json({ error: 'Access token and pageId are required' });
    }
    try {
        const insights = await axios.get(`https://graph.facebook.com/${pageId}/insights?access_token=${accessToken}`);
        res.json(insights.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching page insights' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
