import React from 'react';
import { ANIMALS } from 'petfinder-client';
import pf from 'petfinder-client';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Search extends React.Component {
  state = {
    location: `Seattle, WA`,
    animal: ``,
    breed: ``
  }

  handleLocationChange = e => {
    this.setState({
      location: e.target.value
    })
  }

  handleAnimalChange = e => {
    this.setState({
      animal: e.target.value
    },
      this.getBreeds
    )
  }

  handleBreedChange = e => {
    this.setState({
      breed: e.target.value
    })
  }

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            })
          } else {
            this.setState({ breeds: [] })
          }
        })
        .catch(console.error)
    } else {
      this.setState({ breeds: [] })
    }
  }

  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          location
          <input onChange={this.handleLocationChange} id="location" value={this.state.location} placeholder="location" />
        </label>
        <label htmlFor="animal">
          <select id="animal" value={this.state.animal} onChange={this.handleAnimalChange} onBlur={this.handleAnimalChange}>
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          breed
          <select id="breed"
            value={this.state.breed}
            onChange={this.handleBreedChange}
            onBlur={this.handleBreedChange}
            disabled={!this.state.breeds.length}>
            <option />
            {this.state.breeds.map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </div>

    )
  }

}

export default Search;