import React, { useState } from 'react';
import { Datavlan } from '../components/Datavlan';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';

const AccordionSection = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: 90vh; 
  right: 49.5rem ; 
  top:13rem;
  border-radius:10px; 
  height: 100px ; 
  width : 100px; 
`;

const Container = styled.div`
  position: absolute;
  top: 30%;
  box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
`;

const Wrap = styled.div`
   color: black;
   background-color :white ;
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 650px;
   text-align: center;
   cursor: pointer;
  h1 {
  padding: 2rem;
  font-size: 20px;
  font-weight :650;
  }
  span {
  margin-right: 1.5rem;
}
`;

const Dropdown = styled.div`
 
  color: #fff;
  width: 650px;
  font-family:Poppins;


   height: 100px;
  display: flex;
  flex-direction: column;
   justify-content: center;
   align-items: center;
   text-align: center;
   border-bottom: 1.5px solid #8773B2;
  border-top: 1.5px solid #8773B2;
  p {
  font-size: 1.2rem;
   }
`;

const Help = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = index => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <IconContext.Provider value={{ color: '#8773B2', size: '35px' }}>
      <AccordionSection>
        <Container>
          {Datavlan.map((item, index) => {
            return (
              <>
                <Wrap onClick={() => toggle(index)} key={index}>
                  <h1>{item.question}</h1>
                  <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                </Wrap>
                {clicked === index ? (
                  <Dropdown>
                    <p>{item.answer}</p>
                  </Dropdown>
                ) : null}
              </>
            );
          })}
        </Container>
      </AccordionSection>
    </IconContext.Provider>
  );
};

export default Help;