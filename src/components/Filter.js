import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";

export const Filter = ({ setFilters, selectedFilters }) => {
  const onChange = (e) => {
    /**
     * {
     * cuisineType:["Mediterraans"]
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

  console.log(selectedFilters);

  return (
    <Container>
      <h3>Zin in</h3>
      <Form>
        {["checkbox"].map((type) => (
          <Form.Group key={`default-${type}`} className="mb-3">
            <Form.Label>Keuken</Form.Label>
            <Form.Check
              type={type}
              id={`default-${type}-Belgisch-Frans`}
              label="Belgisch-Frans"
              value="BelgischFrans"
              name="cuisineType"
              checked={selectedFilters.cuisineType?.includes("BelgischFrans")}
              onChange={onChange}
            />
            <Form.Check
              type={type}
              id={`default-${type}-Tex-Mex`}
              label="Tex-Mex"
              value="TexMex"
              name="cuisineType"
              checked={selectedFilters.cuisineType?.includes("TexMex")}
              onChange={onChange}
            />
            {/* <Form.Check
              type={type}
              id={`default-${type}-Mediterraans`}
              label="Mediterraans"
              value="Mediterraans"
              name="cuisineType"
              checked={cuisineType.Mediterraans}
              onChange={onChange}
            />
            <Form.Check
              type={type}
              id={`default-${type}-Oosters`}
              label="Oosters"
              value="Oosters"
              name="cuisineType"
              checked={cuisineType.Oosters}
              onChange={onChange}
            />
          </Form.Group> */}
            {/* ))} */}

            {/* {["checkbox"].map((type) => (
          <Form.Group key={`default-${type}`} className="mb-3">
            <Form.Label>Type Gerecht</Form.Label>
            <Form.Check
              type={type}
              id={`default-${type}-Ontbijt`}
              label="Ontbijt"
              value="Ontbijt"
              name="mealType"
              checked={mealType.Ontbijt}
              onChange={onChange}
            />
            <Form.Check
              type={type}
              id={`default-${type}-Lunch`}
              label="Lunch"
              value="Lunch"
              name="mealType"
              checked={mealType.Lunch}
              onChange={onChange}
            />
            <Form.Check
              type={type}
              id={`default-${type}-Dinner`}
              label="Dinner"
              value="Dinner"
              name="mealType"
              checked={mealType.Dinner}
              onChange={onChange}
            />
            <Form.Check
              type={type}
              id={`default-${type}-Dessert`}
              label="Dessert"
              value="Dessert"
              name="mealType"
              checked={mealType.Dessert}
              onChange={onChange}
            />
          </Form.Group>
        ))}
        {["checkbox"].map((type) => (
          <Form.Group key={`default-${type}`} className="mb-3">
            <Form.Label>Type Gerecht</Form.Label>
            <Form.Check
              type={type}
              id={`default-${type}-Max30`}
              label="Minder dan 30 minuten"
              value="Max30"
              name="cookingTime"
              checked={cookingTime.Max30}
              onChange={onChange}
            />
            <Form.Check
              type={type}
              id={`default-${type}-Max60`}
              label="Tusen de 30 minuten en een uur"
              value="Max60"
              name="cookingTime"
              checked={cookingTime.Max60}
              onChange={onChange}
            />
            <Form.Check
              type={type}
              id={`default-${type}-Min60`}
              label="Meer dan een uur"
              value="Min60"
              name="cookingTime"
              checked={cookingTime.Min60}
              onChange={onChange}
            /> */}
          </Form.Group>
        ))}
      </Form>
    </Container>
  );
};
