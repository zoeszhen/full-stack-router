import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      (async () => {
        try {
          const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`);
          setCountry(response)
        } catch (error) {
          setCountry(error)
        }
      })()
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.response && country.response.status === 404) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    country.data.map(({ name, capital, population, flag }) =>
      <div>
        <h3>{name} </h3>
        <div>capital {capital} </div>
        <div>population {population}</div>
        <img src={flag} height='100' alt={`flag of ${name}`} />
      </div>
    )
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App