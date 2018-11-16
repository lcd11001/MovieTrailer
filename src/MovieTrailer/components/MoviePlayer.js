import React from 'react'
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

// https://github.com/CookPete/react-player/blob/master/src/demo/App.js
import ReactPlayer from 'react-player'
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'

import { playerStyles as styles } from '../styles'

class MoviePlayer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // video player state
            playing: true,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false
        }
    }

    _ref = player => {
        this.player = player
    }

    _load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0
        })
    }

    _playPause = () => {
        this.setState({
            playing: !this.state.playing
        })
    }

    _stop = () => {
        this.setState({
            url: null,
            playing: false
        })
    }

    _toggleLoop = () => {
        this.setState({
            loop: !this.state.loop
        })
    }

    _toggleMuted = () => {
        this.setState({
            muted: !this.state.muted
        })
    }

    _setVolume = e => {
        this.setState({
            volume: parseFloat(e.target.value)
        })
    }

    _setPlaybackRate = e => {
        this.setState({
            playbackRate: parseFloat(e.target.value)
        })
    }

    _onPlay = () => {
        console.log('onPlay')
        this.setState({
            playing: true
        })
    }

    _onPause = () => {
        console.log('onPause')
        this.setState({
            playing: false
        })
    }

    _onSeekMouseDown = e => {
        this.setState({
            seeking: true
        })
    }

    _onSeekChange = e => {
        this.setState({
            played: parseFloat(e.target.value)
        })
    }

    _onSeekMouseUp = e => {
        this.setState({
            seeking: false
        })
        this.player.seekTo(parseFloat(e.target.value))
    }

    _onProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    _onEnded = () => {
        console.log('onEnded')
        this.setState({
            playing: this.state.loop
        })
    }

    _onDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({
            duration
        })
    }

    _onClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    }

    _renderPlayer = (url) => {
        const {
            playing,
            volume,
            muted,
            loop,
            // played,
            // loaded,
            // duration,
            playbackRate
        } = this.state

        const {
            classes
        } = this.props

        return (
            <div className={classes.centerDiv}>
                <div className={classes.playerWrapper}>
                    <ReactPlayer
                        ref={this._ref}
                        className={classes.reactPlayer}
                        width='100%'
                        height='100%'
                        url={url}
                        playing={playing}
                        loop={loop}
                        playbackRate={playbackRate}
                        volume={volume}
                        muted={muted}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
                        onPlay={this._onPlay}
                        onPause={this._onPause}
                        onBuffer={() => console.log('onBuffer')}
                        onSeek={e => console.log('onSeek', e)}
                        onEnded={this._onEnded}
                        onError={e => console.log('onError', e)}
                        onProgress={this._nProgress}
                        onDuration={this._onDuration}
                        controls={true}
                    />
                </div>
            </div>
        )
    }

    render() {
        const {
            url
        } = this.props

        return this._renderPlayer(url)
    }
}

MoviePlayer.propTypes = {
    classes: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired
}

export default compose ( withStyles(styles), withWidth() )(MoviePlayer)