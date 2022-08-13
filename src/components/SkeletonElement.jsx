import styles from "../styles/SkeletonElement.module.css";

export const SkeletonElement = ({ type, width, height, mb, mw, mh }) => {
  const marginB = mb * 12;
  const classes = `${styles.skeleton} ${styles[type]}`;
  const widthElement = width || "100%";
  const heightElement = height || (type === "rectangular" ? 25 : 15);
  const marginBottomElement = mb === 0 ? 0 : marginB || 12;

  return (
    <div
      className={classes}
      style={{
        width: widthElement,
        height: heightElement,
        marginBottom: marginBottomElement
      }}
    ></div>
  );
};
