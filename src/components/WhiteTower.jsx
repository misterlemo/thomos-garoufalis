const win = (x, y, h = 12) => `M${x} ${y + h}v-${h - 2.5}a2.5 2.5 0 0 1 5 0v${h - 2.5}`;
const merlons = (from, to, y, step = 10, w = 6, h = 8) => {
  let d = '';
  for (let x = from; x + w <= to; x += step) d += `M${x} ${y}v-${h}h${w}v${h}`;
  return d;
};

// The White Tower, drawn as line art. Strokes draw themselves in on load.
const WhiteTower = () => (
  <svg className="tower" viewBox="24 12 252 336" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    {/* low sun and Mount Olympus across the gulf */}
    <circle className="sun" cx="66" cy="214" r="15" />
    <g className="ink faint">
      <path pathLength="1" d="M-300 262H-20q24-6 40-16t30-16q12-6 22 2t20 10q12 0 20 8l8 8" />
      <path pathLength="1" d="M226 252q14-6 26-4t24-6q12-4 24 2l300 10" />
    </g>

    {/* trees on the promenade */}
    <g className="ink thin">
      <path pathLength="1" d="M78 318v-34M96 318v-28M78 296l-8-8M96 300l7-7" />
      <path pathLength="1" d="M52 286q-8-14 6-22q0-14 16-14q8-12 22-6q16-4 20 10q14 4 10 18q8 10-4 18q-6 10-20 6q-10 8-24 2q-16 4-22-6q-12-2-4-6z" />
      <path pathLength="1" d="M248 318v-24M248 300l-7-6M248 304l6-5" />
      <path pathLength="1" d="M232 296q-6-10 4-16q2-12 14-10q10-6 18 2q12 2 8 14q6 8-4 12q-6 8-18 4q-12 4-18-2q-8 0-4-4z" />
    </g>

    {/* the tower */}
    <g className="ink">
      {/* flag */}
      <path pathLength="1" d="M170 69V28" />
      <path className="flag" d="M170 30h20l-4 6 4 6h-20z" />
      {/* turret */}
      <path pathLength="1" d={`M142 82h56v-6h-56zM146 82v38M194 82v38${merlons(142, 198, 76, 9, 5, 7)}`} />
      <path pathLength="1" d={`${win(160, 94, 11)}${win(176, 94, 11)}`} />
      {/* parapet with merlons and corbels */}
      <path pathLength="1" d={`M112 128h116v12H112z${merlons(112, 228, 128)}`} />
      <path
        pathLength="1"
        d="M116 140q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0q3 5 6 0"
      />
      {/* drum */}
      <path pathLength="1" d="M120 146v172M220 146v172" />
      <path pathLength="1" d="M120 186q50 9 100 0M120 230q50 9 100 0M120 274q50 9 100 0" />
      {/* windows and door */}
      <path
        pathLength="1"
        d={`${win(138, 160)}${win(194, 164)}${win(166, 198)}${win(136, 244)}${win(200, 246)}${win(168, 286, 10)}${win(146, 202, 10)}`}
      />
      <path pathLength="1" d="M162 318v-12a8 8 0 0 1 16 0v12" />
    </g>
    <g className="ink thin shade">
      <path pathLength="1" d="M127 150v166M213 150v166M124 150v166M216 150v166" />
    </g>

    {/* birds */}
    <g className="ink thin">
      <path pathLength="1" d="M232 74q5-5 9 0q4-5 9 0M250 96q4-4 7 0q3-4 7 0" />
    </g>

    {/* promenade and sea */}
    <g className="ink">
      <path pathLength="1" d="M-300 318H600" />
    </g>
    <g className="ink thin sea">
      <path pathLength="1" d="M-300 332H40M70 332h96M196 332h60M286 332H600" />
      <path pathLength="1" d="M-300 346H10M34 346h70M130 346h120M270 346H600" />
      <path pathLength="1" d="M-300 360H60M92 360h40M160 360h88M276 360H600" />
      <path pathLength="1" d="M-300 374H20M50 374h110M190 374h50M262 374H600" />
      <path pathLength="1" d="M-300 388H80M110 388h60M200 388h70M300 388H600" />
    </g>
  </svg>
);

export default WhiteTower;
