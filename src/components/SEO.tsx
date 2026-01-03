import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
}

export function SEO({
    title,
    description = "Explore the bleeding edge of Artificial Intelligence. Your daily hub for breaking AI news, curated research papers, agentic workflows, and deep dives into the future of computing.",
    image = "/og-image.png",
    url,
    type = 'website'
}: SEOProps) {
    const siteTitle = "WhatsGoingOnAI";
    const fullTitle = `${title} | ${siteTitle}`;
    const fullUrl = url ? `https://whatsgoingonai.com${url}` : 'https://whatsgoingonai.com';
    // Ensure image is absolute URL if it is a relative path
    const fullImage = image.startsWith('http') ? image : `https://whatsgoingonai.com${image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
        </Helmet>
    );
}
