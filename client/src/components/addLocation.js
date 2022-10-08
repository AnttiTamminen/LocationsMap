import dataService from "../services/dataService";
import Home from "./Home"

const AddLocation = ({lat, lng}) => {


  return (
    <div className="submit-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="name"
          required
          value={this.state.title}
          onChange={this.onChangeName}
          name="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          id="desc"
          required
          value={this.state.description}
          onChange={this.onChangeDescription}
          name="desc"
        />
      </div>
      <button onClick={this.saveTutorial} className="btn btn-success">
        Submit
      </button>
    </div>
  );
}

export default AddLocation;
  