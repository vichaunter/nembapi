db = db.getSiblingDB('nembapi');

db.createCollection('examples');

db.createUser(
    {
        user: "admin",
        pwd: "pass",
        roles: [
            {
                role: "readWrite",
                db: "nembapi"
            }
        ]
    }
);