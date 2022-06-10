const React = require("react");
const Default = require("./layouts/Default");

function New() {
  return (
    <Default>
      <h2>Add a new bread</h2>
      <form action="/breads" method="POST">
        <label htmlFor="baker">Baker</label>
        <select name="baker" id="baker">
          <option value="Jackie">Jackie</option>
          <option value="Liam">Liam</option>
          <option value="Mama">Mama</option>
        </select>

        <label htmlFor="name">Name</label>
        <input type={"text"} name={"name"} id={"id"} required />
        <label htmlFor="image">Image</label>
        <input type={"text"} name={"image"} id={"id"} />
        <label htmlFor="hasGluten">Has Gluten?</label>
        <input
          type={"checkbox"}
          name="hasGluten"
          id="hasGluten"
          defaultChecked
        />
        <br />
        <input type={"submit"} value="Add Bread" />
      </form>

      <div className="backButton">
        <a href="/breads">
          <button>Go back to the index</button>
        </a>
      </div>
    </Default>
  );
}

module.exports = New;
