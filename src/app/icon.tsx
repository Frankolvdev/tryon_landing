import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 30%, #2c0b13 0%, #090b12 52%, #020308 100%)",
          color: "white",
          fontSize: 164,
          fontWeight: 900,
          letterSpacing: -12,
          border: "18px solid #8e2034",
        }}
      >
        T
      </div>
    ),
    size,
  );
}
