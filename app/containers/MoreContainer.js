



import React from 'react';
import {connect} from 'react-redux';
import MorePage from '../pages/MorePage';

class MoreContainer extends React.Component {
    render() {
        return (
            <MorePage {...this.props} />
        )
    }
}

export default connect((state) => {

    const { MorePage } = state;
    return {
        MorePage
    }
})(MoreContainer);
