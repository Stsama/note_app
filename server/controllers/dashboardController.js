const Note = require("../models/note");
const mongoose = require("mongoose");

/**
 * GET
 * Dashboard
 */
exports.dashboard = async (req, res) => {
  const locals = {
    title: "NodeJs Notes",
    description: "Free NodeJs Notes App",
  };
  try {
    const notes = await Note.find({});
    res.render("dashboard/index", {
      username: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};
