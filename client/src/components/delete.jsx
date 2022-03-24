import instrumentService from "../services/instrumentService";
import { toast } from "react-toastify";
import { Component } from "react";

class Delete extends Component {
    state = {};


  componentDidMount = async () =>  {
    const itemId = this.props.match.params.id;
    await instrumentService.deleteItem(itemId);
    toast("the item was deleted successfully");
    this.props.history.replace("/allinstruments");
  }
  render = () => null;
}

export default Delete;
