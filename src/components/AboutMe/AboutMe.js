import React from 'react';
import "./AboutMe.css"
import photoStudent from '../../images/photo_student.png';

function AboutMe(props) {
  return (
    <section className="student wrapper">
      <h2 className="student__title">Студент</h2>
      <div className="student__description">
        <div>
          <h3 className="student__name">Гульнара</h3>
          <p className="student__info">Фронтенд-разработчик, 29 лет</p>
          <p className="student__about">Я родилась в Набережных Челнах, но живу в городе Пермь. Я замужем и у меня есть сын, ему 2 года.
          Работала в региональном банке в IT-управлении ведущим инженером-программистом, позже ушла в декретный отпуск,
          в котором и решила пройти курс по веб-разработке. В свободное от работы время увлекалась разработкой сайтов,
          но не хватало базовых знаний. Думаю, что после декретного отпуска активно займусь поиском работы именно в этой сфере.</p>
          <a href="https://github.com/gulyakhuzina" target="_blank" className="student__github" rel="noopener noreferrer">Github</a>
        </div>
        <img className="student__photo" src={photoStudent} alt="Фотография студента"></img>
      </div>
    </section>
  );
}

export default AboutMe;