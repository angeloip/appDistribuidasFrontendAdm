import { SkeletonElement } from "./SkeletonElement";

/* import stylesCard from "../styles/ProductCard.module.css";
import stylesDetails from "../styles/ProductDetails.module.css"; */

export const ProductsTable = () => {
  return (
    <tr style={{ background: "#fff" }}>
      {[...Array(8)].map((x, i) => (
        <td key={i}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <SkeletonElement type="text" width={"80%"} mb={0} />
          </div>
        </td>
      ))}
    </tr>
  );
};

export const CategoriesTable = () => {
  return (
    <tr style={{ background: "#fff" }}>
      {[...Array(3)].map((x, i) => (
        <td key={i}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <SkeletonElement type="text" width={"80%"} mb={0} />
          </div>
        </td>
      ))}
    </tr>
  );
};
