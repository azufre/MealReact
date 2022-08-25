import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = (props) => {

  const [meals, setMeals] = useState([])

  useEffect(()=>{
    
    const fetchData = async () => {
      const response = await fetch('https://foodapp-82b3c-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();

      const loadedMeals = [];

      for(const key in responseData){
        loadedMeals.push(
          {
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          }
        )
      }

      setMeals(loadedMeals);

    }

    fetchData();
    

  }, [])

  const MealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{MealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
