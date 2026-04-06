import React from "react";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../../constants/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CategoryChart({ data, total }) {
  const size = 140,
    cx = 70,
    cy = 70,
    r = 52,
    strokeW = 16;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  const slices = data.slice(0, 6).map(({ cat, amt }) => {
    const pct = amt / total;
    const dash = pct * circ;
    const slice = {
      cat,
      amt,
      pct,
      dash,
      offset,
      color: CATEGORY_COLORS[cat] || "#888",
    };
    offset += dash;
    return slice;
  });

  return (
    <div className="donut-wrap">
      <svg className="donut-svg" viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={strokeW}
            strokeDasharray={`${s.dash} ${circ - s.dash}`}
            strokeDashoffset={-s.offset + circ / 4}
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        ))}

        <text x={cx} y={cy - 6} textAnchor="middle" className="donut-center">
          {slices.length > 0 ? (
            <FontAwesomeIcon icon={CATEGORY_ICONS[slices[0].cat]} />
          ) : (
            ""
          )}
        </text>

        <text x={cx} y={cy + 10} textAnchor="middle" className="donut-top-label">
          TOP SPEND
        </text>
      </svg>

      <div className="donut-legend">
        {slices.map((s, i) => (
          <div key={i} className="donut-item">
            <div className="donut-cat">
              <div className="donut-swatch" style={{ background: s.color }} />
              <FontAwesomeIcon icon={CATEGORY_ICONS[s.cat]} />
              <span className="donut-cat-label">{s.cat}</span>
            </div>
            <span className="donut-pct">{(s.pct * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}