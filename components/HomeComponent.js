import React, {Component} from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        promotions: state.promotions,
    }
}

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
                <Card.Image source={{uri: baseUrl + item.image}} />
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
    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} />
                <RenderItem
                    item={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]} />
                <RenderItem
                    item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);