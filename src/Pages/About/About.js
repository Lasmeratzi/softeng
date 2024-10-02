import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About ClubSphere</h1>
      <p className="about-text">
        Welcome to ClubSphere, the official platform for managing clubs, events, and student activities at 
        La Consolacion College Bacolod (LCCB). Established in 1919 by the Augustinian Sisters from Spain, 
        under the leadership of Mo. Rita Barcelo, OSA and Mo. Consuelo, OSA, LCCB has a rich history 
        deeply connected to the Catholic Church.
      </p>
      <p className="about-text">
        The first school building was located beside the historic San Sebastian Cathedral. When Bacolod 
        became a diocese, the school was transferred to the Gonzaga property, which remains the campus' 
        home to this day. This transition allowed LCCB to expand and develop its facilities, fostering 
        a vibrant educational community.
      </p>
      <p className="about-text">
        Over the decades, La Consolacion College Bacolod has continued to shape the minds and futures of 
        its students, contributing to the rich cultural and educational landscape of Bacolod City, the 
        capital of Negros Occidental, Philippines. Today, LCCB stands as a beacon of learning, 
        nurturing students to become leaders in their respective fields.
      </p>
      <p className="about-text">
        Through platforms like ClubSphere, we aim to support this legacy by encouraging student involvement 
        in extracurricular activities and enriching their educational experience. Explore the clubs, 
        participate in upcoming events, and join us in continuing the tradition of excellence that began 
        more than a century ago.
      </p>
    </div>
  );
}

export default About;
