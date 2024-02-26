import React from 'react';
import moment from "moment";
import WarningIcon from '../svg/WarningIcon';

import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { getImageURL } from '../../helpers/all';


const Message = ({ my, userId, general, createdAt, media, text, name, admin, user, view, type, status }) => {
  const image = getImageURL({ path: user, type: "user" })
  const time = createdAt
    ? moment(createdAt).format("DD.MM.YYYY kk:mm")
    : moment().format("DD.MM.YYYY kk:mm");
  return my ? (
    <div className="chat-window-message-mine">
      <div className='text'>
        <div className='gray fs-08 d-flex align-items-center mb-2'>
          {type == "system" &&
            <h6 className="name ms-3">Системное сообщение</h6>

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
        <div className={type == "system" || !status ? "bubble colored" : "bubble"}>
          {status ?
            <>
              {text && <p>{text}</p>}
              {media &&
                <Link to={getImageURL({ path: media, size: "", type: "message" })}>
                  <img src={getImageURL({ path: media, size: "", type: "message" })} className="bubble-img" />
                </Link>
              }
            </>
            :
            <p>Сообщение заблокировано администрацией</p>
          }
        </div>
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
          <div className="bubble colored">
            {text && <p>{text}</p>}
            {media &&
              <Link to={getImageURL({ path: media, size: "", type: "message" })} >
                <img src={getImageURL({ path: media, size: "", type: "message" })} className="bubble-img" />
              </Link>
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
                <h6 className="name">{user.nickname}</h6>
              </Link>

            }
            {type == "system" &&
              <h6 className="name">Системное сообщение</h6>

            }
            <time className='me-2'>{time}</time>
          </div>
          <div className={type == "system" || !status ? "bubble colored" : "bubble"}>
            {status ?
              <>
                {text && <p>{text}</p>}
                {media &&
                  <Link to={getImageURL({ path: media, size: "", type: "message" })}>
                    <img src={getImageURL({ path: media, size: "", type: "message" })} className="bubble-img" />
                  </Link>
                }
              </>
              :
              <p>Сообщение заблокировано администрацией</p>
            }
          </div>
        </div>
      </div>
    )
  )
};
export default Message;