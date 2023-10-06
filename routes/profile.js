"use strict";

const express = require("express");
const Profile = require("../model/profile.model");
const Comment = require("../model/comment.model");
const router = express.Router();

const profiles = [
  {
    id: 1,
    name: "A Martinez",
    description: "Adolph Larrue Martinez III.",
    mbti: "ISFJ",
    enneagram: "9w3",
    variant: "sp/so",
    tritype: 725,
    socionics: "SEE",
    sloan: "RCOEN",
    psyche: "FEVL",
    image: "https://soulverse.boo.world/images/1.png",
  },
];

module.exports = function () {
  // create a profile
  router.post("/profile", async (req, res) => {
    try {
      const {
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image,
      } = req.body;
      const newProfile = await Profile.create({
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image: "https://soulverse.boo.world/images/1.png",
      });

      res.status(201).json({
        message: "Profile created successfully!",
        data: newProfile,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to create profile" });
    }
  });

  // get a profile by Id
  router.get("/profile/:id", async function (req, res) {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      // res.render("profile_template", { profile });
      res.status(200).json({
        message: "Profile fetched successfully!",
        data: profile,
      });
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve profile" });
    }
  });

  // Create a new comment
  router.post("/comment", async (req, res) => {
    try {
      const newComment = await Comment.create(req.body);
      res.status(201).json({
        message: "Comments created successfully",
        data: newComment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to create comment" });
    }
  });

  // Get comments with filtering, sorting, and voting
  router.get("/comment", async (req, res) => {
    const { mbtiFilter, enneagramFilter, zodiacFilter, sort } = req.query;

    const filter = {};
    if (mbtiFilter) filter.mbti = mbtiFilter;
    if (enneagramFilter) filter.enneagram = enneagramFilter;
    if (zodiacFilter) filter.zodiac = zodiacFilter;

    let sortOption = { createdAt: -1 }; // Sort by most recent by default
    if (sort === "best") sortOption = { likes: -1 };

    try {
      const comments = await Comment.find(filter).sort(sortOption);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch comments" });
    }
  });

  // Vote on a comment
  router.put("/comment/:id/vote", async (req, res) => {
    const { mbti, enneagram, zodiac } = req.body;
    const { id } = req.params;

    try {
      const comment = await Comment.findByIdAndUpdate(
        id,
        { mbti, enneagram, zodiac },
        { new: true }
      );
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "Unable to update comment" });
    }
  });

  // Like a comment
  router.put("/comment/:id/like", async (req, res) => {
    const { id } = req.params;

    try {
      const comment = await Comment.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } }, // Increment the likes count by 1
        { new: true }
      );
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "Unable to update comment" });
    }
  });

  return router;
};
