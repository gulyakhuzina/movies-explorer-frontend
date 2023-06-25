import React from 'react';
import "./AboutProject.css"

function AboutProject(props) {
  return (
    <section className="about wrapper" id="aboutProject">
      <h2 className="about__title">О проекте</h2>
      <div className="about__description">
        <div className="about__description-column">
          <h3 className="about__description-title">Дипломный проект включал 5 этапов</h3>
          <p className="about__description-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about__description-column">
          <h3 className="about__description-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__description-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about__chart">
        <h3 className="about__chart-box about__chart-box_one">1 неделя</h3>
        <h3 className="about__chart-box about__chart-box_four">4 недели</h3>
        <p className="about__chart-box_bottom about__chart-box">Back-end</p>
        <p className="about__chart-box_bottom about__chart-box">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;