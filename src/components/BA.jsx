import React, { useState, useRef } from 'react';
import { SplitSquareHorizontal } from 'lucide-react';

export default function BA({ before, after, h = 340 }) {
  const [pos, setPos] = useState(50);
  const ref = useRef();
  const drag = useRef(false);

  const move = cx => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((cx - r.left) / r.width) * 100)));
  };

  return (
    <div ref={ref} style={{
      height: h,
      position: 'relative',
      overflow: 'hidden',
      background: '#EEE',
      cursor: 'col-resize',
      userSelect: 'none'
    }}
      onMouseDown={() => drag.current = true}
      onMouseUp={() => drag.current = false}
      onMouseLeave={() => drag.current = false}
      onMouseMove={e => drag.current && move(e.clientX)}
      onTouchMove={e => move(e.touches[0].clientX)}>
      <img src={after} alt="after" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: `${pos}%` }}>
        <img src={before} alt="before" style={{ width: ref.current?.offsetWidth || '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
      </div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, transform: 'translateX(-50%)', width: 2, background: 'white', zIndex: 4 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 36, height: 36, background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,.2)' }}>
          <SplitSquareHorizontal size={15} color="#888" />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,.55)', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 3, letterSpacing: '.1em', opacity: pos > 15 ? 1 : 0, transition: 'opacity .3s' }}>BEFORE</div>
      <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,.55)', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 3, letterSpacing: '.1em', opacity: pos < 85 ? 1 : 0, transition: 'opacity .3s' }}>AFTER</div>
    </div>
  );
}
