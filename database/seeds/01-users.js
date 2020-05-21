
exports.seed = async function(knex) {
 await knex("users").insert([
    {firstname: "rachael",
     lastname: "ray",
     email: "rachaelray@gmail.com",
     username: "rahaelray1",
     password: "password1"
    },
    {firstname: "guy",
     lastname: "fieri",
     email: "guyfieri@gmail.com",
     username: "guyfieri2",
     password: "password2"
    },
    {firstname: "martha",
     lastname: "stewart",
     email: "marthastewart@gmail.com",
     username: "marthastewart3",
     password: "password3"
    }
 ])
};
