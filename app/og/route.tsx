import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title');
        const category = searchParams.get('category') || 'Post';

        if (!title) {
            return new Response('Missing title', { status: 400 });
        }

        // Font data
        const fontData = await fetch(
            new URL('https://github.com/google/fonts/raw/main/ofl/inter/Inter-Bold.ttf', import.meta.url)
        ).then((res) => res.arrayBuffer());

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundImage: 'linear-gradient(to bottom right, #020617, #1e3a8a, #0f172a)',
                        padding: '80px',
                    }}
                >
                    {/* Category Pill */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 30px',
                            borderRadius: '50px',
                            border: '2px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.1)',
                            color: '#e2e8f0',
                            fontSize: 30,
                            marginBottom: 40,
                            fontWeight: 600,
                        }}
                    >
                        {category}
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 'bold',
                            color: 'transparent',
                            lineHeight: 1.1,
                            marginBottom: 40,
                            backgroundClip: 'text',
                        }}
                    >
                        {title}
                    </div>

                    {/* Footer logo/brand */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 80,
                            left: 80,
                        }}
                    >
                        <div style={{ fontSize: 40, fontWeight: 'bold', color: '#60a5fa' }}>Akshay's Expedition Logs</div>
                    </div>

                    {/* Decorative Elements */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -100,
                            right: -100,
                            width: 500,
                            height: 500,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%)',
                        }}
                    />
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Inter',
                        data: fontData,
                        style: 'normal',
                        weight: 700,
                    },
                ],
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
