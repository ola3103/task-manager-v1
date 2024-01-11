import { useEffect, useState } from "react";

function ProgressBar({ percentage }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const progressOffset = ((100 - percentage) / 100) * 569.14;
    setOffset(progressOffset);
  }, [percentage]);

  return (
    <svg className="progress-ring" width="250" height="250">
      <circle
        className="progress-ring-circle"
        stroke="#f4f2f5" // Change color as needed
        strokeWidth="12"
        fill="transparent"
        r="90"
        cx="120"
        cy="120"
      />
      <circle
        className="progress-ring-circle"
        stroke="#59038c" // Change color as needed
        strokeWidth="12"
        fill="transparent"
        r="90"
        cx="120"
        cy="120"
        style={{
          strokeDasharray: 569.14,
          strokeDashoffset: offset,
        }}
      />
      <text
        x="50%"
        y="40%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#850dcb" // Change color as needed
        fontSize="14"
        className="progress-text"
      >
        You have completed
      </text>
      <text
        x="50%"
        y="51%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#850dcb" // Change color as needed
        fontSize="36"
        fontWeight={600}
        className="progress-text"
      >
        {percentage}%
      </text>
      <text
        x="50%"
        y="61%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#850dcb" // Change color as needed
        fontSize="14"
        className="progress-text"
      >
        of your task
      </text>
    </svg>
  );
}

export default ProgressBar;
