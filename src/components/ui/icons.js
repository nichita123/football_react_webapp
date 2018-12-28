import React from 'react';
import { Link } from 'react-router-dom';
import TeamLogo from '../../assets/images/logos/manchester_city_logo.png';

export const CityLogo = (props) => {
  const template =  <div
                      className="img_cover"
                      style={{
                        width: props.width,
                        height: props.height,
                        background: `url(${TeamLogo}) no-repeat`
                      }}
                    />

  if(props.link){
    return (
      <Link to={props.linkTo} className="link_logo">
        {template}
      </Link>
    )
  }
  else{
    return template
  }
}