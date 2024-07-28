const Note = require("../models/Note");
const mongoose = require("mongoose");
const { where } = require("../models/User");
// const User = require("../models/User");

/**
 * GET
 * Dashboard
 */
exports.dashboard = async (req, res) => {
  let perPage = 12;
  let page = parseInt(req.query.page) || 1;

  const locals = {
    title: "Dashboard",
    description: "Free NodeJS Notes App.",
  };

  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    
    const notes = await Note.aggregate([
      { $match: { user: userId } },
      { $sort: { updatedAt: -1 } },
      {
        $project: {
          title: { $substr: ["$title", 0, 15] },
          body: { $substr: ["$body", 0, 90] },
        },
      },
    ])
    .skip(perPage * (page - 1))
    .limit(perPage)
    .exec();

    const count = await Note.countDocuments({ user: userId });

    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage)
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};



/**
 * View Note
 * GET
 */

exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({_id: req.params.id})
  .where({user: req.user.id})
  .lean();

  if(note) {
    res.render('dashboard/view-note', {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard"
    });
  } else {
    res.send("Note not found");
  }
}


/**
 * Update Note
 * PUT
 */
exports.dashboardUpdateNote = async (req, res) => {
  try{
    await Note.findOneAndUpdate(
      {_id: req.params.id}, 
      {title: req.body.title, body: req.body.body, updatedAt: Date.now()})
      .where({user: req.user.id}
    );
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete Note
 * DELETE
 */
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({_id: req.params.id})
    .where({user: req.user.id});
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
};


/**
 * Add Note
 * GET
 */
exports.dashboardAddNote = async (req, res) => {
  res.render('dashboard/add', {
    layout: "../views/layouts/dashboard"
  });
}

/**
 * Add Note
 * POST
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
}


/**
 * Search Note
 * GET
 */

exports.dashboardSearch = async (req, res) => {
  res.render('dashboard/search', {
    searchResults: "",
    layout: "../views/layouts/dashboard"
  });
}

/**
 * Search Note
 * POST
 */
exports.dashboardSearchSubmit = async (req, res) => {
  let searchTerm = req.body.searchTerm;
  const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, '');
  try {
    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChars, 'i') } }
      ]
    }).where({user: req.user.id});
  
    res.render('dashboard/search', {
      searchResults,
      layout: "../views/layouts/dashboard"
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}