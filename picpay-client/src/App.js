import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Header from './components/Header';

const App = ( {isLoading, children} ) => {
  return (
    <Fragment>
      {
        isLoading ? 
        <LinearProgress color="secondary" />
        :
        null
      }
      <Header />

      <main className="main">
        <Container>
          { children }
        </Container>
      </main>

    </Fragment>
  );
};

const mapStateToProps = state => {
  return { isLoading: state.loading };
};

export default connect(mapStateToProps)(App);
