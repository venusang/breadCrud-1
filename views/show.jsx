const React = require("react");
const Default = require("./layouts/Default");

function Show({ bread, id }) {
  console.log(bread.name);
  return (
    <Default>
      <h2>Show Page</h2>
      <h3>{bread.name}</h3>
      <p>
        and it
        {bread.hasGluten ? <span> does</span> : <span>does NOT</span>} have
        gluten
      </p>
      <img src={bread.image} alt={bread.name} />

      <form action={`/breads/${id}?_method=DELETE`} method="POST">
        <input type="submit" value="DELETE" />
      </form>

      <a href={`/breads/${id}/edit`}>
        <button>Edit</button>
      </a>

      <div className="backButton">
        <a href="/breads">
          <button>Go back to the bread list page</button>
        </a>
      </div>
    </Default>
  );
}

module.exports = Show;
