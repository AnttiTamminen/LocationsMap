import React, { Component } from "react";
import dataService from "../services/dataService";

export default class AddLocation extends Component {
    constructor(props) {
      super(props);
      this.onChangeAuthor = this.onChangeAuthor.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.saveLocation = this.saveLocation.bind(this);
      this.newTutorial = this.newTutorial.bind(this);
  
      this.state = {
        userid: "",
        author: "",
        name: "",
        desc: "", 
        location: "TÄHÄN JOHDETAAN LAT LON"
      };
    }

    onChangeAuthor(e) {
        this.setState({
          author: e //Tähän user get?
        });
      }
  
    onChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }
  
    onChangeDescription(e) {
      this.setState({
        desc: e.target.value
      });
    }
  
    saveLocation() {
      var data = {
        author: this.state.author,
        name: this.state.name,
        desc: this.state.desc
      };
  
      dataService.create(data)
        .then(response => {
          this.setState({
            author: response.data.author,
            title: response.data.name,
            desc: response.data.desc,
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    render() {
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
}
  