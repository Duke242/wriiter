"use client"
import React, { useState } from "react"
import { Rnd } from "react-rnd"

const BentoGrid = () => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    borderRadius: "20px",
    overflow: "hidden",
    backgroundColor: "lightgray",
  }

  const [color, setColor] = useState("#ffffff")
  const [tiles, setTiles] = useState([
    {
      id: 1,
      title: "New Title",
      width: 200,
      height: 100,
      fontSize: 16,
      fontFamily: "Arial",
      textAlign: "center", // Adding textAlign property
    },
  ])
  const [selectedTile, setSelectedTile] = useState(null)
  const [backgroundSelected, setBackgroundSelected] = useState(false)

  const handleClick = (id) => {
    setSelectedTile(id)
    setBackgroundSelected(false)
  }

  const addTitle = () => {
    setTiles([
      ...tiles,
      {
        id: Date.now(),
        title: "New Title",
        width: 200,
        height: 100,
        fontSize: 16,
        fontFamily: "Arial",
        textAlign: "center", // Adding textAlign property for new tiles
      },
    ])
  }

  const handleTitleChange = (id, event) => {
    const newTitle = event.target.value
    const newTiles = tiles.map((tile) =>
      tile.id === id ? { ...tile, title: newTitle } : tile
    )
    setTiles(newTiles)
  }

  const handleFontSizeChange = (event) => {
    const newSize = parseInt(event.target.value)
    if (selectedTile !== null) {
      const newTiles = tiles.map((tile) =>
        tile.id === selectedTile ? { ...tile, fontSize: newSize } : tile
      )
      setTiles(newTiles)
    }
  }

  const handleFontFamilyChange = (event) => {
    const newFontFamily = event.target.value
    if (selectedTile !== null) {
      const newTiles = tiles.map((tile) =>
        tile.id === selectedTile ? { ...tile, fontFamily: newFontFamily } : tile
      )
      setTiles(newTiles)
    }
  }

  const handleTextAlignChange = (event) => {
    const newTextAlign = event.target.value
    if (selectedTile !== null) {
      const newTiles = tiles.map((tile) =>
        tile.id === selectedTile ? { ...tile, textAlign: newTextAlign } : tile
      )
      setTiles(newTiles)
    }
  }

  return (
    <div className="flex items-start h-screen bg-gray-100 p-6">
      <div className="mr-2 bg-white rounded shadow w-1/5">
        <button
          className="text-left pb-2 py-2 px-6 text-md w-full hover:bg-gray-200 hover:rounded transition duration-300"
          onClick={() => setBackgroundSelected(true)}
        >
          Background
        </button>
        <div>
          {tiles.map((tile) => (
            <button
              key={tile.id}
              className={`text-left pb-2 py-2 px-6 text-md w-full hover:bg-gray-200 hover:rounded transition ${
                selectedTile === tile.id ? "bg-gray-300" : ""
              }`}
              onClick={() => handleClick(tile.id)}
            >
              {tile.title}
            </button>
          ))}
          <button
            className="text-left mb-2 py-2 px-6 text-md w-full hover:bg-gray-200 hover:rounded transition"
            onClick={addTitle}
          >
            +
          </button>
        </div>
      </div>
      <div className="mr-2 bg-white p-6 rounded shadow w-1/5">
        <h2 className="text-center mb-4 text-lg font-semibold">Properties</h2>
        {backgroundSelected ? (
          <div className="mb-4">
            <label htmlFor="backgroundColor" className="block mb-1">
              Background Color:
            </label>
            <input
              type="color"
              id="backgroundColor"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label htmlFor="fontSize" className="block mb-1">
                Font Size:
              </label>
              <input
                type="number"
                id="fontSize"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.fontSize || ""
                }
                onChange={handleFontSizeChange}
                min="10"
                max="50"
                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fontFamily" className="block mb-1">
                Font Family:
              </label>
              <select
                id="fontFamily"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.fontFamily ||
                  ""
                }
                onChange={handleFontFamilyChange}
                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>
            <div>
              <label htmlFor="textAlign" className="block mb-1">
                Text Align:
              </label>
              <select
                id="textAlign"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.textAlign ||
                  "left"
                }
                onChange={handleTextAlignChange}
                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          background: color,
          width: "calc(100vw - 600px)",
          height: "75vh",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
          borderRadius: "20px",
          padding: "20px",
          overflow: "auto",
        }}
        className="border border-gray-300"
      >
        {tiles.map((tile) => (
          <Rnd
            bounds={"parent"}
            key={tile.id}
            style={{
              ...style,
              fontSize: tile.fontSize,
              fontFamily: tile.fontFamily,
              textAlign: tile.textAlign, // Apply textAlign style
            }}
            default={{
              x: 0,
              y: 0,
              width: tile.width,
              height: tile.height,
            }}
            onClick={() => handleClick(tile.id)}
          >
            <div>
              <input
                type="text"
                value={tile.title}
                onChange={(e) => handleTitleChange(tile.id, e)}
                className="outline-none"
                style={{
                  background: "transparent",
                  border: "none",
                  width: "100%",
                  textAlign: tile.textAlign, // Apply textAlign style
                }}
              />
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  )
}

export default BentoGrid
