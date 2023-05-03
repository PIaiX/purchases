import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { FiArrowLeftCircle } from "react-icons/fi";
import LabeledInput from '../../components/utils/LabeledInput';
import NavPagination from '../../components/NavPagination';

const Callback = () => {
  const [cbSection, setCbSection] = useState(1);
  return (
    <section className='sec-finance mb-3 mb-sm-5'>
      <div className="d-flex align-items-center mb-4 mb-lg-5">
        <Link to='/account' className='d-flex d-lg-none  fs-20 blue me-4'><FiArrowLeftCircle/></Link>
        <h1 className='h2 mb-0'>Обратная связь</h1>
      </div>
      
      <ul className='list-unstyled d-flex justify-content-between justify-content-sm-start mb-5'>
        <li className='me-1 me-sm-3 me-xxl-5'>
          <button 
          type='button' 
          className={(cbSection === 1) ? 'btn-2 active h-100 px-4' : 'btn-2 h-100 p-4'}
          onClick={()=>setCbSection(1)}
          >Мои обращения</button>
        </li>
        <li className='me-1 me-sm-3 me-xxl-5'>
          <button 
          type='button' 
          className={(cbSection === 2) ? 'btn-2 active h-100 p-4' : 'btn-2 h-100 p-4'}
          onClick={()=>setCbSection(1)}
          >Новое обращение</button>
        </li>
      </ul>

      <div className="list-wrapping mb-4 mb-sm-5">
        <div className="list-wrapping-top">
          
        </div>
        <div className="list-wrapping-main">
            <ul className='row row-cols-1 row-cols-md-2 row-cols-xl-1 g-3'>
              
            </ul>
          </div>
          <div className="list-wrapping-bottom">
            <NavPagination/>
          </div>
      </div>

      {/* <div className="row">
        <div className="col-9">
          <form action="">
            <LabeledInput 
              type={"select"} 
              label={"Игра"} 
              options={[{value:1, text: 'World of Warcraft'}, {value:2, text: 'World of Warcraft'}, {value:3, text: 'World of Warcraft'}]}
            />
          </form>
        </div>
      </div> */}
    </section>
  );
};

export default Callback;