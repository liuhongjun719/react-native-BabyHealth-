/**
 * Created by jason on 16/7/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import Collect from '../pages/Collect';

class CollectContainer extends React.Component {
    render() {
        return (
            <Collect {...this.props} />
        )
    }
}

export default connect((state) => {

    const { Collect } = state;
    return {
        Collect
    }
})(CollectContainer);
