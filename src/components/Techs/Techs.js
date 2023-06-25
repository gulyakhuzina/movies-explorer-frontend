import React from 'react';
import "./Techs.css"

function Techs(props) {
  return (
    <section className="tech wrapper">
      <h2 className="tech__title">Технологии</h2>
      <h3 className="tech__subtitle">7 технологий</h3>
      <p className="tech__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="tech__technologies">
        <li className="tech__technology">HTML</li>
        <li className="tech__technology">CSS</li>
        <li className="tech__technology">JS</li>
        <li className="tech__technology">React</li>
        <li className="tech__technology">Git</li>
        <li className="tech__technology">Express.js</li>
        <li className="tech__technology">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;