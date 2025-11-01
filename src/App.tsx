import SymmetryDrawCanvas from "./SymmetryDrawCanvas "
import Stars from "./Stars"
import { useCallback, useState } from "react"
import debounce from "lodash/debounce";
import Toolbar from "./Toolbar";

const getContrastColor = (color: string) => {
  let r: number, g: number, b: number;

  if (color.startsWith('#')) {
    const hex = color.slice(1);
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }
  else if (color.startsWith('rgb')) {
    const match = color.match(/\d+/g);
    if (match) {
      r = parseInt(match[0]);
      g = parseInt(match[1]);
      b = parseInt(match[2]);
    } else {
      return '#000000';
    }
  }
  else {
    return '#000000';
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

function App() {
  const [color, setColor] = useState("#5BC0BE");
  const [clearDrawingToggle, setClearDrawingToggle] = useState(false);
  const [stars, setStars] = useState(true);
  const [comets, setComets] = useState(true);

  const handleChange = useCallback(
    debounce((value) => setColor(value), 50),
    []
  );



  return (
    <div className="w-screen h-screen overflow-clip relative">
      <div
        className="bg-gradient-animate fixed top-1/2 left-1/2"
        style={{
          width: "100vmax",
          height: "100vmax",
          transform: "translate(-50%, -50%)",
        }}
      />
      <Stars showStars={stars} showComets={comets} />
      <div className="fixed top-2 left-2 z-50 flex items-center gap-2">
        <img src="/favicon.svg" alt="" className="w-auto h-[40px]" />
        <h1 className="text-sm text-white">Celestial Canvas</h1>
      </div>
      <Toolbar
        stars={stars}
        comets={comets}
        color={color}
        onStarsToggle={() => setStars(prev => !prev)}
        onCometsToggle={() => setComets(prev => !prev)}
        onColorChange={handleChange}
        onClear={() => setClearDrawingToggle(prev => !prev)}
        getContrastColor={getContrastColor}
      />

      <SymmetryDrawCanvas clearDrawingToggle={clearDrawingToggle} color={color} />
    </div>
  )
}

export default App