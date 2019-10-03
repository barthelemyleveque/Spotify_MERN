import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(){
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const isUserAuthorized = urlParams.has('authorized') ? true : false;

    this.state = {
      isUserAuthorized,
      musicHistory:[],
    };
  }

  componentDidMount() {
    const { isUserAuthorized } = this.state;

    if (isUserAuthorized) {
      fetch('http://localhost:5000/history')
        .then(res => res.json())
        .then(data => {
          this.setState({
            musicHistory: data,
          });
        })
        .catch(error => console.log(error));
    }
  }

  render(){
    const { isUserAuthorized, musicHistory } = this.state;
    const link = isUserAuthorized ? 'http://localhost:3000/?authorized=true' : 'http://localhost:3000/';
    const connectSpotify = isUserAuthorized ? ('') : (
      <div>
    <p class="lead">Bartify vous permet d'être alerté lorsque vos artistes préférés et vos coups de coeur du moment passent en concert près de chez vous.</p>
    <a href="http://localhost:5000/login" className="btn btn-success">Connect to your Spotify account</a></div>);
    const disconnectSpotify = isUserAuthorized ? 
    (<form action="http://localhost:3000">
      <input type="submit" className="btn btn-danger" value="Disconnect from Bartify" />
    </form>) : ('');

    const TableItem = (item, index) => (
      <tr key={item.artist}>
        <img src={item.artist_picture} alt={item.artist_name} height="100" width="100"/>
        <td>{item.artist_name}</td>
        <td>{item.artist_location}</td>
        <td>{index + 1}</td>
      </tr>
    );

    const RecentlyPlayed = () => (
      <div className="top-artist">
        <h2>Most Played Artists</h2>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Artist Name</th>
              <th>Concert à Paris ?</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{musicHistory.map((e, index) => TableItem(e, index))}</tbody>
        </table>
      </div>
    );

    const Navbar =(
      <nav className="navbar navbar-inverse bg-dark navbar-dark">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href={link}><strong>Bartify</strong></a>
        </div>
      </div>
    </nav>
    );

    const Footer = (
        <footer class="page-footer font-small black">
            <div class="footer-copyright text-center py-3">Powered by Spotify and Songkick</div>
        </footer>
    );


    return (
      <div className="container-fluid">
        {Navbar}
          <div className="jumbotron">
            {connectSpotify}
            {musicHistory.length !== 0 ? <RecentlyPlayed /> : null}
           {disconnectSpotify}
          </div>
          {Footer}
      </div>
    );
  }
}

export default App;