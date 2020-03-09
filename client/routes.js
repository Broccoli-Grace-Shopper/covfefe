import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  AdminHome,
  SingleProduct,
  AllProducts,
  Cart,
  NotFound,
  CheckOut,
} from './components';
import { me } from './store';
import AdminEditProduct from './components/AdminEditProduct';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={AllProducts} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/test" component={AdminHome} />
        <Route exact path="/testForm/:productId" component={AdminEditProduct} />

        {isLoggedIn && (
          <Switch>
            {/* <Route path="/admin" component={AdminHome} /> */}

            {/* Routes placed here are only available after logging in */}
          </Switch>
        )}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
