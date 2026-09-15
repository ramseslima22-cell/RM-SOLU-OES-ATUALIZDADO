import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
export default function RmLogo({className,markClassName,to='/'}) {
 const logo = <svg viewBox="220 110 1500 670" width="154" height="69" role="img" aria-label="RM Soluções Digitais" className={cn('official-logo',className,markClassName)}><image href="/rm-logo.png" width="1942" height="809"/></svg>;
 return to ? <Link to={to} aria-label="RM Soluções Digitais — página inicial">{logo}</Link> : logo;
}
