import {useState} from 'react';
import Eye from '../svg/Eye';
import CloseEye from '../svg/CloseEye';

export default function InputPassword(props) {
  const [visible, setVisibility] = useState(props.visible);

  return (
    <div className={"password " + props.className}>
      <input 
      type={(visible) ? 'text' : 'password'} 
      name={props.name} 
      placeholder={props.placeholder} 
      autoComplete="current-password" 
      minLength="8" 
      maxLength="20" 
      size="8" 
      required 
      value={props.value} 
      onChange={props.onChange}/>
      <button type="button" onClick={() => setVisibility(!visible)}>
        {
          (visible) 
          ? <Eye/>
          : <CloseEye/>
        }
      </button>
    </div>
  )
}