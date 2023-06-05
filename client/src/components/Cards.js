import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Generate Text and Image for Your Cretive Idea</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/content.jpg'
              text='Generate Text Content for Your Cretive Requirement'
              path='/textify'
            />
            <CardItem
              src='images/images.jpg'
              text='Generate Image for Your Requirement and Idea'
              path='/imaginex'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
