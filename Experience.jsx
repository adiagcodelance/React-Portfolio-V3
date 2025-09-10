import React, { useState } from "react";
import "./Experience.css"; // keep your existing styling


export default function Experience({ jobs = [] }) {
const [index, setIndex] = useState(0);
const active = jobs[index] || jobs[0];
if (!jobs.length) return null;


return (
<section className="experience-sub-section">
<div className="exp-wrapper">
<ul className="exp-tabs" role="tablist" aria-label="Companies">
  {jobs.map((job, i) => (
    <li
      role="tab"
      aria-selected={i===index}
      tabIndex={i===index ? 0 : -1}
      className={i===index ? "active" : ""}
      key={`${job.company}-${i}`}
      onClick={()=>setIndex(i)}
      onKeyDown={(e)=>{ if(e.key==="ArrowDown") setIndex((i+1)%jobs.length); if(e.key==="ArrowUp") setIndex((i-1+jobs.length)%jobs.length); }}
    >
      {job.company}
    </li>
  ))}
</ul>
<div role="tabpanel" aria-live="polite" className="exp-detail">
  {/* existing detail content */}
</div>

<div className="exp-detail">
<div className="vertical-rule" />
<div className="exp-body">
<h3>
{active.logo && <img src={active.logo} alt={`${active.company} logo`} className="exp-logo" />} {active.company} — <span>{active.title}</span>
</h3>
<em className="dates">{active.dates}</em>
<ul className="contributions">
{active.bullets?.map((b,k)=> <li key={k}>{b}</li>)}
</ul>
<div className="exp-tags">
  {active.tags?.map((tag,k)=> (
    <li key={k}>{tag}</li>
  ))}
</div>
</div>
</div>
</div>
</section>
);
}