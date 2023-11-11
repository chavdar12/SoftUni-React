import "./loading.scss";

interface LoadingProps {
  size?: string;
  height?: string;
  padding?: string;
  margin?: string;
  classes?: string;
}

/**
 * Loading
 *
 * Loading component
 */
export function Loading({
  size = "lg",
  height = "",
  padding = "10rem",
  margin = "0 auto",
  classes,
}: LoadingProps) {
  const loadingContainerStyling = {
    height,
    padding,
    margin,
  };

  return (
    <div
      className={["loading", `loading--${size}`, classes].join(" ")}
      style={loadingContainerStyling}
    >
      Loading
    </div>
  );
}

export default Loading;
