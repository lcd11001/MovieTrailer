// https://www.youtube.com/watch?v=xm4LX5fJKZ8

import React, { Component, Fragment } from 'react'

import { Header, Footer } from './Components/Layouts'
import Exercises from './Exercises'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />

        <Exercises />

        <Footer />
      </Fragment>
    );
  }
}
