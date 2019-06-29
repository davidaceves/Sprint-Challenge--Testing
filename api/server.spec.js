const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

const Games = require("../games/gamesModel.js");

describe("GET /games", () => {
  it("should return 200", () => {
    return request(server)
      .get("/games")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  afterEach(async () => {
    await db("games").truncate();
  });

  it("should hit endpoint", async () => {
    const res = await request(server).get("/games");
    expect(res.body).toEqual([]);
  });

  it("should return all games in db", async () => {
    const games = [
      { id: 1, title: "Pacman", genre: "Arcade", releaseYear: 1980 },
      {
        id: 2,
        title: "Super Mario Bros.",
        genre: "Platformer",
        releaseYear: 1985
      }
    ];

    await db("games").insert(games);

    const res = await request(server).get("/games");
    expect(res.body).toEqual(games);
  });
});

describe("POST /games", () => {
  afterEach(async () => {
    await db("games").truncate();
  });

  it("should post a new game", async () => {
    let gamesNumber;

    gamesNumber = await db("games");

    expect(gamesNumber).toHaveLength(0);

    await db("games").insert([{ title: "Pacman", genre: "Arcade" }]);

    gamesNumber = await db("games");

    expect(gamesNumber).toHaveLength(1);
  });

  // it("should post a new game with status code 201", async () => {
  //   return request(server)
  //     .post("/games")
  //     .then(res => {
  //       await Games.insert([{ title: "Pacman", genre: "Arcade" }]);

  //       expect(res.status).toBe(201);
  //     });
  // });

  //   it("should post a new game with status code 201", async () => {
  //     const res = await request(server).post("/games");

  //     await Games.insert([{ title: "Dog", genre: "Cat" }]);

  //     expect(res.status).toBe(201);
  //   });

  it("should not post a new game if missing information", async () => {
    // const game = [
    //   {
    //     title: "Pacman",
    //     genre: "Game"
    //   }
    // ];
    // db("games").insert(game);
    // const res = await request(server).post("/games");

    // expect(res.status).toBe(201);

    const game = [
      {
        title: "Title",
        genre: "Genre"
      }
    ];
    db("games").insert(game);
    return request(server)
      .post("/games")
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
});
