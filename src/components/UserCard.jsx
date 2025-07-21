import React from "react";

const UserCard = ({ user }) => {
  const { firstName, LastName, profile, age, gender, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={user.profile} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.LastName}</h2>
               <p>{age}</p>
 <p>{gender}</p>
        <p>{user.about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
