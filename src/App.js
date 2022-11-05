import React, { useState } from "react";
import * as markerjs2 from "markerjs2";
import { useRef } from "react";
import Magnifier from "react-magnifier";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import c1 from "./c1.jpg";
const App = () => {
  const imgRef = useRef(null);
  const [options, setOptions] = useState("none");
  function showMarkerArea(target) {
    const markerArea = new markerjs2.MarkerArea(target.current);
    // markerArea.render((event) => (target.current.src = event.dataUrl));
    markerArea.addEventListener('render', event => {
      if (imgRef.current) {
        imgRef.current.src = event.dataUrl;
        c1 = event.dataUrl;
      }
    });
    markerArea.show();
  }
  const handleMarker = () => {
    setOptions("markers");
    showMarkerArea(imgRef);
  };
  return (
    <div className="vh-100">
      <div>
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#124E78"}}>
          <h3 style={{ color: "white",marginLeft:"1em" }}>Image Viewer Utils</h3>
        </nav>
      </div>

      <div className=" d-flex justify-content-around mt-1 bg-dark p-3">
        <button className="btn btn-danger" onClick={()=>setOptions('magnifier')}>Magnifier</button>
        <button className="btn btn-info" onClick={()=>setOptions('zoom')}>Zoom</button>
        <button className="btn btn-info" onClick={handleMarker}>Markers</button>
        <button className="btn btn-danger" onClick={()=>window.location.reload()}>Reset</button>
      </div>

      <div className="mt-5 p-2" style={{marginLeft:"22rem"}}>
        {options === "none" ? (
          <div>
            <img src={c1} alt="img" style={{ width:900,height:500 }} />
          </div>
        ) : options === "magnifier" ? (
          <Magnifier
            src={c1}
            width={900}
            height={500}
            mgWidth={200}
            mgHeight={200}
            mgShape="square"
            mgShowOverflow={false}
            mgBorderWidth={2}
            mgBorderColor="black"
            mgBorderRadius={5}
            zoomFactor={2.5}
          />
        ) : options === "zoom" ? (
          <TransformWrapper initialScale={1}>
            {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
              <React.Fragment>
                <TransformComponent>
                  <img
                    alt="img"
                    src={c1}
                    style={{ width: 900, height: 500 }}
                  />
                </TransformComponent>
                <div className="d-flex justify-content-around" style={{ position: "absolute" }}>
                  <button className="btn btn-success" onClick={() => zoomIn()}>+</button>
                  <button className="btn btn-info" onClick={() => zoomOut()}>-</button>
                  <button className="btn btn-primary" onClick={() => centerView()}>centre</button>
                  <button className="btn btn-danger" onClick={() => resetTransform()}>reset</button>
                </div>
              </React.Fragment>
            )}
          </TransformWrapper>
        ) : options === "markers" ? (
          <img
            style={{ width: 900, height: 500 }}
            id="sampleImage"
            ref={imgRef}
            src={c1}
            alt="sample"
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;
