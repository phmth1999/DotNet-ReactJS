import React, { Component } from 'react';
import {  Divider } from 'antd';
import { DropboxCircleFilled,CheckCircleTwoTone,ShoppingCartOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
class CustomerOrderInfo extends Component {
    render() {
        return (
            <div className="process-content">
            <div className="process-order">    
                <ShoppingCartOutlined style={{ fontSize:30,color:"blue", marginRight:17}}/> 
               <Progress percent={0} />
               <DropboxCircleFilled style={{ fontSize:30,color:"red", marginRight:17}}/> 
               <Progress percent={0} status="active"/>
              <CheckCircleTwoTone style={{ fontSize:30, marginLeft:14}} twoToneColor="#52c41a"/>
            </div>
            <Divider/>
            </div>
        );
    }
}

export default CustomerOrderInfo;