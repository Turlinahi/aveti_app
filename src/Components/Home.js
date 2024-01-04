import React from 'react';

const Home = () => {
  const pdfUrl1 = 'https://static1.squarespace.com/static/54905286e4b050812345644c/t/5d002601b6c7b500014685a0/1560290818642/4th_Word_Problems_AddSub.pdf';
  const thumbnailUrl1 = 'https://images.squarespace-cdn.com/content/v1/54905286e4b050812345644c/1588434307144-6FOKKSVZWCRVH2BHCL4R/Snip20200502_2.png';

  const pdfUrl2 = 'https://ec-prod-site-cache.s3.amazonaws.com/static/saintantoninus.org/documents/2014/6/Progress32in32Mathematics32Grade32532textbook.pdf';
  const thumbnailUrl2 = 'https://books.kolbe.org/cdn/shop/products/5205_Sadlier_5_Cover_540x.jpg?v=1651085214';

  
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>

      {/* Book 1 */}
      <a href={pdfUrl1} target="_blank" rel="noopener noreferrer">
        <img src={thumbnailUrl1} alt="Addition and Subtraction" className="thumbnail-img" />
      </a>

      {/* Book 2 */}
      <a href={pdfUrl2} target="_blank" rel="noopener noreferrer">
        <img src={thumbnailUrl2} alt="Mathematics Grade 5" className="thumbnail-img" />
      </a>
    </div>
  );
};

export default Home;
