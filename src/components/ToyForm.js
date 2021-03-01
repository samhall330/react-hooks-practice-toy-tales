import React, {useState} from "react";

function ToyForm({toys, setToys}) {

  const [toyFormState, setToyFormState] = useState({name: "", image:"", likes: 0})

  function handleSubmit(e){
    e.preventDefault()
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(toyFormState)
    })
    .then(r => r.json())
    .then(toyData => {
      const newToys = [...toys, toyData]
      setToys(newToys)
      setToyFormState({name: "", image:"", likes: 0})
    })
  }

  function updateFormState(event){
    const updatedFormState = {...toyFormState}
    updatedFormState[event.target.name] = event.target.value
    setToyFormState(updatedFormState)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={toyFormState.name}
          onChange={updateFormState}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={toyFormState.image}
          onChange={updateFormState}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
