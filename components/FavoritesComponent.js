import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Tile, ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes:state.dishes,
        favorites: state.favorites,
    }
}

class Favorites extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;         
        const renderMenuItem = ({ item, index }) => {
            return (
                <ListItem
                    key = {index}
                    onPress={() => navigate('DishDetail', { dishId: item.id })}
                >
                    <Avatar 
                        rounded
                        source={{uri: baseUrl + item.image}}
                    />
                    <ListItem.Content>
                        <ListItem.Title> {item.name} </ListItem.Title>
                        <ListItem.Subtitle> {item.description} </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        }

        if (this.props.dishes.isLoading) {
            return (<Loading />);
        } else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>
                        {this.props.dishes.errMess}
                    </Text>
                </View>
            )
        } else {
            const favoriteDishes = this.props.dishes.dishes.filter((dish) => 
                this.props.favorites.includes(dish.id)
            );

            return (
                <FlatList
                    data={favoriteDishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps)(Favorites)