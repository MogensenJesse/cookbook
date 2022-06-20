import React, { useState } from "react";
// import { Form, Container } from "react-bootstrap";

export const Filter = ({ setFilters, selectedFilters }) => {
  const onChange = (e) => {
    /**
     * {
     * mealType:["Mediterraans"]
     * }
     */
    const selectedName = e.target.name;
    if (e.target.checked) {
      // if checkboxes are being checked
      setFilters({
        // we spread selectedFilters to preserve already selected filters
        ...selectedFilters,
        // check if selectedName is already present in selectedFilters
        [selectedName]: selectedFilters[selectedName]
          ? // if so we added the newly selected value to the existing array in the selectedFilters
            // if not we initialise a new array with the selected value
            selectedFilters[selectedName].concat(e.target.value)
          : [e.target.value],
      });
    } else {
      // if checkboxes are being deselected
      // we calculate the new values of the selectedName by removing the selected value
      const newValues = selectedFilters[selectedName].filter((value) => value !== e.target.value);
      // we spread selectedFilters to preserve already selected filters
      const newFilters = { ...selectedFilters, [selectedName]: newValues };
      // if the new values are an empty array we need to remove the selectedName from the selectedFilters
      // because firebase doesn't allow an empty array in it's compound queries
      if (newValues.length === 0) {
        delete newFilters[selectedName];
      }
      setFilters(newFilters);
    }
  };

  // console.log(selectedFilters);

  return (
    <div className="filter">
      <span className="recipeCard__name">I would like some...</span>
      <form>
        {["checkbox"].map((type) => (
          <div key={`default-${type}`} className="filter__container">
            <label className="filter__control">
              <input
                className="filter__control__checkbox"
                type={type}
                id={`default-${type}-Breakfast`}
                label="Breakfast"
                value="Breakfast"
                name="mealType"
                checked={selectedFilters.mealType?.includes("Breakfast")}
                onChange={onChange}
              />
              Breakfast
            </label>
            <label className="filter__control">
              <input
                className="filter__control__checkbox"
                type={type}
                id={`default-${type}-Lunch`}
                label="Lunch"
                value="Lunch"
                name="mealType"
                checked={selectedFilters.mealType?.includes("Lunch")}
                onChange={onChange}
              />
              Lunch
            </label>

            <label className="filter__control">
              <input
                className="filter__control__checkbox"
                type={type}
                id={`default-${type}-Snack`}
                label="Snack"
                value="Snack"
                name="mealType"
                checked={selectedFilters.mealType?.includes("Snack")}
                onChange={onChange}
              />
              Snacks
            </label>

            <label className="filter__control">
              <input
                className="filter__control__checkbox"
                type={type}
                id={`default-${type}-Dinner`}
                label="Dinner"
                value="Dinner"
                name="mealType"
                checked={selectedFilters.mealType?.includes("Dinner")}
                onChange={onChange}
              />
              Dinner
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};
