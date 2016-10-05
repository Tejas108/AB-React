import React from 'react';
import DocumentTitle from 'react-document-title';

let coachId = '';

export default class CreateClientPage extends React.Component {

  componentWillMount = () => {
    axios
      .get('/me')
      .then(res => {
        this.coachId = res.data.account.customData.id;
      })
      .catch(res => {
        if (res instanceof Error) {
          console.log(res.message);
        } else {
          console.log(res.data);
        }
      });
  }

  handleSubmit = () => {
    axios.post('/register', {
      givenName: this.refs.givenName.value,
      surname: this.refs.surname.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      customData: {
        role: this.refs.role.value,
        phone: this.refs.phone.value,
        coachId: this.coachId
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <DocumentTitle title={`New Client`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>Add New Client</h3>
              <hr />
            </div>
          </div>
          <form>
            <div className='sp-login-form'>
              <div className="row">
                <div className="col-xs-12">
                  <div className="form-horizontal">

                    <div className="form-group">
                      <label htmlFor="givenName" className="col-xs-12 col-sm-4 control-label">First Name</label>
                      <div className="col-xs-12 col-sm-4">
                        <input type="text" className="form-control" id="givenName" name="givenName"
                               placeholder="First Name" ref="givenName"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="surname" className="col-xs-12 col-sm-4 control-label">Last Name</label>
                      <div className="col-xs-12 col-sm-4">
                        <input type="text" className="form-control" id="surname" name="surname" placeholder="Last Name"
                               ref="surname"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="col-xs-12 col-sm-4 control-label">Email</label>
                      <div className="col-xs-12 col-sm-4">
                        <input type="text" className="form-control" id="email" name="email" placeholder="Email"
                               ref="email"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="customData.phone" className="col-xs-12 col-sm-4 control-label">Phone</label>
                      <div className="col-xs-12 col-sm-4">
                        <input type="text" className="form-control" id="customData.phone" name="customData.phone"
                               placeholder="Phone" ref="phone"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="col-xs-12 col-sm-4 control-label">Password</label>
                      <div className="col-xs-12 col-sm-4">
                        <input type="password" className="form-control" id="password" name="password"
                               placeholder="Password" ref="password"/>
                      </div>
                    </div>

                    <div key="register-button" className="form-group">
                      <div className="col-sm-offset-4 col-sm-4">
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Add Client
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input type="hidden" id="customData.role" name="customData.role" value="client" ref="role"/>
          </form>
        </div>
      </DocumentTitle>
    );
  }
}