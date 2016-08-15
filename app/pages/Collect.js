import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    View,
    InteractionManager,
    Dimensions,
    TextInput,
    Linking,
    DeviceEventEmitter,
    TouchableHighlight,
} from 'react-native';


import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import MoreSection from '../Data/MoreSection.json';
import Store from 'react-native-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import IngredientsDetail from './IngredientsDetail';
import { SwipeListView } from 'react-native-swipe-list-view';

const DataBase = {
  'Item': Store.model('Item'),
}


class Collect extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('ChangeCollectData', (value) => {
          console.log('oooooooooo');
          this._getCollectData();
        });

      this._getCollectData();

  }

  componentWillUnmount() {
  DeviceEventEmitter.removeAllListeners('ChangeCollectData');
  }


    _getDataSource(datas: Array<any>): ListView.DataSource {
      return this.state.dataSource.cloneWithRows(datas);
    }

    _getCollectData() {
      // TODO: 获取缓存数据
      DataBase.Item.find().then((resp) => {
        // console.log(resp);
        this.setState({
          dataSource: this._getDataSource(resp),
        });
      });
    }


    render() {
        return (
            <View style = {{backgroundColor: 'rgb(255, 250, 207)'}}>
                <HeaderView titleView= {'更多'}/>
                {
                  <SwipeListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  renderHeader={this._renderHeader}
                  style={{ height: Common.window.height-64-40, paddingLeft: 10, paddingRight: 10, paddingTop: 30, paddingBottom: 50, borderRadius: 10}}//减去导航的高度
                  rightOpenValue={-100}
                  // disableRightSwipe = {true}
                  tensinon = {0}
                  renderHiddenRow= {this._renderHiddenRow.bind(this)}
                  />

                }
            </View>
        );

    }

    _renderHiddenRow(data) {
      return (
        <View style = {styles.hide_row_back_view}>
          <TouchableHighlight onPress={this._deleteRowItem.bind(this, data)}>
            <View style = {styles.view_delete}>
                <Text style = {styles.text_delete}>Delete</Text>
            </View>
          </TouchableHighlight>
        </View>
      );

    }


    _renderHeader(){
   return (
        <Text style = {styles.header_title}>收藏</Text>
   );
 }


    renderRow(rowDate,sectionID: number | string, rowID: number | string,) {
        return (

            <TouchableOpacity
                activeOpacity={0.75}
                onPress={this._onPressFeedItem.bind(this, rowDate) }
                style={styles.center}
                >
                <View style = {styles.container}>
                   <Image style = {styles.image_left} source = {{uri: rowDate.id + '.jpg'}}></Image>
                   <View style = {styles.right_back_view}>
                      <Text style = {styles.title_text}>{rowDate.name}</Text>
                      <View style = {styles.right_view}>
                        <Text numberOfLines={3} style = {styles.prompt_text}>{rowDate.prompt}</Text>
                        <Icon color="lightgrey" size={30} name='angle-right' style = {{marginRight: 5}}/>
                      </View>
                      <Text style = {styles.month_text}>{rowDate.symptoms}</Text>
                   </View>
                </View>

            </TouchableOpacity>

        );
    }

    _deleteRowItem(data) {
      console.log(data.name);
      console.log(data.id);

      // TODO: 删除指定的_id数据
      DataBase.Item.removeById(data._id).then(() =>{
        this._getCollectData();
      });
    }




    _onPressFeedItem(rowDate) {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: rowDate.name,
                component: IngredientsDetail,
                passProps: {
                    rowDate: rowDate,
                }
            })
        });
    }

}

const styles = StyleSheet.create({
center:{
   flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
},
container: {
    width: Common.window.width-25,
    marginLeft: 15,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,

},




header_title: {
  color: '#a9a9a9',
  fontSize: 12,
  marginBottom: 5,
  marginLeft:5,
  fontWeight: '100',
},

// TODO:
center:{
   flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
},
container: {
    width: Common.window.width-25,
    marginLeft: 15,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
},
image_left: {
  height: 60,
  width: 60,
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 5,
  borderRadius: 30,
},

title_text: {
  textAlign: 'left',
  alignSelf: 'flex-start',
  marginLeft: 0,
  paddingTop: 10,
  paddingBottom: 10,
  fontSize: 16,
  color: 'rgb(245, 109, 132)',
  fontWeight: '200',

},


right_view: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
},
right_back_view: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginLeft: 10,
},
prompt_text: {
  fontSize: 12,
  width: Common.window.width-120,
  fontWeight: '300',
  color: 'rgb(54, 26, 18)',

},

month_text: {
  fontSize: 12,
  width: Common.window.width-130,
  fontWeight: '200',
  paddingTop: 5,
  paddingBottom: 5,
  justifyContent: 'space-between',
  textAlign: 'right',
  color: 'rgb(54, 26, 18)',
},

view_delete: {
  backgroundColor: 'red',
  height: 950,
  width: 100,
},
text_delete: {
  color: 'white',
  alignSelf: 'center',
  fontSize: 20,
  marginTop: 40,
},
hide_row_back_view: {
  backgroundColor: 'white',
  marginLeft: Common.window.width-120,
},


});
export default  Collect;

// <ListView
//     dataSource={this.state.dataSource}
//     renderRow={this.renderRow}
    // renderHeader={this._renderHeader}
//     enableEmptySections={true}
//     initialListSize= {10}
//     style={{ height: Common.window.height-64-40, paddingLeft: 10, paddingRight: 10, paddingTop: 30, paddingBottom: 50, borderRadius: 10}}//减去导航的高度
//     />
