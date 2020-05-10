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

const another_valid_user = {
  email: "test@ns8.com",
  password: "passwordIsPizza",
  phone: "333-222-1111",
};

const valid_event = {
  id: 123,
  timestamp_utc: Date.now(),
  user_id: 1,
  type: "Login",
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

  it("Create User success with their testcase", async () => {
    const result = await request(app)
      .post(USERS_ENDPOINT)
      .send(another_valid_user);
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
    const recent_result = await request(app).get(EVENTS_ENDPOINT + "recent");
    const all_result = await request(app).get(EVENTS_ENDPOINT);
    expect(recent_result.text).toContain("Login");
    expect(recent_result.status).toEqual(200);
    expect(recent_result.text.length).toBeLessThan(all_result.text.length);
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

  it("Fail create Event-- no event type", async () => {
    let clone_event = valid_event;
    delete clone_event["type"];
    const result = await request(app).post(EVENTS_ENDPOINT).send(clone_event);
    expect(result.text).toContain("Bad Request");
    expect(result.status).toEqual(400);

    clone_event["type"] = "";
    const result2 = await request(app).post(EVENTS_ENDPOINT).send(clone_event);
    expect(result2.text).toContain("Bad Request");
    expect(result2.status).toEqual(400);
  });

  afterAll(async (done) => {
    server.close(done);
  });
});
