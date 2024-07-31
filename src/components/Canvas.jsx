import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import "../Styles/Canvas.css";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [details, setDetails] = useState({
    width: "",
    height: "",
    top: "",
    left: "",
    fill: "",
    radius: "",
    stroke: "",
    textBackgroundColor: ""
  });

  useEffect(() => {
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
    });

    const updateSelectedObject = (obj) => {
      setSelectedObject(obj);
      setDetails({
        width: obj.width * obj.scaleX,
        height: obj.height * obj.scaleY,
        top: obj.top,
        left: obj.left,
        fill: obj.fill,
        radius: obj.radius || "",
        stroke: obj.stroke || "",
        textBackgroundColor: obj.textBackgroundColor || ""
      });
    };

    const handleObjectClick = (e) => {
      if (e.target) {
        updateSelectedObject(e.target);
      }
    };

    fabricCanvasRef.current.on("object:selected", (e) => handleObjectClick(e));
    fabricCanvasRef.current.on("object:modified", (e) => handleObjectClick(e));
    fabricCanvasRef.current.on("mouse:down", (e) => handleObjectClick(e));

    fabricCanvasRef.current.on("selection:cleared", () => {
      setSelectedObject(null);
      setDetails({
        width: "",
        height: "",
        top: "",
        left: "",
        fill: "",
        radius: "",
        stroke: "",
        textBackgroundColor: ""
      });
    });

    return () => {
      fabricCanvasRef.current.dispose();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const updateObjectDetails = () => {
    if (selectedObject) {
      selectedObject.set({
        width: parseFloat(details.width) / selectedObject.scaleX,
        height: parseFloat(details.height) / selectedObject.scaleY,
        top: parseFloat(details.top),
        left: parseFloat(details.left),
        fill: details.fill,
        radius: details.radius || selectedObject.radius,
        stroke: details.stroke || selectedObject.stroke,
        textBackgroundColor: details.textBackgroundColor || selectedObject.textBackgroundColor
      });
      fabricCanvasRef.current.renderAll();
    }
  };

  useEffect(() => {
    updateObjectDetails();
  }, [details]);

  const AddReactangle = () => {
    const rect = new fabric.Rect({
      top: 200,
      left: 350,
      fill: "red",
      width: 100,
      height: 50,
    });

    fabricCanvasRef.current.add(rect);
  };

  const AddCircle = () => {
    const circle = new fabric.Circle({
      radius: 20,
      fill: "green",
      top: 200,
      left: 350,
    });
    fabricCanvasRef.current.add(circle);
  };

  const AddPath = () => {
    const path = new fabric.Path("M 0 0 L 300 100 L 200 300 z", {
      fill: "yellow",
      stroke: "black",
      strokeWidth: 1,
      top: 200,
      left: 350,
    });
    fabricCanvasRef.current.add(path);
  };

  const AddText = () => {
    const text = new fabric.FabricText("Hello fabric.js", {
      fill: "blue",
      fontSize: 24,
      top: 200,
      left: 350,
      textBackgroundColor: "lightgray",
    });
    fabricCanvasRef.current.add(text);
  };

  const AddImage = () => {
    var crossImg = new Image();
    crossImg.onload = function () {
      var cross = new fabric.FabricImage(crossImg, {
        left: 300,
        top: 150,
        scaleX: 1,
        scaleY: 1,
      });
      fabricCanvasRef.current.add(cross);
    };
    crossImg.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrKL3RBmogp-LQGw48bJ6KHjMgjWwmLFpcQ&s";
  };

  const ClearCanvas = () => {
    fabricCanvasRef.current.clear();
    setSelectedObject(null);
    setDetails({
      width: "",
      height: "",
      top: "",
      left: "",
      fill: "",
      radius: "",
      stroke: "",
      textBackgroundColor: ""
    });
  };

  return (
    <div className="can">
      <div className="canvasStyle">
        <canvas ref={canvasRef} />
      </div>
      <div className="sidePannel">
        <div className="buttonStyle">
          <button onClick={AddReactangle}>Add Rectangle</button>
          <button onClick={AddCircle}>Add Circle</button>
          <button onClick={AddPath}>Add Path</button>
          <button onClick={AddText}>Add Text</button>
          <button onClick={AddImage}>Add Image</button>
          <button onClick={ClearCanvas}>Clear Canvas</button>
        </div>
        {selectedObject && (
          <div className="details">
            <h3>Selected Object Details</h3>
            <label>
              Width:
              <input
                type="number"
                name="width"
                value={details.width}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                name="height"
                value={details.height}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Top:
              <input
                type="number"
                name="top"
                value={details.top}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Left:
              <input
                type="number"
                name="left"
                value={details.left}
                onChange={handleInputChange}
              />
            </label>
            {selectedObject.type === 'circle' && (
              <label>
                Radius:
                <input
                  type="number"
                  name="radius"
                  value={details.radius}
                  onChange={handleInputChange}
                />
              </label>
            )}
            {selectedObject.type === 'path' && (
              <label>
                Stroke:
                <input
                  type="text"
                  name="stroke"
                  value={details.stroke}
                  onChange={handleInputChange}
                />
              </label>
            )}
            {selectedObject.type === 'text' && (
              <label>
                Text Background Color:
                <input
                  type="text"
                  name="textBackgroundColor"
                  value={details.textBackgroundColor}
                  onChange={handleInputChange}
                />
              </label>
            )}
            {selectedObject.type === 'rect' && (
              <label>
                Fill:
                <input
                  type="text"
                  name="fill"
                  value={details.fill}
                  onChange={handleInputChange}
                />
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasComponent;
