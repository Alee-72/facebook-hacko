const faunadb = require("faunadb"),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    var client = new faunadb.Client({
      secret: "fnAD_IOUOhACBQ9boRI8B-sMcIS5s60UxjF2sTto",
    });

    let comingid = JSON.parse(event.body);
    var result = await client.query(
      q.Update(q.Ref(q.Collection("posts"), comingid.id), {
        data: { name: comingid.updatename, age:comingid.updateage, cnic:comingid.updatecnic, email:comingid.updateemail},
      })
    );
    // console.log("Entry Created and Inserted in Container: " + result.ref.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: "update" }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
