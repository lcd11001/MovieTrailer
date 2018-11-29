const utils = require('./utils')

const request = require('request')

const functions = require('firebase-functions')

// enable CORS
const cors = require('cors')({ origin: true })

// setup database
const admin = require('firebase-admin')
admin.initializeApp()
const database = admin.database()
const refItems = database.ref('/items')


const urlMoviePlay = 'http://netflix.com/get_movie?movieid={0}'
const urlMoviePlaySequence = urlMoviePlay + '&sequence={1}'

const getItemsFromDatabase = (res) => {
    // This will return the list of data after it has successfully saved.
    return refItems.on('value',
        // success
        (snapshot) => {
            let items = []
            snapshot.forEach((child) => {
                items.push({
                    id: child.key,
                    items: child.val()
                })
            })

            return res.status(200).json(items)
        }),
        // error
        (error) => {
            res.status(error.code).json({
                message: `something went wrong, ${error.message} `
            })
        }
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Movie Trailer Cloud Functions!")
})

exports.addItem = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        // This snippet below, specifies only POST method should be used, since we are writing to the database
        if (req.method !== 'POST') {
            return res.status(401).json({
                message: 'addItem function not allowed'
            })
        }

        // For debugging purpose, you can see the event logs on logs section of functions
        console.log(req.body)

        // Firebase method for saving data
        const item = req.body.item
        refItems.push(item)

        return getItemsFromDatabase(res)
    })
})

exports.getItems = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        // This snippet below, specifies only POST method should be used, since we are writing to the database
        if (req.method !== 'GET') {
            return res.status(401).json({
                message: 'getItems function not allowed'
            })
        }

        return getItemsFromDatabase(res)
    })
})

exports.delItem = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        // This snippet below, specifies only POST method should be used, since we are writing to the database
        if (req.method !== 'DELETE') {
            return res.status(401).json({
                message: 'delItem function not allowed'
            })
        }

        const id = req.query.id
        database.ref(`/items/${id}`).remove()

        return getItemsFromDatabase(res)
    })
})

exports.getMoviePlay = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        // This snippet below, specifies only POST method should be used, since we are writing to the database
        if (req.method !== 'GET') {
            return res.status(401).json({
                message: 'getMoviePlay function not allowed'
            })
        }

        const movieID = req.query.movieID
        const sequence = req.query.sequence


        let url = sequence !== undefined
            ? String.format(urlMoviePlaySequence, movieID, sequence)
            : String.format(urlMoviePlay, movieID)

        request(url, (error, response, body) => {
            console.log('getMoviePlay', error, 'response', response, 'body', body)
            if (error) {
                return res.status(500).json({
                    message: 'abc'
                })
            } else {
                return res.status(200).json({
                    message: 'xyz'
                })
            }
        })
    })
})
