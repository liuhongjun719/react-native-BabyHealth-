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
} from 'react-native';



import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import Icon from 'react-native-vector-icons/FontAwesome';
import RecipeAnswers from '../Data/RecipeAnswers.json';
import AnswersDetailIntroduce from '../pages/AnswersDetailIntroduce.js';





class Class extends Component {
    constructor(props) {
        super(props);
        this._renderRow = this.renderRow.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    render() {
        const {Class} = this.props;
        // console.log(this.props);
        // let classList = Class.ClassDate;
        let classList = RecipeAnswers.section;


        return (
            <View>
                <HeaderView
                    titleView= '营养问答'
                    />
                {
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(classList) }
                        renderRow={this._renderRow}
                        enableEmptySections={true}
                        initialListSize= {10}
                        style={{ height: Common.window.height - 40 - 64 }}
                        />
                }
            </View>
        );

    }

    renderRow(rowDate) {
        // console.log(rowDate);
        return (

            <TouchableOpacity
                activeOpacity={0.75}
                onPress={this._onPressFeedItem.bind(this, rowDate.item) }
                style={styles.center}
                >
                <View style = {styles.container}>
                   <Image style = {styles.image_left} source = {{uri: rowDate.url + '.jpg'}}></Image>
                   <View style = {styles.right_view}>
                      <Text style = {styles.title}>{rowDate.name}</Text>
                      <Icon color="lightgrey" size={30} name='angle-right'/>
                   </View>
                </View>

            </TouchableOpacity>
        );
    }
    _onPressFeedItem(rowDate) {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: rowDate.title,
                component: AnswersDetailIntroduce,
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
image_left: {
  height: 60,
  width: 60,
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 0,
  borderRadius: 30,
},

title: {
  textAlign: 'left',
  marginLeft: 30,
  alignSelf: 'center',
  marginLeft: 30,
},

icon: {
},

right_view: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
}

});
module.exports = Class;
