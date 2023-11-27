import React from 'react';
import moment from "moment";

const Operation = (props) => {
  const date = moment(props.date).format("DD MMMM YYYY kk:mm");
  const type = props.type;
  const id = props.id;
  const status = props.status;
  const sum = props.sum;
  return (
    <div className={"operation-line " + props.className}>
      <div className="date">
        <span>{date}</span>
      </div>
      <div className="id"><span className='d-xl-none'>ID:</span>{id}</div>
      <div className="type">{type}</div>
      <div className="stat">
        <span className="blue">{status}</span>
      </div>
      <div className="sum">{sum}</div>
    </div>
  );
};

export default Operation;