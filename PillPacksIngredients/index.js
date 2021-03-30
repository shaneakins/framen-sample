import React from "react";
import { Header } from "semantic-ui-react";
import i18n from "i18n";
import "./index.css";

const PillPackIngredients = ({
  type,
  pillform,
  pillImage,
  pillDesc,
  pillIngredients,
  isVegan
}) => {
  return (
    <div className="PillPackIngredients">
      <h4>{pillDesc}</h4>
      <div className="pill-image">{pillImage}</div>
      <p>
        <span className="bodybold">Pill form:</span>
        {pillform}
      </p>
      {isVegan && <p className="icon icon-vegan">Vegan</p>}
      <p className="icon icon-nocolors">No artificial colors</p>
      <p className="icon icon-gmofree">GMO free</p>
      <p className="icon icon-glutenfree">Gluten free</p>
      <hr />
      <Header as="h4">
        {i18n.t("PillPacks.PillPacksPrescriptionDetail.ingredients.title")}
      </Header>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {pillIngredients.map(({ name, dosage, unit }) => (
          <li key={name}>{`${dosage} ${unit} ${name}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default PillPackIngredients;
