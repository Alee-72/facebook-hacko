const faunadb = require("faunadb"),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
 
   
     var client = new faunadb.Client({
      secret: "fnAD_IOUOhACBQ9boRI8B-sMcIS5s60UxjF2sTto",
    });
    let comingid = JSON.parse(event.body);
    var result = await client.query(
      q.Delete(q.Ref(q.Collection("posts"), comingid.id))
    );
    // console.log("Entry Created and Inserted in Container: " + result.ref.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: "successful deleted" }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
