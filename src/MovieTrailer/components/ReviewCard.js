import React from 'react'
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

import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import IconLabelTabs from './IconLabelTabs'

import { cardStyles as styles } from '../styles'

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
        director = director || 'unknown'
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

        const _flexDirection = this._calcFlexDirection(width)
        const _flexSize = this._calcFlexSize(width)
        
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label='IMDB rating' className={classes.avatar}>
                                <Typography className={classes.avatarText}>{detail.ImdbRating}</Typography>
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={
                            <Typography className={classes.title}>{detail.KnownAs}</Typography>
                        }
                        subheader={
                            <Typography className={classes.subtitle}>{detail.MovieName}</Typography>
                        }
                    />

                    <CardMedia
                        className={classes.media}
                        image={detail.NewBackdrop}
                        title={detail.KnownAs}
                    />

                    <CardContent>
                        <IconLabelTabs 
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
                        />
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
                                        Năm sản xuất:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            detail.ReleaseDate
                                        }
                                    </Typography>

                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Quốc gia:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            detail.Country
                                        }
                                    </Typography>

                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Chấm điểm:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            detail.ImdbRating
                                        }
                                    </Typography>
                                </div>
                                <div style={{ flex: `${this._calcFlexSize(width).rightOrBottom}` }}>
                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Thể loại:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            this._getCategoryComponents(detail.Category)
                                        }
                                    </Typography>

                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Đạo diễn:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
                                        {
                                            this._getDirectorComponents(detail.Director)
                                        }
                                    </Typography>

                                    <Typography paragraph className={classes.paragraphHeader}>
                                        Diễn viên:
                                    </Typography>
                                    <Typography paragraph className={classes.paragraph}>
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

export default compose(withStyles(styles), withWidth())(ReviewCard)