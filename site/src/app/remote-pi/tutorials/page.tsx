import type { Metadata } from "next";
import Link from "next/link";
import { IconArrow, IconStar } from "@/components/landing/icons";
import { RevealController } from "@/components/landing/reveal-controller";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Hands-on guides for Remote Pi: get started with the app, run a local mesh, and route across PCs.",
};

type Step = {
  n?: string;
  star?: boolean;
  tag: string;
  title: string;
  href: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    n: "1",
    tag: "01 / 04",
    title: "Getting started",
    href: "/remote-pi/tutorials/getting-started",
    desc: "Install Remote Pi, pair your phone, and drive your first agent from the app.",
  },
  {
    n: "2",
    tag: "02 / 04",
    title: "Local mesh",
    href: "/remote-pi/tutorials/mesh-local",
    desc: "Let two agents on the same machine discover each other and trade messages.",
  },
  {
    n: "3",
    tag: "03 / 03",
    title: "Remote mesh",
    href: "/remote-pi/tutorials/mesh-remote",
    desc: "Route messages between agents on different PCs through the relay.",
  },
];

function StepCard({ s }: { s: Step }) {
  return (
    <Link className="step-card reveal" href={s.href}>
      <div className="sc-top">
        <span className="sc-num">{s.star ? <IconStar /> : s.n}</span>
        <span className="sc-tag">{s.tag}</span>
      </div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
      <span className="sc-link">
        Open tutorial <IconArrow />
      </span>
    </Link>
  );
}

export default function TutorialsIndexPage() {
  return (
    <div className="page">
      <div className="page-body">
        <div className="wrap">
          <header className="page-head reveal">
            <span className="eyebrow">Tutorials</span>
            <h1>Learn Remote Pi by doing.</h1>
            <p className="lede">
              Three hands-on guides, in order. Start with the app, then add
              agents and cross-PC routing.
              For the <em>why</em> behind it,{" "}
              <Link href="/remote-pi/why">read Why Pi</Link>; for exact flags and
              config, the <Link href="/remote-pi/docs">reference docs</Link>.
              Looking for Cockpit instead? Its tutorials are at{" "}
              <Link href="/tutorials">/tutorials</Link>.
            </p>
          </header>

          <div className="card-list">
            {STEPS.map((s) => (
              <StepCard key={s.href} s={s} />
            ))}
          </div>
        </div>
      </div>
      <RevealController />
    </div>
  );
}
