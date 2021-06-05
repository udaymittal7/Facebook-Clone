// Packages
const express = require('express');

// Databases
const User = require('../../database/Users/User');

// utils
const auth = require('../../utils/auth');

// initializing express router
const router = express.Router();

// update user
router.patch('updateUser/:id', auth, async (req, res) => {
  if (req.user.id === req.params.id) {
    const userFields = {};

    const {
      firstName,
      lastName,
      dob,
      bio,
      gender,
      contactNumber,
      lives,
      from,
      website,
      relationship,
      facebook,
      instagram,
      twitter,
      linkedIn,
      highSchool,
      university,
      movies,
      books,
      music,
      shows,
      hobbies,
      title,
      company,
    } = req.body;

    if (firstName) userFields.firstName = firstName;
    if (lastName) userFields.lastName = lastName;
    if (dob) userFields.dob = dob;
    if (lives) userFields.lives = lives;
    if (from) userFields.from = from;
    if (bio) userFields.bio = bio;
    if (gender) userFields.gender = gender;
    if (relationship) userFields.relationship = relationship;
    if (website) userFields.website = website;

    userFields.social = {};
    if (facebook) userFields.social.facebook = facebook;
    if (instagram) userFields.social.instagram = instagram;
    if (twitter) userFields.social.twitter = twitter;
    if (linkedIn) userFields.social.linkedIn = linkedIn;

    const newWork = {
      title,
      company,
    };

    const newEducation = {
      highSchool,
      university,
    };

    userFields.work = [];
    userFields.education = [];
    userFields.movies = [];
    userFields.books = [];
    userFields.music = [];
    userFields.shows = [];
    userFields.hobbies = [];
    userFields.contactNumber = [];

    userFields.work.unshift(newWork);
    userFields.education.unshift(newEducation);
    userFields.movies.unshift(movies);
    userFields.music.unshift(music);
    userFields.shows.unshift(shows);
    userFields.hobbies.unshift(hobbies);
    userFields.books.unshift(books);
    userFields.contactNumber.unshift(contactNumber);

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: userFields,
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'You can update only your account',
    });
  }
});

module.exports = router;
