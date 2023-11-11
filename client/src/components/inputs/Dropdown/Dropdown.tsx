import { useState } from "react";
import "./dropdown.scss";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown__toggle">
        Dropdown Button
      </button>
      {isOpen && (
        <div className="dropdown__menu">
          <a href="#" className="dropdown__menu__item">
            Item 1
          </a>
        </div>
      )}
    </div>
  );
}
export default Dropdown;
