
const SportsbookModel = require("../models/Sportsbook");

/**
 * Get all sportsbooks
 *
 * returns array of Sportsbook objects
 * */ 

exports.getSportsbooks = function getSportsbooks() {
    return Sportsbook.query();
  };