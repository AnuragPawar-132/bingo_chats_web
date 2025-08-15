import { MessageSquareText , Radar, MessageCircle, Users, Settings } from "lucide-react";
import { useSelector } from "react-redux";

export default function VerticalSidebar() {

  const myUser = useSelector((state: any) => state.auth.loggedUser);

  return (
    <div className="w-16 h-screen border-r border-gray-300 flex flex-col justify-between items-center py-4">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-6 relative">
        {/* Cart Icon with Badge */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <MessageSquareText  className="w-5 h-5" />
          </div>
          <div className="absolute -top-1 -right-1 bg-green-500 text-xs text-white rounded-full px-1.5">
            131
          </div>
        </div>

        {/* Radar Icon with Green Dot */}
        <div className="relative">
          <Radar className="text-gray-400 w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
        </div>

        <MessageCircle className="text-gray-400 w-6 h-6" />
        <Users className="text-gray-400 w-6 h-6" />

        {/* Divider */}
        <div className="w-8 border-t border-gray-600 my-4" />

        {/* Colored Circle (custom app icon?) */}
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-400" />
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center space-y-6">
        {/* Settings */}
        <Settings className="text-gray-400 w-6 h-6" />

        {/* User Avatar */}
        <img
          src="https://static.cricbuzz.com/a/img/v1/152x152/i1/c616517/virat-kohli.jpg"
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
