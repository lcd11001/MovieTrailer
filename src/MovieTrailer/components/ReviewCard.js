import React from 'react'
import PropTypes from 'prop-types'
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

const styles = theme => ({
    card: {
        maxWidth: '100%',
    },
    cardHeader: {
        fontSize: '2.0rem'
    },
    media: {
        height: 0,
        paddingTop: '40%'
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
})

class ReviewCard extends React.Component {
    state = { expanded: false }

    _handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    _getCategoryComponents = (categories) => {
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

    _getCasterComponents = (casters) => {
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

    _getDirectorComponents = (director) => {
        return <a href={`/director/${director.trim().replace(/ /g, '%20')}`}>{director.trim()}</a>
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

    _calcFlexSize = (width) => {
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
        const { 
            classes, 
            detail,
            width 
        } = this.props

        return (
            <div>
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
                            onClick={this._handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label='Show more'
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>

                    <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
                        <CardContent>
                            <div style={{ display: 'flex', flexDirection: `${this._calcFlexDirection(width)}` }}>
                                <div style={{ flex: `${this._calcFlexSize(width).leftOrTop}` }}>
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
                                <div style={{ flex: `${this._calcFlexSize(width).rightOrBottom}` }}>
                                    <Typography paragraph variant='body2'>
                                        Thể loại:
                                    </Typography>
                                    <Typography paragraph>
                                        {
                                            this._getCategoryComponents(detail.Category)
                                        }
                                    </Typography>

                                    <Typography paragraph variant='body2'>
                                        Đạo diễn:
                                    </Typography>
                                    <Typography paragraph>
                                        {
                                            this._getDirectorComponents(detail.Director)
                                        }
                                    </Typography>

                                    <Typography paragraph variant='body2'>
                                        Diễn viên:
                                    </Typography>
                                    <Typography paragraph>
                                        {this._getCasterComponents(detail.Cast)}
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
}

export default withStyles(styles)(ReviewCard)