import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/card';
import Carousal from '../components/Carousal';

export default function Home() {
  const [food_rest, setFoodcat] = useState([]);
  const [food_cat, setFooditem] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data && data.length === 2) {
        const [loadedFoodRest, loadedFoodCat] = data;
        setFoodcat(loadedFoodRest);
        setFooditem(loadedFoodCat);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousal />
      <div className='container'>
        <input
          type='text'
          placeholder='Search...'
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {food_rest && food_rest.length > 0 &&
          food_rest
            .filter((data) =>
              data.CategoryName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((data) => (
              <div className='row mb-3' key={data._id}>
                <div className='fs-3 m-3'>
                  {data.CategoryName}
                  <hr />
                  <div className='row'>
                    {food_cat && food_cat.length > 0 &&
                      food_cat
                        .filter((item) => item.CategoryName === data.CategoryName)
                        .map((filterItems) => (
                          <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                            <Card
                              foodname={filterItems.name}
                              Fooditem={filterItems}
                              options={filterItems.options[0]}
                            />
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            ))}
        {(!food_rest || food_rest.length === 0) && <div>No data available</div>}
      </div>
      <Footer />
    </div>
  );
}
