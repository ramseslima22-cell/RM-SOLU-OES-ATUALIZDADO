import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
export default function RmLogo({className,markClassName,to='/'}) {
 const accentId = React.useId();
 const hero = className?.split(' ').includes('rm-hero-main-logo');
 const logo = <svg viewBox="220 110 1500 670" width="154" height="69" role="img" aria-label="RM Soluções Digitais" className={cn('official-logo',className,markClassName)}>
  <image className="rm-logo-base" href="/rm-logo.png" width="1942" height="809"/>
  {hero && <>
   <defs><filter id={accentId} colorInterpolationFilters="sRGB"><feFlood floodColor="#0649ff"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs>
   <svg x="1373" y="424" width="120" height="110" viewBox="1373 424 120 110" overflow="hidden">
    <image href="/rm-logo.png" width="1942" height="809" filter={`url(#${accentId})`}/>
   </svg>
  </>}
 </svg>;
 return to ? <Link to={to} aria-label="RM Soluções Digitais — página inicial">{logo}</Link> : logo;
}
