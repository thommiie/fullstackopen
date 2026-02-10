import { useState, useEffect } from 'react'
import personService from './services/persons'
import './app.css'

const Notification = ({ message, type }) => {
  if (!message) return null

  return <div className={type}>{message}</div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (confirm(`${newName} is already added, replace number?`)) {
        const updatedPerson = { ...existing, number: newNumber }

        personService
          .update(existing.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existing.id ? p : returnedPerson
            ))
            showNotification(`Updated ${returnedPerson.name}`, 'success')
          })
      }
      return
    }

    const personObject = { name: newName, number: newNumber }

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      showNotification(`Added ${returnedPerson.name}`, 'success')
    })

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showNotification(`Deleted ${person.name}`, 'success')
      })
    }
  }

  const showNotification = (message, type) => {
    setNotification(message)
    setNotificationType(type)

    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const personsToShow = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} type={notificationType} />

      <div>
        filter shown with
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <h3>Add a new</h3>

      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h3>Numbers</h3>

      <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
