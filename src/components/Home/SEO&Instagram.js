import React from "react";
// import BuraqLogo from "../../assets/buraqlog.png";
import BuraqLogo from '../../assets/watermark_panel.svg'
import { useNavigate } from 'react-router-dom';


const checkItems = [
  "Trusted Since 2002",
  "Premium Brand Portfolio",
  "Professional & Retail Supply",
  "Reliable Delivery Network",
];

const WhoWeAre = () => {
  const navigate = useNavigate()
  return (
    <>
      <style>{`
        .who-we-are-section {
          background: linear-gradient(135deg, #dce8f5 0%, #eaf2fb 50%, #d6e6f5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .who-we-are-card {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(30, 70, 130, 0.10);
          padding: 48px 52px;
          max-width: 1540px;
          width: 100%;
          display: grid;
          grid-template-columns: 2fr 1.2fr 280px;
          gap: 0;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

      

        .who-we-are-left h2 {
          font-weight: 500;
          font-size: clamp(28px, 2.8vw, 32px);
          color: #1a1a2e;
          margin: 0 0 20px 0;
          letter-spacing: -0.5px;
        }

        .who-we-are-left p {
          font-size: clamp(13px, 1.3vw, 14.5px);
          line-height: 1.78;
          color: #4a4a5a;
          margin: 0 0 14px 0;
        }

        .who-we-are-left p:last-child {
          margin: 0;
        }

        .who-we-are-left strong,
        .who-we-are-left .font-semibold {
          color: #1a1a2e;
          font-weight: 700;
        }

        /* Center column */
        .who-we-are-center {
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .check-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .check-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: transparent;
          background: linear-gradient(135deg, #efefef 0%, #e2e2e2 100%);
        }

        .check-label {
          font-weight: 600;
          font-size: clamp(13px, 1.3vw, 14.5px);
          color: #1a1a2e;
        }

        .shop-btn {
          background: #1d3a6e;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 13px 36px;
          font-size: clamp(13px, 1.5vw, 16.5px)
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: background 0.2s, transform 0.15s;
          margin-top: 6px;
          align-self: flex-start;
        }

        .shop-btn:hover {
          background: #16306b;
          transform: translateY(-1px);
        }

        /* Right column — logo watermark */
        .who-we-are-right {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          
        }

        
        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .who-we-are-card {
            grid-template-columns: 1.6fr 1fr 200px;
          }
          .who-we-are-right img {
            width: 190px;
            height: 190px;
          }
        }

        @media (max-width: 768px) {
          .who-we-are-card {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .who-we-are-left {
            grid-column: 1 / 3;
            grid-row: 1;
            border-right: none;
            border-bottom: 1px solid #e8eef6;
            padding-right: 0;
            padding-bottom: 28px;
          }
          .who-we-are-center {
            grid-column: 1 / 2;
            grid-row: 2;
            padding: 28px 16px 0 0;
          }
          .who-we-are-right {
            grid-column: 2 / 3;
            grid-row: 2;
            padding: 28px 0 0 0;
            justify-content: flex-end;
          }
          .who-we-are-right img {
            width: 150px;
            height: 150px;
          }
        }

        @media (max-width: 480px) {
          .who-we-are-card {
            grid-template-columns: 1fr;
            padding: 28px 24px;
          }
          .who-we-are-left {
            grid-column: 1;
            grid-row: 1;
            border-bottom: 1px solid #e8eef6;
            padding-bottom: 24px;
          }
          .who-we-are-center {
            grid-column: 1;
            grid-row: 2;
            padding: 24px 0 0 0;
          }
          .who-we-are-right {
            grid-column: 1;
            grid-row: 3;
            padding: 20px 0 0 0;
            justify-content: center;
          }
          .who-we-are-right img {
            width: 130px;
            height: 130px;
          
          }
        }
      `}</style>

      <section className="who-we-are-section">
        <div className="who-we-are-card">

          {/* LEFT — Title + Description */}
          <div className="who-we-are-left poppins">
            <h2>Who We Are?</h2>
            <p>
              Buraq Star Trading Co. LLC is a UAE-based supplier and brand house specializing in{" "}
              <span style={{fontWeight: 600}}>building materials, electrical, sanitary, hardware, and project essentials</span>.
              Since 2002, we have earned the trust of contractors, retailers, maintenance teams,
              and homeowners by consistently delivering{" "}
              <span style={{fontWeight: 600}}>quality, reliability, and value.</span>
            </p>
            <p>
              We design, develop, and distribute premium brands including{" "}
              <span style={{fontWeight: 600}}>NOVEX, ZILCO, BURAQ, and CAVIL</span>, supported by a strong international
              supply chain and a growing eCommerce platform that makes professional-grade products
              available anytime, anywhere.
            </p>
          </div>

          {/* CENTER — Checklist + Button */}
          <div className="who-we-are-center">
            {checkItems.map((item, i) => (
              <div className="check-item" key={i}>
                <div className="check-circle">
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                    <path
                      d="M1.5 5L4.83333 8.5L11.5 1.5"
                      stroke="#2452a4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="check-label poppins">{item}</span>
              </div>
            ))}
            <button onClick={() => navigate("/category")} className="shop-btn poppins text-md">Shop Now</button>
          </div>

          {/* RIGHT — Logo watermark */}
          <div className="who-we-are-right">
            <img src={BuraqLogo} alt="" aria-hidden="true" />
          </div>

        </div>
      </section>
    </>
  );
};

export default WhoWeAre;