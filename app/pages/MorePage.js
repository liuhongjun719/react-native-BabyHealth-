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
} from 'react-native';


import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import MoreSection from '../Data/MoreSection.json';






class RecipeDetail extends Component {
    constructor(props) {
        super(props);
        let curText = '';
        this._renderRow = this.renderRow.bind(this);
        this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
    }

    render() {
        let classList = MoreSection.section;
        return (
            <View style = {{backgroundColor: 'rgb(255, 250, 207)'}}>
                <HeaderView titleView= {'更多'}/>
                {
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(classList) }
                        renderRow={this._renderRow}
                        renderHeader={this._renderHeader}
                        enableEmptySections={true}
                        initialListSize= {10}
                        style={{ height: Common.window.height-64-40, paddingLeft: 10, paddingRight: 10, paddingTop: 30, paddingBottom: 50, borderRadius: 10}}//减去导航的高度
                        />
                }
            </View>
        );

    }


    _onEndEditing(text) {
      this.setState((state) => {
        return {
          curText: text,
        };
      });
    }
    _updateText(text) {
      this.setState((state) => {
        return {
          curText: text,
        };
      });
    }

    _renderHeader(){
   return (
        <Text style = {styles.header_title}>精品推荐</Text>
   );
 }


    renderRow(rowDate,sectionID: number | string, rowID: number | string,) {
        return (

            <TouchableOpacity
                activeOpacity={0.75}
                onPress={this._onPressFeedItem.bind(this, rowDate, rowID) }
                style={styles.center}
                >
                <View style = {styles.container}>
                   <Image style = {styles.image_left} source = {{uri: rowDate.url}}></Image>
                   <View style = {styles.right_back_view}>
                      <Text style = {styles.title_text} numberOfLines = {2}>{rowDate.name}</Text>
                   </View>
                </View>

            </TouchableOpacity>
        );
    }
    _onPressFeedItem(rowDate, rowID) {
        InteractionManager.runAfterInteractions(() => {
          Linking.openURL(rowDate.linkUrl);
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
image_left: {
  height: 60,
  width: 60,
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 10,
  borderRadius: 30,
},

title_text: {
  textAlign: 'left',
  alignSelf: 'flex-start',
  marginLeft: 0,
  paddingTop: 0,
  paddingBottom: 5,
  fontSize: 16,
  color: 'rgb(245, 109, 132)',
  fontWeight: '200',

},

right_back_view: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginLeft: 10,
  // backgroundColor: 'red',
},


header_title: {
  color: '#a9a9a9',
  fontSize: 12,
  marginBottom: 5,
  marginLeft:5,
  fontWeight: '100',
},


});
module.exports = RecipeDetail;
