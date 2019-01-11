// https://www.youtube.com/watch?v=xm4LX5fJKZ8

import React, { Component, Fragment } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'

import { Header, Footer } from './Components/Layouts'
import Exercises from './Exercises'
import { muscles, exercises } from './Store'

export default class App extends Component {
    state = {
        exercises,
        category: '',
        editMode: false,
        ...this.getInitExercise()
    }

    getInitExercise() {
        return {
            exercise: {
                id: '',
                title: 'Welcome!',
                description: 'Please select an exercise from the list on the left',
                muscles: ''
            }
        }
    }

    getExercisesByMuscles() {
        const initExercises = muscles.reduce((prevValue, curValue) => {
            return {
                ...prevValue,
                [curValue]: []
            }
        }, {})

        // console.log(muscles, initExercises)

        return Object.entries(
            this.state.exercises.reduce((accumulator, currentValue) => {
                const { muscles } = currentValue

                accumulator[muscles] = [...accumulator[muscles], currentValue]

                return accumulator
            }, initExercises)
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
                exercise: prevState.exercises.find((ex) => ex.id === id),
                editMode: false,
                id: id
            }
        })
    }

    _handleExerciseCreate = (exercise) => {
        this.setState((prevState, props) => {
            return {
                exercises: [
                    ...prevState.exercises,
                    exercise
                ],
                editMode: false
            }
        })
    }

    _handleExerciseDeleted = (id) => {
        this.setState((prevState, props) => {
            return {
                exercises: prevState.exercises.filter((ex) => ex.id !== id),
                editMode: prevState.id === id ? false : prevState.editMode,
                ...(prevState.id === id ? this.getInitExercise() : prevState.exercise)
            }
        })
    }
    _handleEditMode = (id) => {
        this.setState((prevState, props) => {
            return {
                exercise: prevState.exercises.find((ex) => ex.id === id),
                editMode: true,
                id: id
            }
        })
    }

    _handleExerciseEdited = (exercise) => {
        this.setState((prevState, props) => {
            return {
                exercises: [
                    ...prevState.exercises.filter(ex => ex.id !== exercise.id),
                    exercise
                ],
                exercise
            }
        })
    }

    render() {
        // console.log(this.getExercisesByMuscles())
        const exercises = this.getExercisesByMuscles()

        return (

            <Fragment>
                <CssBaseline />
                <Header
                    muscles={muscles}
                    onExerciseCreate={this._handleExerciseCreate}
                />

                <Exercises
                    category={this.state.category}
                    muscles={muscles}
                    exercises={exercises}
                    exercise={this.state.exercise}
                    onSelect={this._handleExerciseSelected}
                    onDelete={this._handleExerciseDeleted}
                    onEditMode={this._handleEditMode}
                    editMode={this.state.editMode}
                    onEdit={this._handleExerciseEdited}
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
