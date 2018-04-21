// https://www.youtube.com/watch?v=xm4LX5fJKZ8

import React, { Component, Fragment } from 'react'



import { Header, Footer } from './Components/Layouts'
import Exercises from './Exercises'
import { muscles, exercises } from './Store'

export default class App extends Component {
  state = {
    exercises,
    category: ''
  }

  getExercisesByMuscles() {
    return Object.entries(
       this.state.exercises.reduce((accumulator, currentValue) => {
          const { muscles } = currentValue

          accumulator[muscles] = accumulator[muscles]
            ? [...accumulator[muscles], currentValue]
            : [currentValue]

          return accumulator
        }, {})
    )
  }

  _handleCategorySelected = (category) => {
    this.setState({
      category
    })
  }

  render() {
    // console.log(this.getExercisesByMuscles())
    const exercises = this.getExercisesByMuscles()

    return (

        <Fragment>
          <Header />

          <Exercises
            category={this.state.category}
            exercises={exercises}
          />

          <Footer
            category={this.state.category}
            muscles={muscles}
            onSelect={this._handleCategorySelected}
          />
        </Fragment>

    );
  }
}
