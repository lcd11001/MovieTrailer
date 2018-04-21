// https://www.youtube.com/watch?v=xm4LX5fJKZ8

import React, { Component, Fragment } from 'react'



import { Header, Footer } from './Components/Layouts'
import Exercises from './Exercises'
import { muscles, exercises } from './Store'

export default class App extends Component {
  state = {
    exercises,
    category: '',
    exercise: {}
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

  _handleExerciseSelected = (id) => {
    this.setState((prevState, props) => {
      return {
        exercise: prevState.exercises.find((ex) => ex.id === id)
      }
    })
  }
  
  _handleExerciseCreate = (exercise) => {
    this.setState((prevState, props) => {
      return {
        exercises: [
          ...prevState.exercises,
          exercise
        ]
      }
    })
  }

  render() {
    // console.log(this.getExercisesByMuscles())
    const exercises = this.getExercisesByMuscles()

    return (

        <Fragment>
          <Header 
            muscles={muscles}
            onExerciseCreate={this._handleExerciseCreate}
          />

          <Exercises
            category={this.state.category}
            exercises={exercises}
            exercise={this.state.exercise}
            onSelect={this._handleExerciseSelected}
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
