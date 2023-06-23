import React from 'react';
import "./AboutMe.css"
import photoStudent from '../../images/photo-student.png';

function AboutMe(props) {
  return (
    <section className="student">
      <h2 className="student__title">Студент</h2>
      <div className="student__description">
        <div>
          <h3 className="student__name">Виталий</h3>
          <p className="student__info">Фронтенд-разработчик, 30 лет</p>
          <p className="student__about">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <p className="student__github">Github</p>
        </div>
        <img className="student__photo" src={photoStudent} alt="Фотография студента"></img>
      </div>
    </section>
  );
}

export default AboutMe;