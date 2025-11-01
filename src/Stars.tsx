import { memo, useMemo } from "react";

function Stars({ showComets = false, showStars = true }) {
  const layers = useMemo(() => Array.from({ length: 3 }), []);
  const starsPerLayer = 200;

  const starData = useMemo(() => {
    return layers.map(() =>
      Array.from({ length: starsPerLayer }).map(() => ({
        cx: `${Math.round(Math.random() * 10000) / 100}%`,
        cy: `${Math.round(Math.random() * 10000) / 100}%`,
        r: Math.round((Math.random() + 1.5) * 10) / 10,
      }))
    );
  }, [layers]);

  return (
    <div className="stars-wrapper">
      {showStars && starData.map((stars, s) => (
        <svg
          key={s}
          className="stars"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          {stars.map((star, i) => (
            <svg
              key={i}
              className="star"
              x={star.cx}
              y={star.cy}
              width={star.r * 2}
              height={star.r * 2}
              viewBox="0 0 512 512"
              fill="#ffffff"
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            >
              <path d="M496,203.3H312.36L256,32,199.64,203.3H16L166.21,308.7,107.71,480,256,373.84,404.29,480,345.68,308.7Z" />
            </svg>
          ))}
        </svg>
      ))}

      {showComets && (
        <svg width="100%" height="100%" preserveAspectRatio="none" className="extras">
          <defs>
            <radialGradient id="comet-gradient" cx="0" cy=".5" r="0.5">
              <stop offset="0%" stopColor="rgba(255,255,255,.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          {/* All comets roughly top-left to bottom-right */}
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-1" fill="url(#comet-gradient)" cx="0" cy="0" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-2" fill="url(#comet-gradient)" cx="0" cy="10%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-3" fill="url(#comet-gradient)" cx="0" cy="20%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-4" fill="url(#comet-gradient)" cx="0" cy="30%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-5" fill="url(#comet-gradient)" cx="0" cy="40%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-6" fill="url(#comet-gradient)" cx="0" cy="50%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-7" fill="url(#comet-gradient)" cx="0" cy="60%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-8" fill="url(#comet-gradient)" cx="0" cy="70%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-9" fill="url(#comet-gradient)" cx="0" cy="80%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-10" fill="url(#comet-gradient)" cx="0" cy="90%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-11" fill="url(#comet-gradient)" cx="0" cy="100%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-12" fill="url(#comet-gradient)" cx="0" cy="110%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-13" fill="url(#comet-gradient)" cx="0" cy="120%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-14" fill="url(#comet-gradient)" cx="0" cy="130%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-15" fill="url(#comet-gradient)" cx="0" cy="140%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-16" fill="url(#comet-gradient)" cx="0" cy="150%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-17" fill="url(#comet-gradient)" cx="0" cy="160%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-18" fill="url(#comet-gradient)" cx="0" cy="170%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-19" fill="url(#comet-gradient)" cx="0" cy="180%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-20" fill="url(#comet-gradient)" cx="0" cy="190%" rx="150" ry="2" />
          </g>
          <g transform="rotate(-135) translate(0, -500)">
            <ellipse className="comet comet-21" fill="url(#comet-gradient)" cx="0" cy="200%" rx="150" ry="2" />
          </g>
        </svg>
      )}

    </div>
  );
}

export default memo(Stars);