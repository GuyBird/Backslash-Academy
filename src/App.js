import React, { Component } from 'react';
import logo from './Bepis.jpg';
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

  backendSearch = event => {
    event.preventDefault();

    fetch('http://localhost:3000/hello?q=' + this.state.searchTerm)
      .then(res => res.json())
      .then(json => this.setState({ json }));
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
      .then(json3 => this.setState({ json3 }));
  };

  render() {
    const json3 = this.state.json3;
    const data = this.state.data;
    const json = this.state.json;

    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <button onClick={this.backend}> Message from backend </button>
          </p>

           <p>
              <form onSubmit={this.backendSearch}>
                <input type="text" value={this.state.backendSearchTerm} onChange={event => this.setState({ backendSearchTerm: event.target.value })} />
                <button>Search backend</button>
              </form>
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
          <p>
            {JSON.stringify(data)}
          </p>
          
          {json3 &&
            json3.items.map(item => (
              <div>
                {item.name}
                <img src={item.owner.avatar_url} alt="?" />
              </div>
            ))}

            {JSON.stringify(json)}
            
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
