import React, { useState } from 'react';
import moment from "moment";
import WarningIcon from '../svg/WarningIcon';

import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { getImageURL } from '../../helpers/all';
import { Modal } from 'react-bootstrap';


const Message = ({ my, userId, general, createdAt, media, text, name, admin, user, view, type, status }) => {
  const image = getImageURL({ path: user, type: "user" })
  const [showShare, setShowShare] = useState(false);
  const time = createdAt
    ? moment(createdAt).format("DD.MM.YYYY kk:mm")
    : moment().format("DD.MM.YYYY kk:mm");
  return (


    <>
      {my ? (
        <div className="chat-window-message-mine">
          <div className='text'>
            <div className='gray fs-08 d-flex align-items-center mb-2'>
              {type == "system" &&
                <h6 className="name ms-3 me-2">Системное сообщение</h6>

              }
              <time className='me-2'>
                {time}
              </time>
              {view ? (
                <IoCheckmarkDoneOutline className="text-success ms-1" size={15} />
              ) : (
                <IoCheckmarkOutline className="ms-1" size={15} />
              )}

            </div>
            {status ?
              <div className={type == "system" ? "bubble-system" : "bubble"}>
                {type == "system" &&
                  <img src="/imgs/logo-mess.svg" className='bubble-system-img' />
                }
                {text && <p>{text}</p>}
                {media &&
                  <img src={getImageURL({ path: media, size: "", type: "message" })} onClick={setShowShare} className="bubble-img" />
                }
              </div>
              :
              <i className='bubble-ban'>Сообщение заблокировано администрацией Rush to Play</i>
            }
          </div>
          {type == "system" ?
            <img src="/imgs/system.png" alt={name} />
            :
            <img src={image} alt={name} />
          }
        </div>

      ) : (
        admin ? (
          <div className="chat-window-message">
            <img src={image} alt={name} />
            <div className='text'>
              <div className='gray fs-08 d-flex align-items-center mb-2'>
                <h6 className="me-2 fs-12">ADMIN </h6>
                <time className='me-2'> {time}</time>

              </div>
              <div className="bubble-admin">
                {text && <p>{text}</p>}
                {media &&
                  <img src={getImageURL({ path: media, size: "", type: "message" })} onClick={setShowShare} className="bubble-img" />
                }
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-window-message">
            <div className="chat-box-user">
              <Link to={"/profile/" + userId}>
                {type == "system" ?
                  <img src="/imgs/system.png" alt={name} />
                  :
                  <img src={image} alt={name} />
                }
              </Link>

            </div>
            <div className='text'>
              <div className='gray fs-08 d-flex align-items-center mb-2'>
                {general == "general" &&
                  <Link to={"/profile/" + userId}>
                    <h6 className="name me-2">{user?.nickname}</h6>
                  </Link>

                }
                {type == "system" &&
                  <h6 className="name me-2">Системное сообщение</h6>

                }
                <time className='me-2'>{time}</time>
              </div>
              {status ?
                <div className={type == "system" ? "bubble-system" : "bubble"}>
                  {type == "system" &&
                    <img src="/imgs/logo-mess.svg" onClick={setShowShare} className='bubble-system-img' />
                  }
                  {text && <p>{text}</p>}
                  {media &&
                    <img src={getImageURL({ path: media, size: "", type: "message" })} onClick={setShowShare} className="bubble-img" />
                  }
                </div>
                :
                <i className='bubble-ban'>Сообщение заблокировано администрацией Rush to Play</i>
              }
            </div>
          </div>
        )
      )}
      <Modal show={showShare} onHide={setShowShare} centered size="xl" className='modal'>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className='modal-dialog'>
          <img src={getImageURL({ path: media, size: "", type: "message" })} onClick={setShowShare} className="modal-img" />
        </Modal.Body>
      </Modal>
    </>
  )
};
export default Message;