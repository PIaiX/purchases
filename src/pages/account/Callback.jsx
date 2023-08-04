import React, {useState} from 'react';
import Input from '../../components/utils/Input';
import NavPagination from '../../components/NavPagination';
import AppealLine from '../../components/AppealLine';
import InputFileImg from '../../components/utils/InputFileImg';
import ReturnTitle from '../../components/utils/ReturnTitle';

const Callback = () => {
  const [cbSection, setCbSection] = useState(1);
  const isSelected = (v) => (v === cbSection ? 'btn-2 active h-100 p-3 p-sm-4' : 'btn-2 h-100 p-3 p-sm-4')

  return (
    <section className='sec-callback mb-3 mb-sm-5'>
      <ReturnTitle link={'/account'} title={'Обратная связь'}/>
      
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
          <div className="list-wrapping-main p-sm-3">
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
          <div className="col-xxl-10">
            <div className="box">
              <form action="">
                <div className="row g-4 g-md-5">
                  <div className="col-md-6">
                    <Input 
                      type={"select"} 
                      label={"Тема"} 
                      options={[{value:1, text: 'Тема 1'}, {value:2, text: 'Тема 2'}, {value:3, text: 'Тема 3'}]}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input 
                      type={"select"} 
                      label={"Подтема"} 
                      options={[{value:1, text: 'Подтема 1'}, {value:2, text: 'Подтема 2'}, {value:3, text: 'Подтема 3'}]}
                    />
                  </div>
                  <div className="col-md-12">
                    <Input 
                      className="mb-3"
                      type={"textarea"} 
                      label={"Обращение"} 
                      placeholder={'Предоставьте как можно более подробную информацию, приложите необходимые скриншоты.'}
                      rows={4}
                    />
                    <InputFileImg/>
                  </div>
                </div>
                <button type='submit' className='btn-1 mt-4 mt-md-5'>Отправить</button>
              </form>
            </div>
          </div>
        </div>
      }
    </section>
  );
};

export default Callback;