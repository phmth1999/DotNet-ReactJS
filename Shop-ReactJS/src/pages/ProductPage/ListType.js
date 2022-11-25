import React from "react";
import {Button} from "antd";
export const ListType = ({thuonghieu,GetProductByType}) => {
    const types = []
    for (let i = 0; i < thuonghieu.length; i++) {
      const logo = `${thuonghieu[i].logo}`;
      const idth = thuonghieu[i].idth;
      types.push({
        logo, idth
      });
    }

  return (
    <nav style={{height:40, marginTop:0}}>
      <ul className="pagination"  style={{ marginRight:40,marginTop:0 }}>
        {types.map((type) => (
          <li key={type.idth} className="page-item" style={{}}>
            <Button 
            className="page-link" 
            style={{height:40}}
            onClick={() => GetProductByType(type.idth)}
            >
                <img src={type.logo} style={{width:75,height:30}} alt=""/>
              {/* {number} */}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
