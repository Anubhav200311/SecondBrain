// import "./styles/sidepanel.css"
import Heading from "./heading";
import SidePanelButtons from "./sidepanelButtons";


export default function SidePanel() {
    return (
      <div style={{ flex: 1, backgroundColor: '#f0f0f0', padding: '1rem' }}>
          <Heading />
          <SidePanelButtons />
      </div>
    );
}