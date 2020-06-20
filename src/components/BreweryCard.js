import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';

class BreweryCard extends Component {

    deleteBrewery = () => {
        const deleteObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id: this.props.brewery.id })
        }
        fetch(`https://tranquil-earth-85240.herokuapp.com/breweries/${this.props.brewery.id}`, deleteObj)
            .then(resp => resp.json())
            .then(breweries => console.log(breweries))
    }

    phonebrewery = phone => {
        let phoneArray = phone.split('')
        phoneArray.unshift('(')
        phoneArray.splice(4, 0, ')')
        phoneArray.splice(8, 0, '-')
        return < Card.Text class='text-center' > {phoneArray}</Card.Text >
    }

    render() {
        const { brewery, user } = this.props

        return (
            <div class='container-fluid d-flex align-items-center col-sm-6 col-md-3 overflow-auto'>
                <Card border='warning' style={{ height: '15rem', width: '18rem' }}>
                    <Card.Body>
                        <Card.Title class='text-center' onClick={() => this.props.breweryShow(brewery)}><Link to='/show'>{brewery.name}</Link></Card.Title>
                        <Card.Text class='text-center'>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Card.Text>
                        <a href={brewery.website} target='_blank' rel='noopener noreferrer'><Card.Text class='text-center'>Website</Card.Text></a>
                        {brewery.phone ? this.phonebrewery(brewery.phone) : null}
                        {user.admin ? <Button variant='primary' onClick={this.deleteBrewery}>Delete Brewery</Button> : null}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default BreweryCard