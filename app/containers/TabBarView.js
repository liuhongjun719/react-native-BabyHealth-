


import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
// import HomeContainer from '../containers/HomeContainer';
// import ClassContainer from '../containers/ClassContainer';
import RecipesContainers from '../containers/RecipesContainers';
import AnswersContainers from '../containers/AnswersContainers';
import MoreContainer from '../containers/MoreContainer';

import CollectContainer from '../containers/CollectContainer';




const tabBarItems = [
    { title: '营养食谱', icon: () => <Image style={{ width: 15, height: 15 }} source={{uri:'item-cook.png'}}/>, component: RecipesContainers },
    { title: '营养问答', icon: () => <Image style={{ width: 15, height: 15 }} source={{uri:'face.png'}}/>, component: AnswersContainers },
    { title: '美味收藏', icon: () => <Image style={{ width: 15, height: 15 }} source={{uri:'love.png'}}/>, component: CollectContainer },
    { title: '更多', icon: () => <Image style={{ width: 15, height: 15 }} source={{uri:'slim.png'}}/>, component: MoreContainer },

]

export default class TarBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: tabBarItems[0].title,
        };
    }
    render() {
        return (
            <TabNavigator tabBarStyle={{ height: 40 }}>
                {
                    tabBarItems.map((controller, i) => {
                        let Component = controller.component;
                        return (
                            <TabNavigator.Item
                                key= {i}
                                selected={this.state.selectedTab === controller.title}
                                title={controller.title}
                                renderIcon={controller.icon}
                                onPress={() => this.setState({ selectedTab: controller.title }) }>
                                <Component navigator = {this.props.navigator} {...this.props}/>
                            </TabNavigator.Item>
                        )
                    })
                }
            </TabNavigator >

        );
    }


}
