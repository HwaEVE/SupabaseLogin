export const metadata = {
    title: 'My App',
    description: 'Welcome to My App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
