import type { Metadata, Viewport } from "next";
import { Inter, Inconsolata } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS } from "@/lib/site";

// Single family across the system (substitute for WF Visual Sans).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Inconsolata — documented mono fallback for technical captions.
const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · CORE Lab",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  verification: { google: "03l0ynFLm-qnF_rZz3Nr-dY7U5kJTE42l9PwvFgA4Qk" },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    alternateLocale: "vi_VN",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "CORE Lab — Computer Vision & Retrieval" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  // Geographic + generative-engine hints
  other: {
    "geo.region": "VN-SG",
    "geo.placename": "Ho Chi Minh City, Vietnam",
    "geo.position": "10.8700;106.8030",
    ICBM: "10.8700, 106.8030",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ResearchOrganization"],
  name: SITE_NAME,
  alternateName: "CORE — Computer Vision & Retrieval",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/og.png`,
  description: SITE_DESCRIPTION,
  email: "thanhnd@uit.edu.vn",
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "University of Information Technology, VNU-HCM",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "VN",
  },
  knowsAbout: [
    "Computer Vision",
    "Image and Video Retrieval",
    "Multimodal Learning",
    "Scene Text Recognition",
    "Multi-Agent Tracking",
    "Conversational Image Retrieval",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${inconsolata.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
