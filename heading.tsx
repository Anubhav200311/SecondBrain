import { inter } from '../../utils/fonts'; // Import the Inter font
import './sidepanel.css'; // Import the CSS file

export default function Heading() {
  return (
    <div>
      <h1 className={`heading ${inter.className}`}>Second Brain</h1>
    </div>
  );
}