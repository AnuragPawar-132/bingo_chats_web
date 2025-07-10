import ConversationList from "../layouts/ConversationList";
import ConversationView from '../layouts/ConversationView';

const Home = () => {

  return (
    <div className="flex h-screen">
      <div className="w-[30%] border-r border-gray-300">
        <ConversationList />
      </div>
      <div className="flex-1 border-l border-gray-300">
        <ConversationView />
      </div>
    </div>
  )
}

export default Home