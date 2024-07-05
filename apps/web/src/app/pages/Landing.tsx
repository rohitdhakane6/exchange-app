import Dashboard from "../components/Dashboard";
import { Hero } from "../components/Hero";

export default function Landing() {
  return (
    <div className="flex flex-col flex-1 max-w-[1280px]">
      <Hero />
      <div className="flex flex-col pb-8">
        <Dashboard/>
      </div>
    </div>
  );
}
