db.createUser(
    {
        user: "user1AppRecrutamentoBr",
        pwd: "Passw0rd",
        roles: [
            {
                role: "readWrite",
                db: "recrutamento-br"
            }
        ]
    }
);