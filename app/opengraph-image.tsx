import { ImageResponse } from "next/og";

export const alt = "Benny Bellson";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const serifFont = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/libre-baskerville@latest/latin-400-normal.woff"
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "black",
          fontFamily: "Serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />
        <span
          style={{
            fontSize: 120,
            color: "white",
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          BB
        </span>
        <span
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.5)",
            marginTop: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          Benny Bellson
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Serif",
          data: serifFont,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
