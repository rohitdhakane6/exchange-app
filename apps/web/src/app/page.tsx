import { Hero } from "./components/Hero.tsx";
import { Markets } from "./components/Markets.tsx";
import Landing from "./pages/Landing.tsx";
export default function Page(): JSX.Element {
  return (
    <div className="flex flex-row flex-1">
      <div className="flex justify-center flex-row flex-1">
        <Landing/>
      </div>
    </div>
  );
}
