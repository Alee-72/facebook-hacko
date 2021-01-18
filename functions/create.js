const faunadb = require("faunadb"),
  q = faunadb.query;
 
exports.handler = async (event, context) => {
  try {
    // Only allow POST
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    let reqObj = JSON.parse(event.body);

    var client = new faunadb.Client({
      secret: "fnAD_IOUOhACBQ9boRI8B-sMcIS5s60UxjF2sTto",
    });


      var result = await client.query(
        q.Create(q.Collection("posts"), {
          data: { name: reqObj.name, age: reqObj.age , cnic:reqObj.cnic, email:reqObj.email  },
        })
      );
    console.log("Entry Created and Inserted in Container: " + result.ref.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: `${result.ref.id}` }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
