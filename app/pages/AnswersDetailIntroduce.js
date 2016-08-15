import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    Dimensions,
    WebView,
} from 'react-native';
import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AnswersDetailIntroduce extends Component {
    render() {
        let rowDate = this.props.rowDate;


        return (
            <View>
                <HeaderView
                    titleView= {'详情介绍'}
                    leftIcon={'angle-left'}
                    leftIconAction={() => this.props.navigator.pop()}
                    />

                  <ScrollView style={{ height: Common.window.height-64}}>
                    <Text style = {styles.title} numberOfLines = {0}>{rowDate.title}</Text>
                    <Image style = {styles.image_middle} source = {{uri: rowDate.thumbnail + '.jpg'}}></Image>
                    <WebView
                     style = {styles.webview}
                     html = {rowDate.content}
                     automaticallyAdjustContentInsets = {true}
                     javascriptEnabled = {true}>
                    </WebView>
                  </ScrollView>



            </View>
        );
    }
}


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  image_middle: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    width: Common.window.width-40,
    height: Common.window.width-40,
  },
  content: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },

  webview: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    width: Common.window.width-40,
    height: Common.window.width-40,
  },

});
