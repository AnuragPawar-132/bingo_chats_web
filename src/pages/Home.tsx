import ConversationList from "../layouts/ConversationList";
import ConversationView from '../layouts/ConversationView';
import VerticalSidebar from "../layouts/VerticalSidebar";

const Home = () => {

  return (
    <div className="flex h-screen">
      <div>
        <VerticalSidebar/>
      </div>
      <div className=" border-r border-gray-300">
        <ConversationList />
      </div>
      <div className="flex-1 border-l border-gray-300">
        <ConversationView />
      </div>
    </div>
  )
}

export default Home