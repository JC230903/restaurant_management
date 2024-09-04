import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '/Users/jacobcherian/Resturant database/mernapp/src/components/card';

export default function Myorder() {
  const [orderData, setOrderData] = useState([]);

  const getUserEmail = async () => {
    try {
      // Replace this logic with your actual logic to get the user's email
      // For example, you might store the user's email in localStorage after login
      const userEmail = localStorage.getItem('userEmail') || '';

      const response = await fetch("http://localhost:5001/api/myorderData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'useremail': userEmail,
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();
      setOrderData(data.orderData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getUserEmail();
  }, []);

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='fs-3 m-3'>My Orders</div>
        {orderData &&
          orderData.order_data &&
          orderData.order_data.map((arrayData) => (
            <div key={arrayData.Order_date} className='m-auto mt-5'>
              <hr />
              <div className='row'>
                <div className='col-12 col-md-6 col-lg-3'>
                  <div className='card mt-3' style={{ width: '16rem', maxHeight: '360px' }}>
                    <img src={arrayData.img} className='card-img-top' alt='...' style={{ height: '38px' }} />
                    <div className='card-body'>
                      <h5 className='card-title'>{arrayData.name}</h5>
                      <div className='container w-100 p-0' style={{ height: '38px' }}>
                        <span className='m-1'>{arrayData.qty}</span>
                        <span className='m-1'>{arrayData.size}</span>
                        <span className='m-1'>{arrayData.Order_date}</span>
                      </div>
                      <div className='d-inline ms-2 h-100 w-20 fs-5'>
                        ₹{arrayData.price}/-
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {!orderData && <div>No data available</div>}
      </div>
      <Footer />
    </>
  );
}
