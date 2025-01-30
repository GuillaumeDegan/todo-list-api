import { jest } from "@jest/globals";
import request from "supertest";
import app from "../../index.js";

describe("Testing task requests", () => {
  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("Create a task", async () => {
    const response = await request(app).post("/api/v1/tasks").send({
      _id: "1",
      title: "Acheter du lait",
      completed: false,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: "1",
          title: "Acheter du lait",
          completed: false,
        }),
      ])
    );
  });

  test("Get all tasks", async () => {
    const response = await request(app).get("/api/v1/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("Get a task by ID", async () => {
    const response = await request(app).get("/api/v1/tasks/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      _id: "1",
      title: "Acheter du lait",
      completed: false,
    });
  });

  test("Update a task", async () => {
    const response = await request(app).patch("/api/v1/tasks/1").send({
      completed: true,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      _id: "1",
      title: "Acheter du lait",
      completed: true,
    });
  });

  test("Delete a task", async () => {
    const response = await request(app).delete("/api/v1/tasks/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      _id: "1",
      title: "Acheter du lait",
      completed: true,
    });
  });
});
