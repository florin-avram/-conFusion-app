import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, Alert, PanResponder} from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})


function RenderDish(props) {
    const dish = props.dish;

    const recognizeRightToLeftDrag = ({moveX, moveY, dx, dy}) => {
        if (dx < -200)
            return true;
        return false;
    }

    const recognizeLeftToRightDrag = ({moveX, moveY, dx, dy}) => {
        if (dx > 200)
            return true;
        return false;
    }

    let viewRef;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder:
            (e, gestureState) => { return true; },
        onPanResponderGrant:
            () => {
                viewRef.rubberBand(1000)
                    .then(endState => console.log(endState.finished ? ' finished' : 'cancelled'))
            },
        onPanResponderEnd:
            (e, gestureState) => {
                if (recognizeRightToLeftDrag(gestureState))
                    Alert.alert(
                        'Add to Favorites',
                        'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel pressed'),
                                style: 'cancel'
                            },
                            {
                                text: 'Ok',
                                onPress: () =>
                                    props.favorite ? console.log('Already favorite') : props.onPress() 
                            }
                        ],
                        { cancelable: false}
                    )
                if (recognizeLeftToRightDrag(gestureState)) {
                    props.toggleModal();
                }
                return true;
            },
    })

    if (dish != null) {
        return(
            <Animatable.View
                animation="fadeInDown"
                duration={2000}
                delay={1000}
                {...panResponder.panHandlers}
                ref={(ref) => { viewRef = ref }}
            >
                <Card>
                    <Card.Title> {dish.name} </Card.Title>
                    <Card.Image source={{uri: baseUrl + dish.image}}/>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Icon 
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? 
                                console.log('Already favorite') :
                                props.onPress()
                            }
                        />
                        <Icon 
                            raised
                            reverse
                            name={'pencil'}
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.toggleModal() }
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index }) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>
                    {item.comment}
                </Text>
                <Rating
                    imageSize={15}
                    readonly
                    startingValue={item.rating}
                    style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}
                />
                <Text style={{fontSize: 12}}>
                    {'-- ' + item.author + ', ' + item.date}
                </Text>
            </View>
        );
    }

    return (
        <Animatable.View
            animation="fadeInUp"
            duration={2000}
            delay={1000}
        >
            <Card>
                <Card.Title>Comments</Card.Title>
                <Card.Divider />
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentAuthor: '',
            comment: '',
            dishRating: 5,
            showModal: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal,
        });
    }

    resetForm() {
        this.setState({
            commentAuthor: '',
            comment: '',
            dishRating: 5,
            showModal: false,
        })
    }

    handleComment(dishId, dishRating, commentAuthor, comment) {
        this.props.postComment(dishId, dishRating, commentAuthor, comment);
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish
                    dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}
                />
                <RenderComments
                    comments={
                        this.props.comments.comments.filter((comment) => 
                            comment.dishId === dishId)
                    }
                />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={{
                        justifyContent: 'center',
                        margin: 20,
                    }}>
                        <View style={{marginBottom: 20}}>
                            <Rating
                                fractions={0}
                                ratingCount={5}
                                showRating={true}
                                startingValue={5}
                                onFinishRating={(value) => this.setState({dishRating: value})}
                            />
                        </View>
                        <Input
                            placeholder='Author'
                            leftIcon={{
                                name: 'user-o',
                                type: 'font-awesome',
                            }}
                            onChangeText={(value) => this.setState({commentAuthor: value})}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{
                                name:'comment-o',
                                type: 'font-awesome',
                            }}
                            onChangeText={(value) => this.setState({comment: value})}
                        />
                        <View style={{marginBottom: 10}}>
                            <Button
                                title='Submit'
                                color='#512DA8'
                                onPress={() => {
                                    this.handleComment(
                                        dishId,
                                        this.state.dishRating,
                                        this.state.commentAuthor,
                                        this.state.comment);
                                    this.resetForm();
                                }}
                            />
                        </View>
                        <Button
                            title='Cancel'
                            color='grey'
                            onPress={() => this.toggleModal() }
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);