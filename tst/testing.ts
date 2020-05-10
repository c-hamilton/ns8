import { app, server } from "../src/index";
import request from "supertest";
import { AssertionError } from "assert";

const USERS_ENDPOINT = "/users/";
const EVENTS_ENDPOINT = "/events/";
const valid_user = {
  name: "Test User",
  email: "testy@tests.com",
  phonenumber: "650-400-8000",
  password: "supersecure",
};

const valid_event = {
  id: 123,
  timestamp_utc: Date.now(),
  user_id: 1,
};

describe("Test Users and Events", () => {
  it("Get Users", async () => {
    const result = await request(app).get(USERS_ENDPOINT);
    expect(result.text).toContain("Cassie");
    expect(result.text).toContain("Bob");
    expect(result.status).toEqual(200);
  });

  it("Get User by ID", async () => {
    const result = await request(app).get(USERS_ENDPOINT + "2");
    expect(result.text).toContain("Bob");
    expect(result.status).toEqual(200);
  });

  it("Create User success", async () => {
    const result = await request(app).post(USERS_ENDPOINT).send(valid_user);
    expect(result.text).toContain("Created");
    expect(result.status).toEqual(201);
  });

  it("Fail create User - no email", async () => {
    let clone_user = valid_user;
    delete clone_user["email"];
    const result = await request(app).post(USERS_ENDPOINT).send(valid_user);
    expect(result.text).toContain("Bad Request");
    expect(result.status).toEqual(400);
  });

  it("Fail create User- duplicate email", async () => {
    let clone_user = valid_user;
    clone_user["email"] = "bob@test.com";
    const result = await request(app).post(USERS_ENDPOINT).send(clone_user);
    expect(result.text).toContain("Bad Request");
    expect(result.status).toEqual(400);
  });

  it("Fail create User - bad phonenumber", async () => {
    let clone_user = valid_user;
    clone_user["phonenumber"] = "12345";
    const result = await request(app).post(USERS_ENDPOINT).send(valid_user);
    expect(result.text).toContain("Bad Request");
    expect(result.status).toEqual(400);
  });

  it("Get Recent Events", async () => {
    const result = await request(app).get(EVENTS_ENDPOINT);
    expect(result.text).toContain("Login");
    expect(result.status).toEqual(200);
  });

  it("Get Events by ID", async () => {
    const result = await request(app).get(EVENTS_ENDPOINT + "2");
    expect(result.text).toContain("created");
    expect(result.text).toContain("type");
    expect(result.status).toEqual(200);
  });

  it("Create Event", async () => {
    const result = await request(app).post(EVENTS_ENDPOINT).send(valid_event);
    expect(result.text).toContain("Created");
    expect(result.status).toEqual(201);
  });

  afterAll(async (done) => {
    server.close(done);
  });
});
