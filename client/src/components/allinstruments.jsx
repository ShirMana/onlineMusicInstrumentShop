import { Component } from "react";
import instrumentService from "../services/instrumentService";
import PageHeader from "./common/pageHeader";
import Instrument from "./instrument";

class Allinstruments extends Component {
  state = {
    instruments: [],
  };

  async componentDidMount() {
    const { data } = await instrumentService.getAllInstruments();
    if (data.length) {
      this.setState({ instruments: data });
    }
  }

  async search(InstrumentName){
    const { data } = await instrumentService.getFilteredInstruments(InstrumentName);
    if (data.length) {
      this.setState({ instruments: data });
    }
  }

  render() {
    const {
      state: { instruments },
    } = this;

    return (
      <div className="container">
        <div className="input-group rounded" style={{ width: 200 }}>
          <input
            id="search"
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <button onClick={()=>{this.search(document.getElementById("search").value)}} className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </button>
        </div>

        <PageHeader titleText="All instruments" />

        <div className="row">
          <div className="col-12">
            <p>All instruments in the website are presented here</p>
          </div>
        </div>
        <div className="row">
          {instruments.length > 0 &&
            instruments.map((instrument) => (
              <Instrument key={instrument._id} instrument={instrument} />
            ))}
        </div>
      </div>
    );
  }
}

export default Allinstruments;
