import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ReturnIcon from '../../components/svg/ReturnIcon';
import LabeledInput from '../../components/utils/LabeledInput';
import NavPagination from '../../components/NavPagination';
import AppealLine from '../../components/AppealLine';

const Callback = () => {
  const [cbSection, setCbSection] = useState(1);
  const isSelected = (v) => (v === cbSection ? 'btn-2 active h-100 p-3 p-sm-4' : 'btn-2 h-100 p-3 p-sm-4')

  return (
    <section className='sec-callback mb-3 mb-sm-5'>
      <div className="d-flex align-items-center mb-4 mb-lg-5">
        <Link to='/account' className='d-flex d-lg-none return-icon me-2 me-sm-4'>
          <ReturnIcon/>
        </Link>
        <h1 className='h2 mb-0'>Обратная связь</h1>
      </div>
      
      <ul className='list-unstyled d-flex justify-content-start mb-4 mb-sm-5'>
        <li>
          <button 
          type='button' 
          className={isSelected(1)}
          onClick={()=>setCbSection(1)}
          >Мои обращения</button>
        </li>
        <li className='ms-3 ms-xxl-5'>
          <button 
          type='button' 
          className={isSelected(2)}
          onClick={()=>setCbSection(2)}
          >Новое обращение</button>
        </li>
      </ul>

      {
        (cbSection === 1)
        ? <div className="list-wrapping mb-4 mb-sm-5">
          <div className="list-wrapping-top">
            <ul className="line-appeal">
              <li className="subject">Тема</li>
              <li className="id">ID</li>
              <li className="status">Статус</li>
              <li className="date">Дата</li>
              <li className="btns"></li>
            </ul>
          </div>
          <div className="list-wrapping-main">
            <ul className='row row-cols-1 row-cols-md-2 row-cols-xl-1 g-3'>
              <li>
                <AppealLine id={'15296'}/>
              </li>
              <li>
                <AppealLine id={'15296'}/>
              </li>
              <li>
                <AppealLine id={'15296'}/>
              </li>
              <li>
                <AppealLine id={'15296'}/>
              </li>
            </ul>
          </div>
          <div className="list-wrapping-bottom">
            <NavPagination/>
          </div>
        </div>
        : <div className="row">
          <div className="col-xxl-9">
            <div className="box">
              <form action="">
                <LabeledInput 
                  className="mb-5"
                  type={"select"} 
                  label={"Игра"} 
                  options={[{value:1, text: 'World of Warcraft'}, {value:2, text: 'World of Warcraft'}, {value:3, text: 'World of Warcraft'}]}
                />
                <LabeledInput 
                  type={"textarea"} 
                  label={"Обращение"} 
                  placeholder={'Предоставьте как можно более подробную информацию, приложите необходимые скриншоты.'}
                  rows={4}
                />
                <button type='submit' className='btn-1 mt-5'>Отправить</button>
              </form>
            </div>
          </div>
        </div>
      }
    </section>
  );
};

export default Callback;