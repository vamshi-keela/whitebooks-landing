import React from 'react';

const LOGOS: string[] = [
  'P&G', 'IBM', 'Hindustan Unilever', 'KPMG', 'Coca-Cola', 'Razorpay',
  'SBI', 'Aditya Birla', 'Accenture', 'Philips', 'Yamaha', 'TVS',
  'PepsiCo', 'Pharmeasy', 'Cars24', 'KIA', 'INOX', 'Grant Thornton',
  'EaseMyTrip', 'Pigeon', 'Landmark', 'NCC', 'Odoo', 'Protiviti',
  'IIT Hyderabad', 'NHDC', 'OPGC', 'WheelsEye', 'Jyothy Labs', 'Poorvika',
];

export function LogoWall() {
  return (
    <div className="logo-wall">
      {LOGOS.map((l, i) => (
        <div className="logo-wall-cell" key={i}>{l}</div>
      ))}
    </div>
  );
}

export default LogoWall;
