import React, { Component } from 'react'

export class GroceriesPage extends Component {


    render() {
        console.log(this.props.location.state);

        return (
            <div>
                <p>This is the best gGroceriesPageGroceriesPage of all time</p>
            </div>
        )
    }
}

export default GroceriesPage
