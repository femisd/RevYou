const express = require('express')
const router = express.Router()
const contentModel = require('../models/content');

//  Getting all content
router.get('/', async (req, res) => {
    try {
        const content = await contentModel.find()
        res.status(200).json(content)
    } catch (err) {
        // RIP... server has died
        res.status(500).json({ message: err.message })
    }
});

// Getting one content
router.get('/:id', getContent, async (req, res) => {
    res.status(200).json(res.content)
});

// Creating new content
router.post('/', async (req, res) => {

    const content = new contentModel({
        userId: req.body.userId,
        username: req.body.username,
        contentTitle: req.body.contentTitle,
        contentBody: req.body.contentBody,
        imageLink: req.body.imageLink
    });

    try {
        const newContent = await content.save();
        res.status(200).json(newContent)
    } catch (err) {
        // Failed because of bad data.
        res.status(400).json({ message: err.message })
    }
});


// Updating content
// NOTE: DO NOT USE PUT PLS! we don't want to wipe the existing content!
router.patch('/:id', getContent, async (req, res) => {
    if (req.body.contentTitle != null) {
        res.content.contentTitle = req.body.contentTitle
    }

    if (req.body.contentBody != null) {
        res.content.contentBody = req.body.contentBody
    }

    if (req.body.imageLink != null) {
        res.content.imageLink = req.body.imageLink
    }

    if (req.body.likes != null) {
        res.content.likes = req.body.likes
    }

    if (req.body.likedByUsers != null){ 
        res.content.likedByUsers = req.body.likedByUsers
    }

    try {
        const updatedContent = await res.content.save()
        res.status(200).json(updatedContent)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

//Deleting content
router.delete('/:id', getContent, async (req, res) => {
    try {
        await res.content.remove()
        res.status(200).json({ message: 'Deleted content' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});



// Middleware function for getting content from response
// Basically just puts the whole content obj in the response so we don't have to reassemble it field by field
//NOTE: This directly calls the response obj of the request using the schema defined in the model!
// Use a new function in the route file for each specific schema, do not export this one pls.  
async function getContent(req, res, next) {
    let content;
    try {
        // 
        content = await contentModel.findById(req.params.id)
        if (content == null) {
            // ID did not match
            return res.status(404).json({ message: 'Cannot find content by provided ID' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.content = content;
    next();
}

module.exports = router