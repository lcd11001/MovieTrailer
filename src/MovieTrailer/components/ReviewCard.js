import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'

import IconLabelTabs from './IconLabelTabs'

import { cardStyles as styles } from '../styles'

import { backdropSizes, getImage } from '../api'
import YouTube from 'react-youtube'

class ReviewCard extends React.Component {
    state = { expanded: false, isPlayingTrailer: false }

    _handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    _handlePlayTrailer = () =>
    {
        this.setState({ isPlayingTrailer: true })
    }

    _handleStopTrailer = () =>
    {
        this.setState({ isPlayingTrailer: false })
    }

    _getCategoryComponents = (categories) => {
        return categories.map((value, index) => {
            return (
                <Fragment key={index}>
                    <span>
                        {
                            index > 0 ? ' - ' : ''
                        }
                    </span>
                    <a href={`/category/${value.id/*value.CategoryID*/}`}>
                        {
                            // value.CategoryName
                            value.name
                        }
                    </a>
                </Fragment>
            )
        })
        /*
        .reduce((prev, curr, curIndex) => {
            if (curIndex > 0) {
                return [...prev, ' - ', curr]
            } else {
                return [...prev, curr]
            }
            
        }, 0)
        */
    }

    _getCasterComponents = (casters) => {
        return casters.split('/')
            .map((value, index) => {
                return (
                    <Fragment key={index}>
                        <span>
                            {
                                index > 0 ? ' - ' : ''
                            }
                        </span>
                        <a href={`/caster/${value.trim().replace(/ /g, '%20')}`}>
                            {
                                value.trim()
                            }
                        </a>
                    </Fragment>
                )
            })
        /*
        .reduce((prev, curr, curIndex) => {
            if (curIndex > 0) {
                return [...prev, ' - ', curr]
            } else {
                return [...prev, curr]
            }
            
        }, 0)
        */
    }

    _getDirectorComponents = (director) => {
        director = director || 'unknown'
        return <a href={`/director/${director.trim().replace(/ /g, '%20')}`}>{director.trim()}</a>
    }

    _getCompanies = (companies) =>
    {
        return companies.map((value, index) => {
            return (
                <Fragment key={index}>
                    <span>
                    {
                        index > 0 ? ' - ' : ''
                    }
                    </span>
                    <a href={`/company/${value.id}`}>
                        {
                            value.name
                        }
                    </a>
                </Fragment>
            )
        })
    }

    _getLanguages = (languages) =>
    {
        return languages.map((value, index) => {
            return (
                <Fragment key={index}>
                    <span key={`/language/${value.iso_639_1}`}>
                        {
                            index > 0 ? ' - ' + value.name : value.name
                        }
                    </span>
                </Fragment>
            )
        })
    }

    _calcFlexDirection = (width) => {
        switch (width) {
            case 'xs':
                return 'column'

            default:
                break
        }

        return 'row'
    }

    _calcFlexSize = (width) => {
        switch (width) {
            case 'xs':
                return {
                    leftOrTop: 1,
                    rightOrBottom: 1
                }

            default:
                break
        }

        return {
            leftOrTop: 1,
            rightOrBottom: 3
        }
    }

    _onClick = (id) => {
        console.log(`https://www.youtube.com/watch?v=${id}`)
        this._handlePlayTrailer();
    }

    _getTrailerId = (data) =>
    {
        if (Array.isArray(data))
        {
            const trailer = data.length > 1
                // ? data.find((value) => value.type === 'Trailer' && value.official === true && value.site === 'YouTube')
                ? data.find((value) => value.name.includes('Official Trailer') || value.name.includes('Official Teaser'))
                : data[0]
            if (trailer)
            {
                return trailer.key
            }
        }

        return null
    }

    renderTrailer = (id) =>
    {
        const { classes } = this.props

        return (
            <YouTube
                videoId={id}
                onEnd={this._handleStopTrailer}
                className={classes.youtubePlayerContainer}
                opts={{
                    width: '100%',
                    height: '100%',
                    playerVars: {
                        autoplay: 1
                    }
                }}
            />
        )
    }

    render() {
        const {
            classes,
            detail,
            width,
            onPlay = this.props.onPlay || this._onClick
        } = this.props

        const _flexDirection = this._calcFlexDirection(width)
        const _flexSize = this._calcFlexSize(width)

        const _trailerId = this._getTrailerId(detail.videos.results) /*detail.MovieID*/

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label='IMDB rating' className={classes.avatar}>
                                <Typography className={classes.avatarText}>{detail.vote_average.toFixed(1) /*detail.ImdbRating*/}</Typography>
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={
                            <Typography className={classes.title}>{detail.original_title /*detail.KnownAs*/}</Typography>
                        }
                        subheader={
                            <Typography className={classes.subtitle}>
                                <Link href={detail.homepage} color='secondary' target='_blank' rel='noopener'>
                                    {detail.homepage /*detail.MovieName*/}
                                </Link>
                            </Typography>
                        }
                    />

                    <CardMedia
                        className={classes.media}
                        image={getImage(detail.backdrop_path /*detail.NewBackdrop*/, backdropSizes.w1280)}
                        title={detail.original_title /*detail.KnownAs*/}
                    >
                        <div className={classes.divPlayButton}>
                            {
                                _trailerId &&
                                <IconButton className={classes.playButton} onClick={() => onPlay(_trailerId)}>
                                    <PlayIcon className={classnames(classes.playIcon, classes.playIconHover)} />
                                </IconButton>
                            }
                        </div>
                        {
                            this.state.isPlayingTrailer && this.renderTrailer(_trailerId)
                        }
                    </CardMedia>

                    <CardContent>
                        {/* <IconLabelTabs
                            data={[
                                {
                                    icon: '/icons/vn_icon_64.png',
                                    label: 'Tóm tắt',
                                    content: `${detail.PlotVI}` || 'Đang cập nhật ...'
                                },
                                {
                                    icon: '/icons/us_icon_64.png',
                                    label: 'Plot',
                                    content: `${detail.PlotEN}` || 'Updating ...'
                                }
                            ]}
                        /> */}
                        <Typography component='p'>
                            {detail.overview /*detail.Plot*/}
                        </Typography>
                    </CardContent>

                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label='Add to favorites'>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label='Share'>
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded
                            })}
                            onClick={this._handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label='Show more'
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>

                    <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
                        <CardContent>
                            <div style={{ display: 'flex', flexDirection: `${_flexDirection}` }}>
                                <div style={{ flex: `${_flexSize.leftOrTop}` }}>
                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Release Date:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            detail.release_date /*detail.ReleaseDate*/
                                        }
                                    </Typography>

                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Original Language:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            detail.original_language /*detail.Country*/
                                        }
                                    </Typography>

                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Vote Average:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            detail.vote_average.toFixed(1) /*detail.ImdbRating*/
                                        } / 10
                                    </Typography>
                                </div>
                                <div style={{ flex: `${this._calcFlexSize(width).rightOrBottom}` }}>
                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Genres:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            this._getCategoryComponents(detail.genres/*detail.Category*/)
                                        }
                                    </Typography>

                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Production Companies:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            this._getCompanies(detail.production_companies) /*this._getDirectorComponents(detail.Director)*/
                                        }
                                    </Typography>

                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Spoken Languages:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            this._getLanguages(detail.spoken_languages) /*this._getCasterComponents(detail.Cast)*/
                                        }
                                    </Typography>
                                </div>

                            </div>

                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        )
    }
}

ReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
    detail: PropTypes.object.isRequired,
    onPlay: PropTypes.func
}

export default compose(withStyles(styles), withWidth())(ReviewCard)