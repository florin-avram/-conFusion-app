import React, {Component} from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

function RenderItem(props) {
    const item = props.item;
    if (item != null) {
        return (
            <Card>
                <Card.FeaturedTitle>
                    <Text> {item.name} </Text>
                </Card.FeaturedTitle>
                <Card.FeaturedSubtitle>
                    <Text> {item.designation} </Text>
                </Card.FeaturedSubtitle>
                <Card.Image source={require('./images/uthappizza.png')} />
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    } else {
        return (<View></View>)
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            leaders: LEADERS,
            promotions: PROMOTIONS,
        }
    }

    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.state.dishes.filter((dish) => dish.featured)[0]} />
                <RenderItem
                    item={this.state.promotions.filter((promotion) => promotion.featured)[0]} />
                <RenderItem
                    item={this.state.leaders.filter((leader) => leader.featured)[0]} />
            </ScrollView>
        )
    }
}

export default Home;