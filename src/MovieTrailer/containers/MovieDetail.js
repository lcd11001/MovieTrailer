import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
import red from '@material-ui/core/colors/red'

import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import CircularLoading from '../components/CircularLoading'
import PaperSheet from '../components/PaperSheet'
import MultiLinesGridList from '../components/MultiLinesGridList'

import * as actions from '../redux/actions'

const styles = theme => ({
    card: {
        maxWidth: '100%'
    },
    cardHeader: {
        fontSize: '2.0rem'
    },
    media: {
        height: 0,
        paddingTop: '30%'
    },
    actions: {
        display: 'flex'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        }),
        marginLeft: 'auto'
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatar: {
        backgroundColor: red[500]
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
    },
})

class MovieDetailCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            movieID: props.match.params.movieID
        }
    }

    _getMovieCategory = (categories) => {
        return categories.map((value, index) => {
                return <a href={`/category/${value.CategoryID}`}>{value.CategoryName}</a>
            })
            .reduce((prev, curr, curIndex) => {
                if (curIndex > 0) {
                    return [...prev, ' - ', curr]
                } else {
                    return [...prev, curr]
                }
                
            }, 0)
    }

    _getMovieCasters = (casters) => {
        return casters.split('/')
            .map((value, index) => {
                return <a href={`/caster/${value.trim().replace(/ /g, '%20')}`}>{value.trim()}</a>
            })
            .reduce((prev, curr, curIndex) => {
                if (curIndex > 0) {
                    return [...prev, ' - ', curr]
                } else {
                    return [...prev, curr]
                }
                
            }, 0)
    }

    _getMovieDirector = (director) => {
        return <a href={`/director/${director.trim().replace(/ /g, '%20')}`}>{director.trim()}</a>
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            movieID: nextProps.match.params.movieID
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.movieID !== this.state.movieID) {
            this.props.loadMovieDetail(nextState.movieID)
        }

        return true
    }

    componentDidMount() {
        this.props.loadMovieDetail(this.state.movieID)
    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    _calcFlexDirection = (width) => {
        switch (width)
        {
            case 'xs':
                return 'column'

            default:
                break
        }

        return 'row'
    }

    _calcFlex = (width) => {
        switch (width)
        {
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

    render() {
        // console.log('MovieDetail', this.props)
        const {
            fetch: {
                Loading,
                Error
            },
            classes,
            width,
            detail
        } = this.props

        if (Loading || detail === null) {
            return (
                <div className={classes.loading}>
                    <CircularLoading />
                </div>
            )
        }

        if (Error) {
            return (
                <Fragment>
                    <PaperSheet title={'MovieDetail page error'} description={Error} />
                </Fragment>
            )
        }

        console.log(width)

        return (
            <Fragment>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label='IMDB rating' className={classes.avatar}>
                                {detail.ImdbRating}
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={
                            <Typography className={classes.cardHeader}>{detail.KnownAs}</Typography>
                        }
                        subheader={detail.MovieName}
                    />
                    
                    <CardMedia
                        className={classes.media}
                        image={detail.NewBackdrop}
                        title={detail.KnownAs}
                    />
                    
                    <CardContent>
                        <Typography component='p'>
                            {detail.PlotVI}
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
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label='Show more'
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>

                    <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
                        <CardContent>
                            <div style={{display: 'flex', flexDirection: `${this._calcFlexDirection(width)}`}}>
                                <div style={{flex: `${this._calcFlex(width).leftOrTop}`}}>
                                    <Typography paragraph variant='body2'>
                                        Năm sản xuất:
                                    </Typography>                            
                                    <Typography paragraph>
                                        { 
                                            detail.ReleaseDate
                                        }
                                    </Typography>

                                    <Typography paragraph variant='body2'>
                                        Quốc gia:
                                    </Typography>                            
                                    <Typography paragraph>
                                        { 
                                            detail.Country
                                        }
                                    </Typography>

                                    <Typography paragraph variant='body2'>
                                        Chấm điểm:
                                    </Typography>                            
                                    <Typography paragraph>
                                        { 
                                            detail.ImdbRating
                                        }
                                    </Typography>
                                </div>
                                <div style={{flex: `${this._calcFlex(width).rightOrBottom}`}}>
                                    <Typography paragraph variant='body2'>
                                        Thể loại:
                                    </Typography>                            
                                    <Typography paragraph>
                                        { 
                                            this._getMovieCategory(detail.Category) 
                                        }
                                    </Typography>

                                    <Typography paragraph variant='body2'>
                                        Đạo diễn:
                                    </Typography>                            
                                    <Typography paragraph>
                                        { 
                                            this._getMovieDirector(detail.Director)
                                        }
                                    </Typography>

                                    <Typography paragraph variant='body2'>
                                        Diễn viên:
                                    </Typography>
                                    <Typography paragraph>
                                        { this._getMovieCasters(detail.Cast) }
                                    </Typography>
                                </div>
                                
                            </div>
                            
                        </CardContent>
                    </Collapse>
                </Card>

                <Typography paragraph variant='body2'>
                    Phim liên quan:
                </Typography> 
                <MultiLinesGridList {...{match: this.props.match}} data={detail.Relative} cols={7} cellHeight={300} />
            </Fragment>
        )
    }
}

MovieDetailCard.propTypes = {
    classes: PropTypes.object.isRequired
}



const mapStateToProps = (state) => (
    {
        fetch: state.fetch,
        detail: state.movies.MovieDetail,
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        loadMovieDetail: (movieID) => {
            dispatch(actions.loadMovieDetail(movieID))
        }
    }
)

export default compose(withStyles(styles), withWidth(), connect(mapStateToProps, mapDispatchToProps))(MovieDetailCard)