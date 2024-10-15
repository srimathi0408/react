import React from 'react';

function StatuesAndSculptures() {
  return (
    <div className="product-page">
      <h2 className="page-title">Statues and Sculptures</h2>
      <div className="product-grid">
        <div className="product-card">
          <img src="https://static.wixstatic.com/media/83306c_fbdceef001e74d028a34ca68bf184a8c~mv2.png/v1/fill/w_480,h_604,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/83306c_fbdceef001e74d028a34ca68bf184a8c~mv2.png" alt="Statue 1" className="product-image" />
          <h3 className="product-name">DRAGON STATUE </h3>
        </div>
        <div className="product-card">
          <img src="https://img3.exportersindia.com/product_images/bc-full/2022/3/9947187/handmade-marble-ganesh-statue-1646894000-6237551.jpeg" alt="Statue 2" className="product-image" />
          <h3 className="product-name">VINAYAGAR STATUE</h3>
        </div>
        {/* Add more product cards as needed */}
      </div>
    </div>
  );
}

export default StatuesAndSculptures;
