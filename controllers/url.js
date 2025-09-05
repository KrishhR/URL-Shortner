import { nanoid } from 'nanoid';
import URLModel from '../models/url.js';

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body || !body.redirectURL) {
        return res.status(400).json({ status: 400, error: 'Invalid request. Missing redirectURL in request body.' });
    }
    // generate a shortId
    const shortId = nanoid(8);
    await URLModel.create({
        shortId: shortId,
        redirectURL: body.redirectURL,
        visitHistory: [],
        createdBy: req.user._id
    })

    return res.render('home', {
        shortId: shortId,
    })
    // return res.status(201).json({ status: 201, shortId: shortId });
}

async function handleRedirectToOriginalUrl(req, res) {
    const shortId = req.params.shortId;
    if (!shortId) {
        return res.status(400).json({ status: 400, error: 'Invalid request. Missing shortId in request params.' });
    }
    const urlEntry = await URLModel.findOneAndUpdate(
        { shortId: shortId },
        {
            $push: { visitHistory: [{ timeStamp: Date.now() }] }
        }
    );
    if (!urlEntry) {
        return res.status(404).json({ status: 404, error: 'No URL entry found for the given shortId.' });
    }
    return res.status(200).redirect(urlEntry.redirectURL);
}

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    if (!shortId) {
        return res.status(400).json({ status: 400, error: 'Invalid request. Missing shortId in request params.' });
    }
    const urlEntry = await URLModel.findOne({ shortId: shortId });
    if (!urlEntry) {
        return res.status(404).json({ status: 404, error: 'No URL entry found for the given shortId.' });
    }
    return res.status(200)
        .json({
            status: 200,
            shortenUrl: `${process.env.BASE_URL}/${urlEntry.shortId}`,
            totalClicks: urlEntry.visitHistory.length,
            analytics: urlEntry.visitHistory
        });
}

export default {
    handleGenerateNewShortUrl,
    handleRedirectToOriginalUrl,
    handleGetAnalytics,
};

