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
    DeviceEventEmitter,
    InteractionManager,
} from 'react-native';
import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import Icon from 'react-native-vector-icons/FontAwesome';
import Store from 'react-native-store';

import {toastShort } from '../utils/ToastUtil';




const DataBase = {
  'Item': Store.model('Item'),
}

var containerData = {};

export default class IngredientsDetail extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isCollect: false,
      };
  }

  _saveData() {
    DataBase.Item.add({
        prompt: containerData.prompt,
        symptoms: containerData.symptoms,
        id: containerData.id,
        ingredients: containerData.ingredients,
        lock: containerData.lock,
        month: containerData.month,
        practice: containerData.practice,
        name: containerData.name,

    });
    // DataBase.Item.find().then(resp =>
    //   console.log(resp)
    // );

    // DataBase.Item.find().then(resp =>this.setState({containerData: resp}));
    // console.log(containerData);



    InteractionManager.runAfterInteractions(() => {
      // TODO: 弹出收藏成功提示框
      toastShort('收藏成功!');
      // TODO: 发送通知，在收藏界面刷新界面
      DeviceEventEmitter.emit('ChangeCollectData');
    });






  }



    render() {
        let rowDate = this.props.rowDate;
        containerData = this.props.rowDate;
        // console.log(containerData);

        DataBase.Item.findById(containerData._id).then((resp) =>{
          if (resp != undefined) {
            console.log('------Contain data------' + resp.name);
            this.setState({
              isCollect: true,
            });
          }else {
            console.log('------NO data------' + resp);
            this.setState({
              isCollect: false,
            });
          }
        });


        // if (containerData._id == undefined) {
        //   this.setState({
        //     isCollect: false,
        //   });
        // }else {
        //   DataBase.Item.findById(containerData._id).then((resp) =>{
        //     if (resp != undefined) {
        //       console.log('------Contain data------' + resp.name);
        //       this.setState({
        //         isCollect: true,
        //       });
        //     }else {
        //       console.log('------NO data------' + resp);
              // this.setState({
              //   isCollect: false,
              // });
        //     }
        //   });
        // }





        return (
            <View>
                <HeaderView
                    titleView= {rowDate.name}
                    leftIcon={'angle-left'}
                    collectIconAction={this._saveData}
                    leftIconAction={() => this.props.navigator.pop() }
                    rightButton = {'right'}
                    isCollect = {this.state.isCollect}
                    />

                  <ScrollView style={{ height: Common.window.height-64}}>
                    <Image style = {styles.image_top} source = {{uri: rowDate.id + '.jpg'}}></Image>
                    <Text style = {styles.symptoms_text}>{'【针对症状】:' + rowDate.symptoms}</Text>
                    <Text style = {styles.month_text}>{'【适合宝宝】:' + rowDate.month}</Text>
                    <Text style = {styles.ingredients_title_text}>{'【原料】'}</Text>
                    <Text style = {styles.ingredients_content_text} numberOfLines = {0}>{rowDate.ingredients}</Text>
                    <Text style = {styles.practice_title_text}>{'【做法】'}</Text>
                    <Text style = {styles.practice_content_text} numberOfLines = {0}>{rowDate.practice}</Text>
                    <Text style = {styles.prompt_title_text}>{'【特点】'}</Text>
                    <Text style = {styles.prompt_content_text} numberOfLines = {0}>{rowDate.prompt}</Text>
                    <View style = {{height: 100, backgroundColor: 'transparent'}}></View>
                  </ScrollView>

            </View>
        );
    }
}


const styles = StyleSheet.create({
image_top: {
  width: Common.window.width-40,
  height: Common.window.width-40,
  marginTop: 20,
  marginLeft: 20,

},
symptoms_text: {
  marginTop: 20,
  marginLeft: 20,
  marginRight: 20,
},
month_text: {
  marginTop: 20,
  marginLeft: 20,
  marginRight: 20,
},
ingredients_title_text: {
  marginTop: 20,
  marginLeft: 20,
},
ingredients_content_text: {
  marginLeft: 20,
  marginRight: 20,
  marginTop: 5,
},
practice_title_text: {
  marginTop: 20,
  marginLeft: 20,
},
practice_content_text: {
  marginLeft: 20,
  marginTop: 5,
},
prompt_title_text: {
  marginTop: 20,
  marginLeft: 20,
},
prompt_content_text: {
  marginLeft: 20,
  marginRight: 20,
  marginTop: 5,


},

});
