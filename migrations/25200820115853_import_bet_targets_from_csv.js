
const fs = require("fs");
const path = require("path");
const pickBy = require("lodash/pickBy");
const identity = require("lodash/identity");
const parse = require("csv-parse");

exports.up = function(knex) {
    return Promise.resolve().then(async () => {
        try {
          const csvPromise = (cPath) =>
            new Promise((resolve, reject) => {
              fs.readFile(cPath, (err, fileData) => {
                if (err) return reject(err);
  
                parse(fileData, { columns: true }, (parseErr, rows) => {
                  if (parseErr) return reject(parseErr);
  
                  resolve(rows);
                });
              });
            });
          const betTargetsPath = path.join(
            __dirname,
            "../seeds/bet_targets_sample_EA.csv"
          );
  
          const betTargets = (
            await csvPromise(betTargetsPath)
          ).map((betTarget) => pickBy(betTarget, identity));
        
          await knex("bet_targets").insert(betTargets);
          console.log("bet targets inserted");
        } catch (e) {
          console.log(e);
        }
      });
  
};

exports.down = function(knex) {
  
};
