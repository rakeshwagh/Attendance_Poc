export const LeftArrowIcon = ({ title = "", className = "" }) => {
  return (
    <i
      type="fa-11961"
      className={`cIcon cIcon-LeftArrowIcon ${className}`}
      title={title}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="currentcolor"
        viewBox="0 0 640 1024"
      >
        <path d="M448 960c-16.4 0-32.8-6.3-45.2-18.8l-384-383.9c-25-25-25-65.5 0-90.6l384-384c25-25 65.5-25 90.5 0s25 65.5 0 90.5L154.5 512l338.8 338.8c25 25 25 65.5 0 90.5C480.8 953.8 464.4 960 448 960z"></path>
      </svg>
    </i>
  );
};
