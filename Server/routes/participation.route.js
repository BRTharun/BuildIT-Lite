let middleware = require("../util/middleware.js");

module.exports = (app) => {
  const participation = require("../controllers/participation.controller.js");

  // Create a new participation
  app.post("/participations", middleware.checkToken, participation.create);

  // Retrieve all participations
  app.get("/participations", middleware.checkTokenAdmin, participation.findAll);

  // Retrieve all participations per contestId in body
  app.post(
    "/participations/all",
    middleware.checkToken,
    participation.findContestPart
  );

  // leaderboard
  app.get(
    "/participations/leaderboard/:contestId",
    middleware.checkToken,
    participation.leaderboard
  );

  // Retrieve all participations for users in a contest
  app.get(
    "/participations/:contestId",
    middleware.checkToken,
    participation.findUser
  );

  // Retrieve all participations for users in a contest
  app.get(
    "/mcqParticipations/:contestId",
    middleware.checkToken,
    participation.findMcqParticipation
  );

  // Create a new participation
  app.post(
    "/mcqParticipations",
    middleware.checkToken,
    participation.createMcq
  );

  // Generate score
  app.get(
    "/generate_score/:contestId",
    middleware.checkToken,
    participation.saveResult
  );

  app.post("/endContest", middleware.checkToken, participation.endContest);

  app.post('/changeValidTime',participation.changeValidTime);
};
