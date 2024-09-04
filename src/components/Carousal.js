import React from 'react';

export default function Carousal() {
  return (
    <div style={{ margin: '20px' }}>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ maxWidth: '800px', margin: 'auto' }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/1600x900/?burger"
              className="d-block w-100"
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/1600x900/?barbeque"
              className="d-block w-100"
              alt="Barbeque"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/1600x900/?fries"
              className="d-block w-100"
              alt="Fries"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
