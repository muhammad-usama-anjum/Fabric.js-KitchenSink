import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";
import Canvas from "../Styles/Canvas.css";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
    });

    return () => {
      fabricCanvasRef.current.dispose();
    };
  }, []);

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
    crossImg.onload = function (img) {
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
  };

  return (
    <>
      <div className="canvasStyle">
        <canvas ref={canvasRef} />
      </div>
      <div className="buttonStyle">
        <button onClick={AddReactangle}>Add Rectangle</button>
        <button onClick={AddCircle}>Add Circle</button>
        <button onClick={AddPath}>Add Path</button>
        <button onClick={AddText}>Add Text</button>
        <button onClick={AddImage}>Add Image</button>
        <button onClick={ClearCanvas}>Clear Canvas</button>
      </div>
    </>
  );
};

export default CanvasComponent;
