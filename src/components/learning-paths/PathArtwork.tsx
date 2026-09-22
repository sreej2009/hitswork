import { useId } from 'react'

export function PathVisual({ stage }: { stage: number }) {
  const id = useId().replace(/:/g, '')
  const fill = `url(#${id}-blue)`
  const glass = `url(#${id}-glass)`
  return <svg className="lp-stage-visual" viewBox="0 0 100 85" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-blue`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#5fb1ff" /><stop offset=".35" stopColor="#136be6" /><stop offset="1" stopColor="#021634" /></linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1378ff" stopOpacity=".75" /><stop offset="1" stopColor="#05204d" stopOpacity=".2" /></linearGradient>
      <radialGradient id={`${id}-halo`}><stop stopColor="#087aff" stopOpacity=".36" /><stop offset="1" stopColor="#087aff" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse cx="50" cy="68" rx="43" ry="12" fill={`url(#${id}-halo)`} />
    {stage === 0 && <g stroke="#248aff" strokeWidth=".7">{[26, 13, 0].map(y => <g key={y} transform={`translate(0 ${y})`}><path d="m19 30 31-17 31 17-31 17Z" fill={fill} /><path d="m19 30 31 17 31-17v7L50 54 19 37Z" fill={glass} /></g>)}</g>}
    {stage === 1 && <g stroke="#288aff" strokeWidth="1"><path d="m21 30 29-16 29 16-29 17Z" fill={fill} /><path d="m21 30 29 17v32L21 62Z" fill={fill} /><path d="m50 47 29-17v32L50 79Z" fill={glass} /><path d="m21 62 29-17 29 17M50 14v31" strokeOpacity=".3" /></g>}
    {stage === 2 && <g stroke="#2684ff" strokeWidth="2.1"><ellipse cx="50" cy="45" rx="36" ry="13" /><ellipse cx="50" cy="45" rx="36" ry="13" transform="rotate(60 50 45)" /><ellipse cx="50" cy="45" rx="36" ry="13" transform="rotate(120 50 45)" /><circle cx="50" cy="45" r="6" fill="#358fff" stroke="none" /></g>}
    {stage === 3 && <g stroke="#2d8bff" strokeWidth="1">{[27, 43, 60].map((h,i) => <g key={h}><rect x={20+i*23} y={75-h} width="18" height={h} rx="4" fill={fill} /><path d={`m${22+i*23} ${77-h} 6-3 8 3`} stroke="#6ab8ff" /></g>)}</g>}
    {stage === 4 && <g stroke="#2388ff" strokeWidth="1.3"><path d="M16 32V23q0-5 5-5h15l8 8h34v47H16Z" fill={fill} /><rect x="16" y="32" width="68" height="42" rx="4" fill={fill} /><path d="m41 46-9 7 9 7m18-14 9 7-9 7m-7-16-5 22" stroke="#47a4ff" strokeWidth="2.4" strokeLinecap="round" /></g>}
    {stage === 5 && <g stroke="#328fff" strokeWidth="1.2"><path d="M37 28v-7q0-5 5-5h16q5 0 5 5v7h-5v-6H42v6Z" fill={fill} /><rect x="16" y="28" width="68" height="47" rx="5" fill={fill} /><path d="M16 46q34 16 68 0" /><rect x="45" y="47" width="10" height="12" rx="3" fill={fill} /></g>}
  </svg>
}

// Layered, faceted terrain keeps the mountain atmospheric without a WebGL scene.
const ridges = [
  [[0,240],[48,213],[88,228],[137,166],[170,198],[213,179],[256,206],[300,162],[335,180],[382,142],[422,106],[468,74],[498,33],[532,61],[558,54],[593,108],[640,125]],
  [[0,275],[65,254],[111,269],[153,213],[195,247],[240,211],[280,246],[327,214],[361,233],[403,183],[443,151],[478,112],[508,70],[543,118],[576,91],[609,165],[640,181]],
  [[0,310],[62,302],[118,310],[167,260],[202,293],[247,264],[297,301],[345,263],[379,284],[416,239],[463,207],[493,166],[522,143],[559,202],[592,174],[621,236],[640,269]],
]

export function PathMountain() {
  const id = useId().replace(/:/g, '')
  return <div className="lp-mountain" aria-hidden="true">
    <svg viewBox="0 0 640 330" fill="none">
      <defs>
        <radialGradient id={`${id}-atmosphere`}><stop stopColor="#0750aa" stopOpacity=".21" /><stop offset="1" stopColor="#031021" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}-rock`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0b2446" /><stop offset=".6" stopColor="#030b17" /><stop offset="1" stopColor="#01060d" /></linearGradient>
        <filter id={`${id}-route`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" /></filter>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1"><stop offset=".65" stopColor="white" /><stop offset="1" stopColor="black" /></linearGradient>
        <mask id={`${id}-mask`}><rect width="640" height="330" fill={`url(#${id}-fade)`} /></mask>
      </defs>
      <ellipse cx="423" cy="153" rx="280" ry="176" fill={`url(#${id}-atmosphere)`} />
      <g mask={`url(#${id}-mask)`}>
        <path d={`${ridges[0].map(([x,y],i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')} L640 330H0Z`} fill={`url(#${id}-rock)`} />
        {ridges.slice(0,2).flatMap((row,j) => row.slice(0,-1).flatMap((point,i) => {
          const next = row[i+1], down = ridges[j+1][i], diag = ridges[j+1][i+1]
          return [<polygon key={`${j}-${i}-a`} points={[point,next,down].map(p=>p.join(',')).join(' ')} fill={['#092247','#051126','#071a34','#020810'][i%4]} stroke="#154579" strokeOpacity=".32" strokeWidth=".65" />, <polygon key={`${j}-${i}-b`} points={[next,diag,down].map(p=>p.join(',')).join(' ')} fill={['#020811','#071529','#030c1a'][i%3]} stroke="#123b68" strokeOpacity=".26" strokeWidth=".6" />]
        }))}
        {ridges.map((row,i) => <polyline key={i} points={row.map(p=>p.join(',')).join(' ')} stroke="#1263b4" strokeOpacity={i===0 ? '.6' : '.25'} strokeWidth="1" />)}
        {ridges.slice(0,2).flatMap((row,j) => row.slice(0,-1).map(([x,y],i) => {
          const [nx,ny] = row[i+1], [dx,dy] = ridges[j+1][i]
          const cx = (x+nx+dx)/3, cy = (y+ny+dy)/3
          return <g key={`crag-${j}-${i}`}>
            <path d={`M${x} ${y} ${cx-4} ${cy-7} ${dx} ${dy} M${nx} ${ny} ${cx+5} ${cy+3} ${x} ${y}`} stroke="#2165a2" strokeWidth=".5" strokeOpacity=".3" />
            <path d={`M${x} ${y} ${cx-4} ${cy-7} ${cx+5} ${cy+3}Z`} fill="#1b4d7e" fillOpacity={i%3===0 ? '.17' : '.07'} />
          </g>
        }))}
        <path d="m137 166 17 46 13 48m133-98 27 52 18 49m77-157 21 45 20 56m35-174-20 79 15 54m65-112 18 37 16 83" stroke="#1c62a2" strokeOpacity=".32" />
        <path d="M185 253c32-41 74-7 105-29s57-14 82-45 58-7 75-43 33-31 43-53l8-50" stroke="#0077ff" strokeWidth="6" filter={`url(#${id}-route)`} />
        <path d="M185 253c32-41 74-7 105-29s57-14 82-45 58-7 75-43 33-31 43-53l8-50" stroke="#2097ff" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
        {[[185,253],[290,224],[372,179],[447,136],[490,83],[498,33]].map(([x,y]) => <g key={x}><circle cx={x} cy={y} r="6" fill="#087aff" filter={`url(#${id}-route)`} /><circle cx={x} cy={y} r="2" fill="#51b7ff" /></g>)}
      </g>
      <path d="M498 34V2m0 1c10-7 12 9 26 2l-5 8 5 6c-14 6-17-9-26-2" stroke="#248dff" fill="#095fce" strokeWidth="1.4" />
    </svg>
    <div className="lp-mountain-note">From<br />Curiosity to<br />Career<svg viewBox="0 0 70 90"><path d="M24 4c47 6 45 58-11 69m7-14-9 16 19 1" stroke="currentColor" strokeWidth="1.3" fill="none" /></svg></div>
    <p className="lp-mountain-micro">Higher<br />Skills<br />Brighter<br />Tomorrow</p>
  </div>
}
