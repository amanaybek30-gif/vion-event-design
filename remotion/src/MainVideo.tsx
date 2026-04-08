import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: inter } = loadFont("normal", { weights: ["300", "400", "600"], subsets: ["latin"] });

export const MainVideo = () => {
  const frame = useCurrentFrame();

  // Global fade to black at the end
  const fadeOut = interpolate(frame, [130, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", fontFamily: inter, opacity: fadeOut }}>
      {/* Subtle gold accent line that sweeps across */}
      <Sequence from={0} durationInFrames={150}>
        <GoldSweep />
      </Sequence>

      {/* Flash frames - quick cinematic cuts */}
      <Sequence from={5} durationInFrames={8}>
        <FlashFrame color="hsl(45, 80%, 55%)" opacity={0.06} />
      </Sequence>
      <Sequence from={18} durationInFrames={6}>
        <FlashFrame color="hsl(45, 80%, 55%)" opacity={0.04} />
      </Sequence>
      <Sequence from={30} durationInFrames={5}>
        <FlashFrame color="hsl(45, 80%, 55%)" opacity={0.08} />
      </Sequence>

      {/* Text 1: "Designed to be remembered" */}
      <Sequence from={35} durationInFrames={40}>
        <TextReveal text="Designed to be remembered" size={52} y={480} />
      </Sequence>

      {/* Text 2: "Experiences. Systems. Execution." */}
      <Sequence from={70} durationInFrames={35}>
        <TextReveal text="Experiences. Systems. Execution." size={28} y={520} color="hsl(45, 80%, 55%)" />
      </Sequence>

      {/* Logo: VION Events */}
      <Sequence from={95} durationInFrames={55}>
        <LogoReveal />
      </Sequence>
    </AbsoluteFill>
  );
};

const GoldSweep = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 150], [-200, 2200], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 20, 130, 150], [0, 0.15, 0.15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <div style={{
        position: "absolute",
        top: "50%",
        left: x,
        width: 2,
        height: 120,
        background: "linear-gradient(180deg, transparent, hsl(45, 80%, 55%), transparent)",
        opacity,
        transform: "translateY(-50%)",
      }} />
    </AbsoluteFill>
  );
};

const FlashFrame = ({ color, opacity }: { color: string; opacity: number }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 2, 4], [0, opacity, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: color, opacity: o }} />
  );
};

const TextReveal = ({ text, size, y, color = "rgba(255,255,255,0.9)" }: { text: string; size: number; y: number; color?: string }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15, 25, 35], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, 15], [12, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{
        color,
        fontSize: size,
        fontWeight: 300,
        letterSpacing: size > 40 ? 6 : 10,
        textTransform: "uppercase",
        opacity,
        transform: `translateY(${translateY}px)`,
        textAlign: "center",
      }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

const LogoReveal = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 20], [0.95, 1], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [15, 30], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", opacity, transform: `scale(${scale})` }}>
        <div style={{
          fontSize: 72,
          fontWeight: 600,
          letterSpacing: 12,
          color: "white",
          textTransform: "uppercase",
        }}>
          VION Events
        </div>
        <div style={{
          fontSize: 16,
          fontWeight: 300,
          letterSpacing: 8,
          color: "hsl(45, 80%, 55%)",
          textTransform: "uppercase",
          marginTop: 20,
          opacity: taglineOpacity,
        }}>
          Designed to be remembered
        </div>
      </div>
    </AbsoluteFill>
  );
};
