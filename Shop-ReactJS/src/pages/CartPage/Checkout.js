import React, { useEffect, useState } from "react";
import { Modal, Steps, Button, message, Col } from "antd";
import axios from 'axios'
import { FormLogin } from './FormLogin';
import { FormInfo } from "./FormInfo";
import context from './../../context';
import { Confirm } from './Confirm';
import { data } from 'jquery';
const { Step } = Steps;

export const Checkout = () => {
  const [visible, setVisible] = useState(false);
  const [stepCur, setStepCur] = useState(0);
 
  const showModal = () => {
    setVisible(true);
    const isLogin = JSON.parse(localStorage.getItem('isLogin'));
    if (isLogin) setStepCur(1)
  };
  const data = JSON.parse(localStorage.getItem('HOADON'))
  if (visible == false) {
    localStorage.removeItem('HOADON')
  }
  const handleCancel = () => {
    setVisible(false);
    localStorage.removeItem('HOADON')
  };
  const onBack = () => {
    setStepCur(stepCur - 1);
  };
  const onNext = () => {
    setStepCur(stepCur + 1);
  };
  const steps = [
    {
      title: "Check Login",
      content: <FormLogin/>
    },
    {
      title: "Xác nhận thông tin",
      content: <FormInfo/>
    },
    {
      title: "Xác nhận thanh toán",
      content: <Confirm/>
    },
  ];
  const onCheckout = () => {
    setVisible(false);
    console.log(data)
    const key ='add';
    message.loading({ content: 'Xác nhận thanh toán',key , style: {
     marginTop: '14vh', fontSize:"20px"
   },});
    setTimeout(() => {
        axios.post(`https://localhost:44315/api/hoadons`,data).then(res => { 
            localStorage.removeItem('CART')
            localStorage.removeItem('SUM')
            localStorage.removeItem('COUNT')
            localStorage.removeItem('HOADON')
            axios.post("https://localhost:44315/api/logs", {
              idkh: data.idkh,
              message: 'Checkout',
              ip:'1.127.134.4',
              date: Date()
            })
            message.success({ content: 'Thanh toán thành công !', key, duration: 2, style: {
                marginTop: '15vh', fontSize:"20px"
              }, });
              window.location.reload()
          })
       }, 1000);
    
   
  };
  // console.log(data)
  return (
    <div>
      <a type="primary" className="update round-black-btn" onClick={showModal}>
        Thanh toán
      </a>
      <Modal
        className="checl-out"
        title="Xác nhận thanh toán"
        visible={visible}
        onCancel={handleCancel}
        footer={false}
      >
        <Steps current={stepCur}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <hr />
        {/* start content */}
        <div className="steps-content">
            {steps[stepCur].content}
        </div>     
        <hr />
        <div
          className="steps-action"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {stepCur < steps.length - 1 && (
            <Button type="primary" onClick={() => onNext()}>
              Next
            </Button>
          )}
          {stepCur === steps.length - 1 && (
            <Button type="primary" onClick={() => onCheckout()}>
              Done
            </Button>
          )}
          {stepCur > 0 && (
            <Button style={{ margin: "0 10px" }} onClick={() => onBack()}>
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};
