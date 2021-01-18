const faunadb = require("faunadb"),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    var client = new faunadb.Client({
      secret: "fnAD_IOUOhACBQ9boRI8B-sMcIS5s60UxjF2sTto",
    });

    let result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("posts"))),
        q.Lambda((x) => q.Get(x))
      )
    );
    // console.log("Entry Created and Inserted in Container: " + result.ref.id);

    return {
      statusCode: 200,

      body: JSON.stringify(result.data),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
