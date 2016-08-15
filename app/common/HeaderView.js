/**
 * Created by ljunb on 16/5/8.
 * 导航栏标题
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../common/common';
import Store from 'react-native-store';



export default class Header extends React.Component {


    render() {

        let NavigationBar = [];
        // 左边图片按钮
        if (this.props.leftIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftIcon'}
                    activeOpacity={0.75}
                    // style={styles.leftIcon}
                    onPress={this.props.leftIconAction}
                    >
                    <View style = {styles.left_view}>
                      <Icon color="white" size={30} name={this.props.leftIcon}/>
                      <Text style = {styles.left_title}>返回</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        // 标题
        if (this.props.title != undefined) {
            NavigationBar.push(
                <Text key={'title'} style={styles.title}>{this.props.title}</Text>
            )
        }

        // 自定义标题View
        if (this.props.titleView != undefined) {
            let Component = this.props.titleView;

            NavigationBar.push(
                <Text key={'titleView'} style={(this.props.leftIcon == undefined)? styles.title_view_no_left : styles.title_view_contain_left}>{this.props.titleView}</Text>
            )
        }

        if (this.props.rightButton != undefined) {
            NavigationBar.push(
              <TouchableOpacity
                  key={'rightIcon'}
                  activeOpacity={0.75}
                  onPress={this.props.collectIconAction}
                  style = {{height: 30, width: 40, backgroundColor: 'transparent', marginLeft:50, marginRight: 10, marginTop: 10,}}
                  >
                <Image source = {{uri: (this.props.isCollect == false || this.props.isCollect == undefined) ? 'no_collect.png' : 'has_collect.png'}} style = {styles.right_image}></Image>
              </TouchableOpacity>
            )
        }

console.log('KKKKKKKKKKKKKK ' + this.props.isCollect);


        return (
            <View style={styles.navigationBarContainer}>
                {NavigationBar}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    navigationBarContainer: {
      // flex: 1,
        marginTop: 0,
        flexDirection: 'row',
        height: 64,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: 'rgba(244.0, 109.0, 136.0, 1.0)',
    },

    title: {
        fontSize: 15,
        marginLeft: 15,
        color: 'white',
        alignSelf: 'flex-start',
    },
    title_view_contain_left: {
        fontSize: 18,
        marginTop: 10,
        color: 'white',
        marginLeft:Common.window.width/2-70,
    },
    title_view_no_left: {
      fontSize: 18,
      marginTop: 10,
      color: 'white',
      marginLeft: Common.window.width/2-30,
    },
    leftIcon: {
       left: -Common.window.width/2+45,
    },

    left_view: {
      flexDirection: 'row',
      marginLeft: 10,
      marginTop: 5,
    },
    left_title: {
      fontSize: 15,
      color: 'white',
      alignSelf: 'center',
      marginLeft: 5,
      paddingTop: 4,
    },

    right_image: {
      height: 17,
      width: 17,
      alignSelf: 'center',
      marginLeft: 10,
      marginTop: 10,
    },
})
