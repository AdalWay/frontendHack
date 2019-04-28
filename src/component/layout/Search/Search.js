import React, { Component } from "react";
import "./search.css";
import SearchField from "react-search-field";

export default class Search extends Component {
  state = {};

  render() {
    return (
      <div>
        <h2>Search Properties</h2>
        <SearchField
          placeholder="Search..."
          //   onChange={onChange}s
          searchText="3345 Dundas street west"
          classNames="test-class"
        />
        
      </div>
    );
  }
}
