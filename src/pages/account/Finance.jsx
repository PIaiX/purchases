import React from 'react';
import {Link} from 'react-router-dom';
import { FiArrowLeftCircle } from "react-icons/fi";

const Finance = () => {
  return (
    <section className='mb-3 mb-sm-5'>
      <div className="d-flex align-items-center mb-4 mb-lg-5">
        <Link to='/account' className='d-flex d-lg-none  fs-20 blue me-4'><FiArrowLeftCircle/></Link>
        <h1 className='h2 mb-0'>Финансы</h1>
      </div>
    </section>
  );
};

export default Finance;