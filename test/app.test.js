const request = require("supertest");
const server = require("../app"); 
const Profile = require("../model/profile.model");
const Comment = require("../model/comment.model");

describe("API Endpoints", () => {
  beforeAll(async () => {
    if (!server.listening) {
      await server.listen(0);
    }
  });

  afterAll(async () => {
    // Close the server after running the tests
    await server.close();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await Profile.deleteMany({});
    await Comment.deleteMany({});
  });

  describe("Profile Endpoints", () => {
    it("should create a new profile", async () => {
      const response = await request(server).post("/profile").send({
        name: "Test Profile",
        description: "Test Description",
        mbti: "ISFJ",
        enneagram: "9w3",
        variant: "sp/so",
        tritype: 725,
        socionics: "SEE",
        sloan: "RCOEN",
        psyche: "FEVL",
        image: "https://example.com/test-image.png",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Profile created successfully!");
      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data).toHaveProperty("name", "Test Profile");
      expect(response.body.data).toHaveProperty(
        "description",
        "Test Description"
      );
    });

    it("should retrieve a profile by ID", async () => {
      const testProfile = await Profile.create({
        name: "Test Profile",
        description: "Test Description",
        mbti: "ISFJ",
        enneagram: "9w3",
        variant: "sp/so",
        tritype: 725,
        socionics: "SEE",
        sloan: "RCOEN",
        psyche: "FEVL",
        image: "https://example.com/test-image.png",
      });
      const response = await request(server).get(`/profile/${testProfile._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Profile fetched successfully!");
      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data).toHaveProperty("name", "Test Profile");
      expect(response.body.data).toHaveProperty(
        "description",
        "Test Description"
      );
    });
  });

  describe("Comment Endpoints", () => {
    it("should create a new comment", async () => {
      const response = await request(server).post("/comment").send({
        text: "Test Comment",
        mbti: "INFP",
        enneagram: "4w5",
        zodiac: "Libra",
        likes: 0,
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Comments created successfully");
      expect(response.body.data).toHaveProperty("_id");
    });

    it("should retrieve comments with filtering and sorting", async () => {
      await Comment.create([
        {
          text: "Comment 1",
          mbti: "INFP",
          enneagram: "4w5",
          zodiac: "Libra",
          likes: 5,
        },
        {
          text: "Comment 2",
          mbti: "INTJ",
          enneagram: "5w4",
          zodiac: "Gemini",
          likes: 10,
        },
        {
          text: "Comment 3",
          mbti: "ENFP",
          enneagram: "7w6",
          zodiac: "Aries",
          likes: 2,
        },
      ]);

      const response = await request(server)
        .get("/comment")
        .query({ mbtiFilter: "INFP", sort: "best" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].text).toBe("Comment 1");
    });

    it("should vote on a comment", async () => {
      const testComment = await Comment.create({
        text: "Test Comment",
        mbti: "INFP",
        enneagram: "4w5",
        zodiac: "Libra",
        likes: 0,
      });

      const response = await request(server)
        .put(`/comment/${testComment._id}/vote`)
        .send({ mbti: "INTJ", enneagram: "5w4", zodiac: "Gemini" });

      expect(response.status).toBe(200);
      expect(response.body.mbti).toBe("INTJ");
      expect(response.body.enneagram).toBe("5w4");
      expect(response.body.zodiac).toBe("Gemini");
    });

    it("should like a comment", async () => {
      const testComment = await Comment.create({
        text: "Test Comment",
        mbti: "INFP",
        enneagram: "4w5",
        zodiac: "Libra",
        likes: 0,
      });

      const response = await request(server).put(
        `/comment/${testComment._id}/like`
      );

      expect(response.status).toBe(200);
      expect(response.body.likes).toBe(1);
    });
  });
});
