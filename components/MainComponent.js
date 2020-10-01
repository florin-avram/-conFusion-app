import React, { Component } from 'react';
import { View, ScrollView, Text, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromotions, fetchLeaders } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromotions: () => dispatch(fetchPromotions()),
    fetchLeaders: () => dispatch(fetchLeaders()),
});

const mapStateToProps = state => {
    return {

    }
}

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }) {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={ headerOptionsStyle }
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon name='menu'
                                  size={24}
                                  color='white'
                                  iconStyle = {{marginLeft: 20}}
                                  onPress = {() => navigation.toggleDrawer() }
                            />
                        )
                    })
                }
            />
            <MenuNavigator.Screen
                name="DishDetail"
                component={DishDetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({ navigation }) {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Home'
            screenOptions={ headerOptionsStyle }
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon name='menu'
                                  size={24}
                                  color='white'
                                  iconStyle = {{marginLeft: 20}}
                                  onPress = {() => navigation.toggleDrawer() }
                            />
                        )
                    })
                }
            />         
        </HomeNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen({navigation}) {
    return (
        <AboutNavigator.Navigator
            initialRouteName='About us'
            screenOptions = { headerOptionsStyle }
        >
            <AboutNavigator.Screen
                name='About us'
                component={About}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon name='menu'
                                  size={24}
                                  color='white'
                                  iconStyle = {{marginLeft: 20}}
                                  onPress = {() => navigation.toggleDrawer() }
                            />
                        )
                    })
                }
            />
        </AboutNavigator.Navigator>
    )
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen({navigation}) {
    return (
        <ContactNavigator.Navigator
            initialRouteName='Contact us'
            screenOptions = { headerOptionsStyle }
        >
            <ContactNavigator.Screen 
                name='Contact us'
                component={Contact}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon name='menu'
                                  size={24}
                                  color='white'
                                  iconStyle = {{marginLeft: 20}}
                                  onPress = {() => navigation.toggleDrawer() }
                            />
                        )
                    })
                }
            />
        </ContactNavigator.Navigator>
    );
}

function CustomDrawerContentComponent(props) {
    return (
        <ScrollView>
            <SafeAreaView 
                style={styles.container}
                forceInset={{top: 'always', horizonal: 'never'}}
            >
                <View style={styles.drawerHeader}>
                    <View style={{flex: 1}}>
                        <Image 
                            source={require('./images/logo.png')}
                            style={styles.drawerImage}
                        />
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.drawerHeaderText}>
                            Ristorante Con Fusion
                        </Text>
                    </View>
                </View>
                <DrawerItemList {...props}/>
            </SafeAreaView>
        </ScrollView>
    );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer({ navigation }) {
    return(

        <MainNavigator.Navigator
            initialRouteName="Home"
            drawerStyle = {{backgroundColor: '#D1C4E9'}}
            drawerContent = {
                props => 
                    <CustomDrawerContentComponent {...props} />
            }
        >
            <MainNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon name='home'
                              type='font-awesome'
                              size={24}
                              color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen 
                name="About us"
                component={AboutNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon name='info-circle'
                              type='font-awesome'
                              size={24}
                              color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen 
                name="Menu"
                component={MenuNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon name='list'
                              type='font-awesome'
                              size={24}
                              color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen 
                name="Contact us"
                component={ContactNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon name='address-card'
                              type='font-awesome'
                              size={22}
                              color={tintColor}
                        />
                    )
                }}
            />
        </MainNavigator.Navigator>

    );
}
  
class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchLeaders();

    }

    render() {
        return (
          <NavigationContainer>   
            <MainNavigatorDrawer />
          </NavigationContainer>
        );
    }
}

const headerOptionsStyle = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff"            
    },
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);