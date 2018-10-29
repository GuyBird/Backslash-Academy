import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

import Component2 from './Component2';

class App extends Component {
  state = {
    searchTerm: '',
    json: null,
    data: null
  };

  backend = event => {
    event.preventDefault();
    fetch('http://localhost:3001/hello')
    .then(res => res.json())
    .then(d => this.setState({ data: d }));
  };

  search = event => {
    event.preventDefault();

    fetch('https://api.github.com/search/repositories?q=' + this.state.searchTerm)
      .then(res => res.json())
      .then(json => this.setState({ json }));
  };

  render() {
    const json = this.state.json;
    const data = this.state.data;

    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <button onClick={this.backend}> Message from backend </button>
          </p>
          <p>
            <form onSubmit={this.search}>
              <input type="text" value={this.state.searchTerm} onChange={event => this.setState({ searchTerm: event.target.value })} />
              <button>Search</button>
            </form>
          </p>
          <a className="App-link" href="https://github.com/GuyBird/Backslash-Academy" target="_blank" rel="noopener noreferrer">
            Github repository
          </a>
          <Link to="/hello">Hello</Link>

          {JSON.stringify(data)}
          
          {json &&
            json.items.map(item => (
              <div>
                {item.name}
                <img src={item.owner.avatar_url} alt="?" />
              </div>
            ))}
          <Route path="/hello" component={Component2} />
        </header>
      </div>
    );
  }
}

export default App;