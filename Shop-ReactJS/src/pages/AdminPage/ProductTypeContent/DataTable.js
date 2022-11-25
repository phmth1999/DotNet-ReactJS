import React from 'react'
import {Button} from 'antd';
import { DeleteOutlined,EditOutlined,EyeOutlined} from "@ant-design/icons";
export const DataTable = ({data,onEdit,onView}) => {
    return (
        <div> 
            <table className="table  table-bordered table-hover" >
                <thead style={{textAlign:'center'}}>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th> 
                        <th>Mô tả</th> 
                        <th>Số lượng sản phẩm</th>
                        <th>Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index)=>(
                        <tr key={index}>
                            <td> {index+1} </td>
                            <td> {item.tenth} </td>
                            <td style={{width:110,textAlign:'center'}}> <img src={item.logo} alt="" style={{width:100,height:110}}/> </td>
                            <td> {item.mota}</td>
                            <td> {item.sanphams.length}</td>
                            <td style={{width:100,textAlign:'center'}}> 
                            <a onClick={() =>onView(item)} ><EyeOutlined  style={{color:'blue', fontSize: 20, padding:3}}/></a>
                            <a onClick={() =>onEdit(item)}><EditOutlined style={{color:'yellow', fontSize: 20,padding:3}}/></a>
                            {/* <a onClick={() =>onDelete(item)} ><DeleteOutlined style={{color:'red', fontSize: 20,padding:3}}/></a> */}
                            
                            </td>

                        </tr>
                    )
                    
                    
                    )}
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}
