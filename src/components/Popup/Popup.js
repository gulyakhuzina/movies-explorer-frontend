import React from 'react';
import "./Popup.css"

function Popup(props) {
  function handleOnClick() {
    props.onClose();
  }

  return (
    <div className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className={`popup__container-${props.name}`}>
        <h3 className={`popup__title-${props.name}`}>{props.title}</h3>
        <button className="popup__close-button" onClick={handleOnClick} type="button"></button>
      </div>
    </div>
  )
}

export default Popup;