/**
 * Created by Tejas on 10/4/16.
 */
import React from 'react';
import DocumentTitle from 'react-document-title';
import ClientList from '../components/ClientList';

export default class Dashboard extends React.Component {

  testconnect = () => {
    axios.get('/sessions')
      .then(
        function(res){
          console.log(res);
        });
  }

  render() {
    return (
      <DocumentTitle title={`Dashboard`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3 onClick={this.testconnect}>My Dashboard</h3>
              <hr />
            </div>
          </div>
          <ClientList />
        </div>
      </DocumentTitle>
    )
  }
}
