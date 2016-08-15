

import React from 'react';
import {connect} from 'react-redux';
import Answers from '../pages/Answers';

class AnswersContainers extends React.Component {
    render() {
        return (
            <Answers {...this.props} />
        )
    }
}

export default connect((state) => {

    const { Answers } = state;
    return {
        Answers
    }
})(AnswersContainers);
