const supertest = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("appointment app", () => {
  it("should return the list of current events", () => {
    supertest(app)
      .get("/api/events")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedEvents = [
          {
            id: "1",
            name: "Tortas Event",
          },
          { id: "2", name: "Another Tortas Event" },
        ];

        expect(res.body.events).to.deep.equal(expectedEvents);
      });
  });

  it("should return an event by id", () => {
    supertest(app)
      .get("/api/events/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedEvent = {
          id: "1",
          name: "Tortas Event",
        };

        expect(res.body).to.deep.equal(expectedEvent);
      });
  });

  it("should return 404 when you try to find a non existent event by id", () => {
    supertest(app)
      .get("/api/events/100")
      .expect(404)
      .end((err, res) => {
        if (err) {
          throw err;
        }
      });
  });

  it("should create a new event and return the recently created event in the response", () => {
    supertest(app)
      .post("/api/events")
      .send({
        name: "Ksquare Party",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedName = "Ksquare Party";
        expect(res.body.event.id).to.be.ok;
        expect(res.body.event.name).to.equal(expectedName);
      });
  });

  it("should try to create a new event without a name and return an error", () => {
    supertest(app)
      .post("/api/events")
      .send({
        name: "",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should try to create a new event with an undefined name and return an error", () => {
    supertest(app)
      .post("/api/events")
      .send({
        name: undefined,
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should delete an existing event", () => {
    supertest(app)
      .delete("/api/events/1")
      .expect(204)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should try to delete a non existing event and return an error", () => {
    supertest(app)
      .delete("/api/events/3")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should update an existing event and return the updated version", () => {
    supertest(app)
      .put("/api/events/2")
      .send({ name: "Updated Another Tortas Event" })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedName = "Updated Another Tortas Event";
        expect(res.body.event.id).to.be.ok;
        expect(res.body.event.name).to.equal(expectedName);
      });
  });

  it("should try to update an existing event with an empty name and return an error", () => {
    supertest(app)
      .put("/api/events/2")
      .send({ name: "" })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should try to update an existing event with an undefined name and return an error", () => {
    supertest(app)
      .put("/api/events/2")
      .send({ name: undefined })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should try to update a non existing event and return an error", () => {
    supertest(app)
      .put("/api/events/5")
      .send({ name: "Updated Another Tortas Event" })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });
});
