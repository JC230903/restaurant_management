import React, { useRef, useEffect, useState } from "react";
import { useDispatchCart, useCart } from '../components/Contextreducer';

export default function Card(props) {
  let options = props.options;
  let data = useCart();
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(""); // You might want to initialize the size state accordingly

  const handleAddToCart = async () => {
    let food = data.find((item) => item.id === props.Fooditem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.Fooditem._id,
          price: finalPrice,
          Qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.Fooditem._id,
          name: props.Fooditem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
    }

    await dispatch({
      type: "ADD",
      id: props.Fooditem._id,
      name: props.Fooditem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  let finalPrice = qty * parseInt(options[size] || 0);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.Fooditem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "120px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.Fooditem.name}</h5>
            <p className="card-text">{props.Fooditem.description}</p>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="m-2 h-100 bg-success rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              <div className="d-inline h-100 fs-5"> ₹​ {finalPrice}/-</div>
            </div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
