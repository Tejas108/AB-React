var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var ora = require('ora');

var port = process.env.PORT || 3000;

var app = express();
var compiler = webpack(config);

var spinner = ora({
  interval: 100
});

function failAndExit(err) {
  spinner.fail();
  console.error(err.stack);
  process.exit(1);
}

app.use(morgan('combined'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use('/css', express.static(__dirname + '/src/css'));


app.use(stormpath.init(app, {
  // Disable logging until startup, so that we can catch errors
  // and display them nicely.

  debug: true,
  web: {
    produces: ['application/json'],
    me: {
      expand: {
        customData: true
      }
    },
    register: {
      form: {
        fields: {
          role: {
            enabled: true,
            label: 'coach',
            placeholder: 'coach',
            type: 'text',
            required: true
          },
          phone: {
            enabled: true,
            label: 'phone',
            placeholder: 'phone number',
            type: 'text',
            required: false
          },
          id: {
            enabled: true,
            label: 'coachId',
            placeholder: 'coachId',
            type: 'text',
            required: true
          },
          coachId: {
            enabled: true,
            label: 'coachId',
            placeholder: 'coachId',
            type: 'text',
            required: true
          }
        }
      }
    }
  }
}));

app.post('/me', bodyParser.json(), stormpath.loginRequired, function (req, res) {
  function writeError(message) {
    res.status(400);
    res.json({message: message, status: 400});
    res.end();
  }

  function saveAccount() {
    req.user.givenName = req.body.givenName;
    req.user.surname = req.body.surname;
    req.user.email = req.body.email;

    if ('phone' in req.body.customData) {
      req.user.customData.phone = req.body.customData.phone;
    }
    if ('role' in req.body.customData) {
      req.user.customData.role = req.body.customData.role;
    }
    if ('id' in req.body.customData) {
      req.user.customData.id = req.body.customData.id;
    }

    req.user.save(function (err) {
      if (err) {
        return writeError(err.userMessage || err.message);
      }
      res.end();
    });
  }

  if (req.body.password) {
    var application = req.app.get('stormpathApplication');

    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword
    }, function (err) {
      if (err) {
        return writeError('The existing password that you entered was incorrect.');
      }

      req.user.password = req.body.password;

      saveAccount();
    });
  } else {
    saveAccount();
  }
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

spinner.text = 'Starting Dev Sever on port ' + port,
  spinner.start();

app.on('error', failAndExit);
app.on('stormpath.error', failAndExit);

app.listen(port, function () {
  spinner.succeed();
  spinner.text = 'Initializing Stormpath';
  spinner.start();
  app.on('stormpath.ready', function () {
    spinner.succeed();
    console.log('\nListening at http://localhost:' + port);
    // Now bring back error logging.
    app.get('stormpathLogger').transports.console.level = 'error';
  });
});