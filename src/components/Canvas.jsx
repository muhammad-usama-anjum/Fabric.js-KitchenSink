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
    textBackgroundColor: "",
    fontSize:""
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
        textBackgroundColor: obj.textBackgroundColor || "",
        fontSize: obj.fontSize
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
        textBackgroundColor: "",
        fontSize:""
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
        fill: details.fill || "black", // Default fill if empty
        stroke: details.fill ? "" : "black",
        radius: details.radius || selectedObject.radius,
        stroke: details.stroke || selectedObject.stroke,
        textBackgroundColor: details.textBackgroundColor || selectedObject.textBackgroundColor,
        fontSize: details.fontSize
      });
      selectedObject.setCoords();
      fabricCanvasRef.current.renderAll();
    }
  };

  useEffect(() => {
    updateObjectDetails();
  }, [details]);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const AddReactangle = () => {
    const rect = new fabric.Rect({
      top: getRandomInt(0, 450), // Ensure it stays within the canvas
      left: getRandomInt(0, 700), // Ensure it stays within the canvas
      fill: getRandomColor(),
      width: getRandomInt(50, 150), // Random width
      height: getRandomInt(30, 100), // Random height
    });

    fabricCanvasRef.current.add(rect);
  };

  const AddCircle = () => {
    const circle = new fabric.Circle({
      radius: getRandomInt(10, 50), // Random radius
      fill: getRandomColor(),
      top: getRandomInt(0, 450), // Ensure it stays within the canvas
      left: getRandomInt(0, 700), // Ensure it stays within the canvas
    });
    fabricCanvasRef.current.add(circle);
  };

  const AddPath = () => {
    const path = new fabric.Path("M 0 0 L 300 100 L 200 300 z", {
      fill: getRandomColor(),
      stroke: getRandomColor(),
      strokeWidth: 1,
      top: getRandomInt(0, 450), // Ensure it stays within the canvas
      left: getRandomInt(0, 700), // Ensure it stays within the canvas
    });
    fabricCanvasRef.current.add(path);
  };

  const AddText = () => {
    const text = new fabric.Text("Hello fabric.js", {
      fill: getRandomColor(),
      fontSize: getRandomInt(16, 40), // Random font size
      top: getRandomInt(0, 450), // Ensure it stays within the canvas
      left: getRandomInt(0, 700), // Ensure it stays within the canvas
      textBackgroundColor: getRandomColor(),
    });
    fabricCanvasRef.current.add(text);
  };

  const AddImage = () => {
    const crossImg = new Image();
    crossImg.onload = function () {
      const cross = new fabric.Image(crossImg, {
        left: getRandomInt(0, 700), // Ensure it stays within the canvas
        top: getRandomInt(0, 450), // Ensure it stays within the canvas
        scaleX: Math.random() * 2, // Random scale
        scaleY: Math.random() * 2, // Random scale
      });
      fabricCanvasRef.current.add(cross);
    };
    crossImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrKL3RBmogp-LQGw48bJ6KHjMgjWwmLFpcQ&s";
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
      textBackgroundColor: "",
      fontSize:""
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
            {selectedObject.type === 'rect' && (
            <label>
              Width:
              <input
                type="number"
                name="width"
                value={details.width}
                onChange={handleInputChange}
              />
            </label>
            )}
              {selectedObject.type === 'rect' && (
            <label>
              Height:
              <input
                type="number"
                name="height"
                value={details.height}
                onChange={handleInputChange}
              />
            </label>
              )}
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
            {selectedObject.type === 'text' && (
              <label>
                Font Size:
                <input
                  type="number"
                  name="fontSize"
                  value={details.fontSize}
                  onChange={handleInputChange}
                />
              </label>
            )}
              <label>
                Fill:
                <input
                  type="text"
                  name="fill"
                  value={details.fill}
                  onChange={handleInputChange}
                />
              </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasComponent;
