import React from "react";

export default React.memo(function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg pt-1 mt-0 new_darkblue_bg">
        <div className="container-fluid px-lg-5 py-lg-0 text-white">
          <p className="px-lg-5">PARTNERS: NIMET | NEMA | NOA</p>
        </div>
      </nav>
    </div>
  );
});
