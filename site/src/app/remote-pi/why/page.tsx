import type { Metadata } from "next";
import Link from "next/link";
import { IconDownload, IconGithub } from "@/components/landing/icons";
import { RevealController } from "@/components/landing/reveal-controller";

export const metadata: Metadata = {
  title: "Why Pi",
  description:
    "Use Pi from your phone, discover agents on the same machine, and route messages across PCs through a relay you control.",
};

const GITHUB_URL = "https://github.com/jacobaraujo7/remote_pi";

const highlights = [
  {
    title: "Session-based",
    description:
      "Remote Pi connects only after you start it in Pi or from the companion app. It installs no background service and does not run when Pi is closed.",
  },
  {
    title: "Driven from your phone",
    description:
      "Pair once with a QR. Send prompts, switch models, start a fresh session, or compact context from iOS or Android.",
  },
  {
    title: "A local agent mesh",
    description:
      "Pi instances on one machine discover each other over a local socket and exchange structured messages.",
  },
  {
    title: "Cross-PC routing",
    description:
      "Agents on paired machines reach each other through the relay. Use the community relay or host your own.",
  },
  {
    title: "Open source",
    description:
      "MIT licensed. Keep control of where relay traffic goes and which devices are paired to your mesh.",
  },
];

export default function WhyPage() {
  return (
    <div className="page">
      <div className="page-body">
        <div className="wrap">
          <header className="page-head reveal" style={{ maxWidth: 760 }}>
            <span className="eyebrow">Why Pi</span>
            <h1>Pi, reachable from your phone.</h1>
            <p className="lede">
              Remote Pi connects the Pi session you start to your phone and
              agent mesh. You stay in control of when it runs, where traffic
              goes, and which peers can reach it.
            </p>
          </header>

          <div className="section-head reveal" style={{ marginTop: 64 }}>
            <span className="eyebrow">What you get</span>
            <h2>A session you control, connected where you need it.</h2>
          </div>
          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(248px, 1fr))",
              gap: 18,
              marginTop: 28,
            }}
          >
            {highlights.map((item) => (
              <div className="feat-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div
            className="reveal"
            style={{
              textAlign: "center",
              maxWidth: 680,
              margin: "96px auto 0",
              paddingBottom: 24,
            }}
          >
            <span className="eyebrow">Get started</span>
            <h2
              style={{
                fontFamily: "var(--ff-display)",
                fontWeight: 600,
                color: "var(--ink)",
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                margin: "14px 0 0",
              }}
            >
              Connect your Pi session.
            </h2>
            <p
              style={{
                color: "var(--ink-soft)",
                fontSize: 17,
                margin: "16px auto 0",
                maxWidth: 520,
              }}
            >
              Install the plugin, start Remote Pi explicitly, and pair your
              phone with a QR code.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 28,
              }}
            >
              <Link className="btn btn-primary" href="/remote-pi#install">
                <IconDownload /> Install
              </Link>
              <Link className="btn btn-ghost" href="/remote-pi/tutorials/getting-started">
                Getting started
              </Link>
              <a
                className="btn btn-ghost"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconGithub /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
      <RevealController />
    </div>
  );
}
