
const StateModel = require("../models/State");
/**
 * Get all states
 *
 * returns array of State objects
 * */

exports.getStates = function getStates() {
    return StateModel.query();
  };