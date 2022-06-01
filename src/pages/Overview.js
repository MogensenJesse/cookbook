import React from "react";
import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Popup } from "../components/Popup";
import "../assets/css/reset.css";
import "../assets/css/overview.css";

function Overview() {
  const [recipes, setRecipes] = useState([]);
  const [popupActive, setPopupActive] = useState(false);

  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
          // console.log(doc.data());
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div>
      <main className="mainContainer">
        <div>
          <h1>Browse through your brilliant dishes</h1>

          <button onClick={() => setPopupActive(true)}>Add recipe</button>

          <div className="recipesContainer">
            {recipes.map((recipe, i) => {
              return (
                <div key={recipe.id} className="recipeBox">
                  <Link to={`/overview/${recipe.id}`}>View recipe</Link>

                  <h2>{recipe.name}</h2>

                  <span>{recipe.score}</span>

                  {/* dangerouslySetInnerHTML neemt de break tags vanuit de database over */}
                  <p dangerouslySetInnerHTML={{ __html: recipe.desc }}></p>
                  {/* <p>{recipe.desc}</p> */}

                  <div>
                    <h4>Ingredients</h4>
                    <ul>
                      {recipe.ingredients.map((ingredient, i) => {
                        return <li key={i}>{ingredient}</li>;
                      })}
                    </ul>

                    <h4>Steps</h4>
                    <ol>
                      {recipe.steps.map((step, i) => {
                        return <li key={i}>{step}</li>;
                      })}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Popup trigger={popupActive} setTrigger={setPopupActive}></Popup>
    </div>
  );
}

export default Overview;

// Code om filters aan te roepen, opkuisen wel. Zie Filter.js & useCollection.js

// import React, { useState } from "react";
// import useCollection from "../hooks/useCollection";
// import BigCard from "../components/BigCard";
// import "../styles/Overview.css";
// import { Row, Col } from "react-bootstrap";
// import { Filter } from "../components/Filter";

// function Overview() {
//   const [filters, setFilters] = useState({});
//   const recipes = useCollection("recipe", filters);

//   console.log(recipes);
//   return (
//     <main className="overview">
//       {/* <div className="overview__container"> */}

//       <Row>
//         <Col xs={3}>
//           <Filter setFilters={setFilters} selectedFilters={filters} />
//         </Col>
//         <Col>
//           <h2 className="overview__title">Overview</h2>
//           <section className="overview__items">
//             {recipes.map((recipe, i) => (
//               <BigCard recipe={recipe} key={recipe.id} />
//             ))}
//           </section>
//         </Col>
//       </Row>

//       {/* </div> */}
//     </main>
//   );
// }

// export default Overview;
