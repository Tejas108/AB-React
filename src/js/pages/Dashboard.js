/**
 * Created by Tejas on 10/4/16.
 */
import React from 'react';
import DocumentTitle from 'react-document-title';
import ClientList from '../components/ClientList'

class Dashboard extends React.Component {

  render() {
    return (
      <DocumentTitle title={`Dashboard`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>My Dashboard</h3>
              <hr />
            </div>
          </div>
          <ClientList />
        </div>
      </DocumentTitle>
    )
  }

}

export default Dashboard;