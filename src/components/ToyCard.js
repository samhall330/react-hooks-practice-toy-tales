import React, {useState} from "react";

function ToyCard({ id, name, image, likes, toys, setToys}) {

  const [toyLikes, setToyLikes] = useState(likes)

  function deleteToy(){
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    });
    setToys(toys.filter((toy) => toy.id !== id));
  }

  function handleLikes(){
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({likes: toyLikes + 1})
    })
    .then(r => r.json())
    .then(data => setToyLikes(data.likes))
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{toyLikes} Likes </p>
      <button onClick={handleLikes} className="like-btn">Like {"<3"}</button>
      <button onClick={deleteToy} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
