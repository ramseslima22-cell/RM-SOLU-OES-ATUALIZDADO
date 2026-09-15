import React from 'react';
import { Helmet } from 'react-helmet';
import { BRAND } from '@/data/rmBrand';

export default function PageSeo({ title, description, path = '/' }) {
	const fullTitle = title ? `${title} | ${BRAND.name}` : BRAND.seoTitle;
	const desc = description || BRAND.seoDescription;
	const origin = typeof window !== 'undefined' ? window.location.origin : '';
	const url = origin ? `${origin}${path}` : path;

	return (
		<Helmet>
			<html lang="pt-BR" />
			<title>{fullTitle}</title>
			<meta name="description" content={desc} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={desc} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
			<meta property="og:site_name" content={BRAND.name} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={desc} />
			{origin ? <link rel="canonical" href={url} /> : null}
		</Helmet>
	);
}
