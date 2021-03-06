import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/core/styles';
import defaultTheme from '../styles/theme-default';
import auth from '../auth';

const styles = {
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  paper: {
    padding: 20,
    overflow: 'auto'
  },
  loginBtn: {
    float: 'right'
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 6,
    display: 'inline-block'
  },
  textField: {
    margin: '1rem 0'
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    verticalAlign: 'text-bottom'
  },
  error: { color: 'red' }
};

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: 'guest', password: 'dotnetify' };
  }

  render() {
    let { user, password, error } = this.state;
    const { onAuthenticated } = this.props;

    const handleLogin = _ => {
      this.setState({ error: null });
      auth.signIn(user, password).then(_ => onAuthenticated()).catch(error => {
        if (error.message == '400') this.setState({ error: 'Invalid password' });
        else this.setState({ error: error.message });
      });
    };

    return (
      <ThemeProvider theme={defaultTheme}>
        <div>
          <div style={styles.loginContainer}>
            <Card style={styles.paper}>
              <div>
                <img src="https://dotnetify.net/content/images/dotnetify-logo-small.png" style={styles.logo} />
                <span style={styles.text}>dotNetify</span>
              </div>
              <form>
                <TextField
                  required
                  style={styles.textField}
                  label="User"
                  fullWidth={true}
                  value={user}
                  onChange={event => this.setState({ user: event.target.value })}
                />
                <br />
                <TextField
                  required
                  style={styles.textField}
                  label="Password"
                  fullWidth={true}
                  type="password"
                  value={password}
                  onChange={event => this.setState({ password: event.target.value })}
                />
                {error ? <div style={styles.error}>{error}</div> : null}
                <div>
                  <span>
                    <Button variant="contained" onClick={handleLogin} color="primary" style={styles.loginBtn}>
                      Login
                    </Button>
                  </span>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

LoginPage.propTypes = {
  onAuthenticated: PropTypes.func
};
