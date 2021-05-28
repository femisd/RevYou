const express = require('express')
const router = express.Router()
const profileModel = require('../models/profile');

//  Getting every profile
router.get('/', async (req, res) => {
    try {
        const profile = await profileModel.find()
        res.status(200).json(profile)
    } catch (err) {
        // RIP... server has died
        res.status(500).json({ message: err.message })
    }
});

router.get('/Category/:userId', getProfileByUserId, async (req, res) => {
    try {
        res.status(200).json(res.profile)
    } catch (err) {
        // RIP... server has died
        console.log("error returning profile with the given user ID")
        res.status(500).json({ message: err.message })
    }
});


// Creating new profile
router.post('/', async (req, res) => {

    const profile = new profileModel({
        userId: req.body.userId,
        userBio: req.body.userBio
    });

    try {
        const newProfile = await profile.save();
        res.status(200).json(newProfile)
    } catch (err) {
        // Failed because of bad data.
        res.status(400).json({ message: err.message })
    }
});


// Updating profile
router.patch('/:id', getProfile, async (req, res) => {
    if (req.body.userId != null) {
        res.profile.userId = req.body.userId
    }

    if (req.body.userBio != null) {
        res.profile.userBio = req.body.userBio
    }

    try {
        const updatedProfile = await res.profile.save()
        res.status(200).json(updatedProfile)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

//Deleting profile
router.delete('/:id', getProfile, async (req, res) => {
    try {
        await res.profile.remove()
        res.status(200).json({ message: 'Deleted profile' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

// This is the database ID, different to Auth0 user ID.
async function getProfile(req, res, next) {
    let profile;
    try {
        profile = await profileModel.findById(req.params.id)
        if (content == null) {
            // ID did not match
            return res.status(404).json({ message: 'Cannot find profile by provided ID' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.profile = profile;
    next();
}

// This is the actual user ID
async function getProfileByUserId(req, res, next) {
    let profile;
    try {
        // 
        // console.log(req.params.SelectedCat)
        profile = await profileModel.find({profileCategory: req.params.SelectedCat})
        if (profile == null) {
            // ID did not match
            return res.status(404).json({ message: 'Cannot find profile by provided category' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.profile = profile;
    next();
}

module.exports = router