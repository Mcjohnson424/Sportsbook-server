const axios = require("axios");
const pickBy = require("lodash/pickBy");
const identity = require("lodash/identity");
const { transaction } = require("objection");
const SportModel = require("../models/Sport");
const EventModel = require("../models/Event");
const LeagueModel = require("../models/League");

module.exports.fetchBets = {
  controller: async (req, res) => {
    try {
      const {
        data: { sports },
      } = await axios.get(
        "https://api-usa.pointsbet.com/api/v2/sports/list/02May2018"
      );
      const oldSports = await SportModel.query();
      const options = {
        insertMissing: true,
      };
      await transaction(SportModel, async (TBrand, trx) => {
        return await SportModel.query(trx).upsertGraph(
          sports
            .map((sport) =>
              pickBy(
                {
                  sport_name: sport.name,
                  external_id: sport.key,
                },
                identity
              )
            )
            .map((sport) => {
              const old = oldSports.find(
                (s) => s.external_id === sport.external_id
              );
              if (old) {
                return { ...sport, id: old.id };
              } else {
                return sport;
              }
            }),
          options
        );
      });
      console.log("sports inserted");
      const leagues = [];
      for (let sport of sports) {
        const {
          data: { locales },
        } = await axios.get(
          `https://api-usa.pointsbet.com/api/v2/sports/${sport.key}/competitions`
        );
        locales.forEach((locale) => {
          const { competitions } = locale;
          leagues.push(
            ...competitions.map((c) =>
              pickBy(
                {
                  league_name: c.name,
                  external_id: c.key,
                  external_sport_id: sport.key,
                },
                identity
              )
            )
          );
        });
      }
      const oldLeages = await LeagueModel.query();
      await transaction(LeagueModel, async (TBrand, trx) => {
        return await LeagueModel.query(trx).upsertGraph(
          leagues.map((sport) => {
            const old = oldLeages.find(
              (s) => s.external_id === sport.external_id
            );
            if (old) {
              return { ...sport, id: old.id };
            } else {
              return sport;
            }
          }),
          options
        );
      });
      console.log("leagues inserted");
      const events = [];
      for (let league of leagues) {
        const {
          data: { events: leagueEvents },
        } = await axios.get(
          `https://api-usa.pointsbet.com/api/v2/competitions/${league.external_id}/events/featured?includeLive=true`
        );
        events.push(
          ...leagueEvents.map(
            (event) =>
              pickBy({
                external_id: event.key,
                event_name: event.name,
                external_league_id: event.competitionKey,
                external_sport_id: event.sportKey,
                event_date_time: event.startsAt,
                home_team: event.homeTeam,
                away_team: event.awayTeam,
              }),
            identity
          )
        );
      }
      const oldEvents = await EventModel.query();
      await transaction(EventModel, async (TBrand, trx) => {
        return await EventModel.query(trx).upsertGraph(
          events.map((sport) => {
            const old = oldEvents.find(
              (s) => s.external_id === sport.external_id
            );
            if (old) {
              return { ...sport, id: old.id };
            } else {
              return sport;
            }
          }),
          options
        );
      });
      console.log("events inserted");
      return res.json({ success: true });
    } catch (e) {
      req.log.error(e);
      res.boom.badImplementation("Failed to fetch data");
    }
  },
};
