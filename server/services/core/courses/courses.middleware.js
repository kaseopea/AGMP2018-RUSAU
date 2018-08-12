const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

  // get all courses
  router.get('/courses', (req, res, next) => {
    let url_parts = url.parse(req.originalUrl, true),
      query = url_parts.query,
      from = parseInt(query.start, 10) || 0,
      to = parseInt(query.start, 10) + parseInt(query.count, 10),
      sort = query.sort,
      queryStr = query.query,
      courses = server.db.getState().courses;

    courses.sort((a, b) => (new Date(b.date) - new Date(a.date)));

    if (!!query.textFragment) {
      courses = courses.filter((course) => course.name.concat(course.description).toUpperCase().indexOf(query.textFragment.toUpperCase()) >= 0);
    }

    if (courses.length < to || !to) {
      to = courses.length;
    }
    courses = courses.slice(from, to);

    res.json(courses);
  });

  return router;
};
