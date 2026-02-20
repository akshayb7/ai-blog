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
                        backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1c1917 50%, #0f172a 100%)',
                        padding: '80px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Amber glow — top right */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -120,
                            right: -80,
                            width: 500,
                            height: 500,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(245,158,11,0.08) 40%, rgba(0,0,0,0) 70%)',
                        }}
                    />

                    {/* Subtle amber glow — bottom left */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -150,
                            left: -100,
                            width: 400,
                            height: 400,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, rgba(0,0,0,0) 60%)',
                        }}
                    />

                    {/* Straw Hat icon — top left */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: 40,
                        }}
                    >
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 14,
                                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                width="32"
                                height="32"
                            >
                                <ellipse cx="12" cy="16" rx="10" ry="3" />
                                <path d="M5 16 C5 16 4 13 6 10 C8 7 10 6 12 6 C14 6 16 7 18 10 C20 13 19 16 19 16" />
                                <path d="M5.5 13 L18.5 13" strokeWidth="2" />
                            </svg>
                        </div>

                        {/* Category Pill */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '8px 24px',
                                borderRadius: '50px',
                                border: '1.5px solid rgba(245,158,11,0.4)',
                                background: 'rgba(245,158,11,0.12)',
                                color: '#fbbf24',
                                fontSize: 24,
                                fontWeight: 600,
                            }}
                        >
                            {category}
                        </div>
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 'bold',
                            color: '#f1f5f9',
                            lineHeight: 1.15,
                            marginBottom: 40,
                            maxWidth: '90%',
                        }}
                    >
                        {title}
                    </div>

                    {/* Footer brand */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 60,
                            left: 80,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 28,
                                fontWeight: 'bold',
                                color: '#d97706',
                            }}
                        >
                            Akshay&apos;s Expedition Logs
                        </div>

                        {/* Subtle separator + URL */}
                        <div
                            style={{
                                fontSize: 22,
                                color: '#78716c',
                                marginLeft: 20,
                            }}
                        >
                            blog.akshayworks.com
                        </div>
                    </div>
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
