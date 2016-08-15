

import React from 'react';
import {connect} from 'react-redux';
import Recipe from '../pages/Recipe';

class RecipesContainers extends React.Component {
    render() {
        return (
            <Recipe {...this.props} />
        )
    }
}

export default connect((state) => {

    const { Recipe } = state;
    return {
        Recipe
    }
})(RecipesContainers);
