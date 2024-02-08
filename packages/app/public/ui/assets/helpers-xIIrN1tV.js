function u(e,n){return Object.entries(n).reduce((t,[r,c])=>e.some(i=>i===r)?{...t,[r]:c}:t,{})}function o(e="",n=6,t=4){return e.length>10?`${e.slice(0,n)}...${e.slice(-t)}`:e}export{u as p,o as s};
