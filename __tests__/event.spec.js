const app = require('../src/application');
const request = require('supertest');
const db = require("../src/models");
require('jest-extended');
require("jest-chain");

describe('Test suite for event Controller', () => {
    //Before running any test, clear db and run migrations with sequelize sync force
    //also populate the event model with dummy data for test
    beforeAll( async () => {
        await db.sequelize.sync({ force: true});
        await db.Event.bulkCreate([
            {
                "payload": {
                    "id": "00114a9f-00dc-4f39-a6ac-af1b7e0543e7",
                    "fluid": "caffeinated",
                    "observed": false,
                    "visit_id": "5cc23bf0-8b66-f8a8-4339-688e1d43e11a",
                    "timestamp": "2019-04-26T07:08:21.758Z",
                    "event_type": "fluid_intake_observation",
                    "caregiver_id": "220d9432-b5ed-4c81-8709-434899d2cd1b",
                    "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d",
                    "consumed_volume_ml": 230
                },
                "alert_id": null,
                "task_instance_id": null,
                "visit_id": "5cc23bf0-8b66-f8a8-4339-688e1d43e11a",
                "caregiver_id": "220d9432-b5ed-4c81-8709-434899d2cd1b",
                "payload_as_text": "{\"id\": \"00114a9f-00dc-4f39-a6ac-af1b7e0543e7\", \"fluid\": \"caffeinated\", \"observed\": false, \"visit_id\": \"5cc23bf0-8b66-f8a8-4339-688e1d43e11a\", \"timestamp\": \"2019-04-26T07:08:21.758Z\", \"event_type\": \"fluid_intake_observation\", \"caregiver_id\": \"220d9432-b5ed-4c81-8709-434899d2cd1b\", \"care_recipient_id\": \"df50cac5-293c-490d-a06c-ee26796f850d\", \"consumed_volume_ml\": 230}",
                "rejected_event_id": null,
                "observation_event_id": null,
                "timestamp": "2019-04-26T07:08:21.758Z",
                "id": "00114a9f-00dc-4f39-a6ac-af1b7e0543e7",
                "event_type": "fluid_intake_observation",
                "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d"
            },
            {
                "payload": {
                    "id": "006139b8-a387-4529-9280-2d798c500aeb",
                    "visit_id": "5cd753f0-8b66-f8a8-4591-3f78ca3f9c45",
                    "timestamp": "2019-05-12T07:23:12.789Z",
                    "event_type": "task_completed",
                    "caregiver_id": "5c9090ab-7d5e-4a72-8bf7-197190ad4c98",
                    "task_instance_id": "dHxmMjU2YmFlYS1jODEyLTRjZWMtOTUxNC0wYzc5YjNjZmQwMzN8MjAxOS0wNS0xMlQwNzowMDowMC4wMDBafE1PUk5JTkc=",
                    "task_schedule_id": "f256baea-c812-4cec-9514-0c79b3cfd033",
                    "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d",
                    "task_definition_id": "1bf3b81d-40b0-4539-ba96-9ea12ad6110b",
                    "task_schedule_note": "Please assist me to brush my teeth",
                    "task_definition_description": "Assist with oral hygiene"
                },
                "alert_id": null,
                "task_instance_id": "dHxmMjU2YmFlYS1jODEyLTRjZWMtOTUxNC0wYzc5YjNjZmQwMzN8MjAxOS0wNS0xMlQwNzowMDowMC4wMDBafE1PUk5JTkc=",
                "visit_id": "5cd753f0-8b66-f8a8-4591-3f78ca3f9c45",
                "caregiver_id": "5c9090ab-7d5e-4a72-8bf7-197190ad4c98",
                "payload_as_text": "{\"id\": \"006139b8-a387-4529-9280-2d798c500aeb\", \"visit_id\": \"5cd753f0-8b66-f8a8-4591-3f78ca3f9c45\", \"timestamp\": \"2019-05-12T07:23:12.789Z\", \"event_type\": \"task_completed\", \"caregiver_id\": \"5c9090ab-7d5e-4a72-8bf7-197190ad4c98\", \"task_instance_id\": \"dHxmMjU2YmFlYS1jODEyLTRjZWMtOTUxNC0wYzc5YjNjZmQwMzN8MjAxOS0wNS0xMlQwNzowMDowMC4wMDBafE1PUk5JTkc=\", \"task_schedule_id\": \"f256baea-c812-4cec-9514-0c79b3cfd033\", \"care_recipient_id\": \"df50cac5-293c-490d-a06c-ee26796f850d\", \"task_definition_id\": \"1bf3b81d-40b0-4539-ba96-9ea12ad6110b\", \"task_schedule_note\": \"Please assist me to brush my teeth\", \"task_definition_description\": \"Assist with oral hygiene\"}",
                "rejected_event_id": null,
                "observation_event_id": null,
                "timestamp": "2019-05-12T07:23:12.789Z",
                "id": "006139b8-a387-4529-9280-2d798c500aeb",
                "event_type": "task_completed",
                "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d"
            },
            {
                "payload": {
                    "id": "01520051-41da-4b83-bdb8-36323c5b738e",
                    "fluid": "regular",
                    "observed": false,
                    "visit_id": "5cc23bf0-8b66-f8a8-406f-e53b5740e11b",
                    "timestamp": "2019-04-26T11:08:55.971Z",
                    "event_type": "fluid_intake_observation",
                    "caregiver_id": "220d9432-b5ed-4c81-8709-434899d2cd1b",
                    "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d",
                    "consumed_volume_ml": 230
                },
                "alert_id": null,
                "task_instance_id": null,
                "visit_id": "5cc23bf0-8b66-f8a8-406f-e53b5740e11b",
                "caregiver_id": "220d9432-b5ed-4c81-8709-434899d2cd1b",
                "payload_as_text": "{\"id\": \"01520051-41da-4b83-bdb8-36323c5b738e\", \"fluid\": \"regular\", \"observed\": false, \"visit_id\": \"5cc23bf0-8b66-f8a8-406f-e53b5740e11b\", \"timestamp\": \"2019-04-26T11:08:55.971Z\", \"event_type\": \"fluid_intake_observation\", \"caregiver_id\": \"220d9432-b5ed-4c81-8709-434899d2cd1b\", \"care_recipient_id\": \"df50cac5-293c-490d-a06c-ee26796f850d\", \"consumed_volume_ml\": 230}",
                "rejected_event_id": null,
                "observation_event_id": null,
                "timestamp": "2019-04-26T11:08:55.971Z",
                "id": "01520051-41da-4b83-bdb8-36323c5b738e",
                "event_type": "fluid_intake_observation",
                "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d"
            },
            {
                "payload": {
                    "id": "0192894f-5cb4-498b-bd7c-b53cab8be201",
                    "visit_id": "5cce1970-8b66-f8a8-4e3a-a21099829cd7",
                    "timestamp": "2019-05-05T18:47:06.986Z",
                    "event_type": "check_out",
                    "caregiver_id": "f8651589-8e43-4787-a061-9a504579c999",
                    "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d"
                },
                "alert_id": null,
                "task_instance_id": null,
                "visit_id": "5cce1970-8b66-f8a8-4e3a-a21099829cd7",
                "caregiver_id": "f8651589-8e43-4787-a061-9a504579c999",
                "payload_as_text": "{\"id\": \"0192894f-5cb4-498b-bd7c-b53cab8be201\", \"visit_id\": \"5cce1970-8b66-f8a8-4e3a-a21099829cd7\", \"timestamp\": \"2019-05-05T18:47:06.986Z\", \"event_type\": \"check_out\", \"caregiver_id\": \"f8651589-8e43-4787-a061-9a504579c999\", \"care_recipient_id\": \"df50cac5-293c-490d-a06c-ee26796f850d\"}",
                "rejected_event_id": null,
                "observation_event_id": null,
                "timestamp": "2019-05-05T18:47:06.986Z",
                "id": "0192894f-5cb4-498b-bd7c-b53cab8be201",
                "event_type": "check_out",
                "care_recipient_id": "df50cac5-293c-490d-a06c-ee26796f850d"
            },
        ]);
    });


    it('GET /api/months: should get the value for each month', async () => {
        await request(app)
            .get('/api/months')
            .expect(function(res) {
                expect(res.body.status).toBe(true);
                expect(res.body.code).toBe(200);
                expect(res.body.message).toBe('success');
                expect(res.body.data).toHaveLength(2);
                expect(res.body.data).toBeArray();
                expect(res.body.data[Math.floor(Math.random()*res.body.data.length)])
                    .toBeObject()
                    .toHaveProperty("care_recipient_id","df50cac5-293c-490d-a06c-ee26796f850d")
                    .toContainAllKeys(["care_recipient_id","value"]);
            });
    })

    it('GET /api/event-type : should get the record of all event type', async () => {
        await request(app)
            .get('/api/event-type')
            .expect(function(res) {
                expect(res.body.status).toEqual(true);
                expect(res.body.code).toBe(200);
                expect(res.body.message).toBe("success");
                expect(res.body.data).toBeArray();
                expect(res.body.data[Math.floor(Math.random() * res.body.data.length)])
                    .toBeObject()
                    .toContainAllKeys(["event_type"]);
            });
    })

    it('GET /api/events/:month/:event_type : should get the record of available event', async function () {
        await request(app)
            .get("/api/events/5/task_completed")
            .expect(function (res){
                expect(res.body.status).toBe(true)
                expect(res.body.code).toBe(200)
                expect(res.body.message).toContain('success')
                expect(res.body.data)
                    .toBeArray()
                    .toHaveLength(1);
                expect(res.body.data[0]).toContainAllKeys(["event_type","month","day","total","date"])
            })
    });

    it('GET /api/events/:month/:event_type should return 404 for non available event', async function () {
        await request(app)
            .get("/api/events/1/unknown_event")
            .expect(res => {
                expect(res.body.status).toBe(false);
                expect(res.body.code).toBe(404);
                expect(res.body.message).toContain("Not Found")
            })
    });



    //close database connection
    afterAll(async () => {
       await db.sequelize.close();
    });
});
