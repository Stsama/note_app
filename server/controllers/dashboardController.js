/**
 * GET
 * Dashboard
 */
exports.dashboard = async (req, res) => {
    const locals = {
      title: "NodeJs Notes",
      description: "Free NodeJs Notes App",
    };
    res.render("dashboard/index", {
        locals,
        layout: '../views/layouts/dashboard'
      });
  };
