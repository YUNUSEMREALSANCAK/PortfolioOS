import React, { useState } from 'react';
import { 
  FileText, 
  Folder, 
  Calculator, 
  Play, 
  BookOpen, 
  MessageCircle,
  Users,
  Map,
  Briefcase,
  Trash2,
  Package
} from 'lucide-react';

interface IconPosition {
  x: number;
  y: number;
}

interface DesktopIcon {
  id: string;
  name: string;
  icon: any;
  position: IconPosition;
}

function App() {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [leftIcons, setLeftIcons] = useState<DesktopIcon[]>([
    { id: 'home', name: 'home.mdx', icon: FileText, position: { x: 0, y: 0 } },
    { id: 'product', name: 'Product OS', icon: Folder, position: { x: 0, y: 80 } },
    { id: 'pricing', name: 'Pricing', icon: Calculator, position: { x: 0, y: 160 } },
    { id: 'customers', name: 'customers.mdx', icon: FileText, position: { x: 0, y: 240 } },
    { id: 'demo', name: 'demo.mov', icon: Play, position: { x: 0, y: 320 } },
    { id: 'docs', name: 'Docs', icon: BookOpen, position: { x: 0, y: 400 } },
    { id: 'talk', name: 'Talk to a human', icon: MessageCircle, position: { x: 0, y: 480 } },
  ]);

  const [rightIcons, setRightIcons] = useState<DesktopIcon[]>([
    { id: 'why', name: 'Why PostHog?', icon: Users, position: { x: 0, y: 0 } },
    { id: 'roadmap', name: 'Roadmap', icon: Map, position: { x: 0, y: 80 } },
    { id: 'forums', name: 'Forums', icon: MessageCircle, position: { x: 0, y: 160 } },
    { id: 'handbook', name: 'Company handbook', icon: Briefcase, position: { x: 0, y: 240 } },
    { id: 'work', name: 'Work here', icon: Briefcase, position: { x: 0, y: 320 } },
    { id: 'trash', name: 'Trash', icon: Trash2, position: { x: 0, y: 400 } },
  ]);

  const handleMouseDown = (e: React.MouseEvent, iconId: string, isRightSide: boolean) => {
    e.preventDefault();
    setDraggedIcon(iconId);
    
    const icons = isRightSide ? rightIcons : leftIcons;
    const icon = icons.find(i => i.id === iconId);
    if (icon) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedIcon) return;
    
    e.preventDefault();
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;
    
    // Update position for the dragged icon
    const updateIconPosition = (icons: DesktopIcon[], setIcons: React.Dispatch<React.SetStateAction<DesktopIcon[]>>) => {
      const iconIndex = icons.findIndex(i => i.id === draggedIcon);
      if (iconIndex !== -1) {
        const updatedIcons = [...icons];
        updatedIcons[iconIndex] = {
          ...updatedIcons[iconIndex],
          position: { x: Math.max(0, newX), y: Math.max(0, newY) }
        };
        setIcons(updatedIcons);
        return true;
      }
      return false;
    };
    
    // Try to update in left icons first, then right icons
    if (!updateIconPosition(leftIcons, setLeftIcons)) {
      updateIconPosition(rightIcons, setRightIcons);
    }
  };

  const handleMouseUp = () => {
    setDraggedIcon(null);
    setDragOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
          </div>
          <nav className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-700 hover:text-gray-900">Product OS</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Docs</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Library</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Company</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">More</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-gray-700 hover:text-gray-900">🔍</button>
          <button className="text-sm text-gray-700 hover:text-gray-900">💬</button>
          <button className="text-sm text-gray-700 hover:text-gray-900">1</button>
          <button className="text-sm text-gray-700 hover:text-gray-900">👤</button>
          <button className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800">
            Get started - free
          </button>
        </div>
      </div>

      {/* Desktop Interface */}
      <div className="flex h-screen">
        {/* Left Sidebar with Desktop Icons */}
        <div className="w-20 bg-transparent p-2 relative pt-8">
          {leftIcons.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`absolute flex flex-col items-center cursor-pointer group ${
                  activeIcon === item.id ? 'bg-blue-100/50 rounded-lg p-2' : 'p-2'
                } ${draggedIcon === item.id ? 'z-50 opacity-80' : 'z-10'}`}
                style={{
                  left: `${item.position.x}px`,
                  top: `${item.position.y}px`,
                  transform: draggedIcon === item.id ? 'scale(1.1)' : 'scale(1)',
                  transition: draggedIcon === item.id ? 'none' : 'transform 0.2s ease'
                }}
                onClick={() => setActiveIcon(activeIcon === item.id ? null : item.id)}
                onMouseDown={(e) => handleMouseDown(e, item.id, false)}
              >
                <div className="w-12 h-12 bg-white/80 rounded-lg shadow-sm flex items-center justify-center group-hover:bg-white transition-colors">
                  <IconComponent className="w-6 h-6 text-gray-700" />
                </div>
                <span className="text-xs text-gray-700 mt-1 text-center leading-tight max-w-16">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative">
          {/* Central Isometric Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Isometric blocks representing PostHog features */}
              <div className="relative w-96 h-96">
                {/* Base platform */}
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 transform rotate-45 skew-x-12 skew-y-12 rounded-lg shadow-lg"></div>
                
                {/* Analytics block */}
                <div className="absolute bottom-16 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45 skew-x-12 skew-y-12 rounded-lg shadow-lg"></div>
                
                {/* Feature flags block */}
                <div className="absolute bottom-8 right-1/2 w-28 h-28 bg-gradient-to-br from-purple-400 to-purple-600 transform rotate-45 skew-x-12 skew-y-12 rounded-lg shadow-lg"></div>
                
                {/* Session recording block */}
                <div className="absolute bottom-24 right-1/4 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 transform rotate-45 skew-x-12 skew-y-12 rounded-lg shadow-lg"></div>
                
                {/* Central tower/building */}
                <div className="absolute bottom-12 right-1/3 w-16 h-32 bg-gradient-to-b from-amber-600 to-amber-800 transform skew-x-12 rounded-t-lg shadow-xl"></div>
                
                {/* Characters/avatars */}
                <div className="absolute bottom-4 right-1/4 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-md"></div>
                <div className="absolute bottom-6 right-1/2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full shadow-md"></div>
                
                {/* Trees/decorative elements */}
                <div className="absolute bottom-8 right-1/5 w-6 h-12 bg-gradient-to-b from-green-300 to-green-500 rounded-full shadow-sm"></div>
                <div className="absolute bottom-4 right-2/3 w-4 h-8 bg-gradient-to-b from-green-300 to-green-500 rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar with Additional Icons */}
        <div className="w-20 bg-transparent p-2 relative pt-8">
          {rightIcons.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`absolute flex flex-col items-center cursor-pointer group ${
                  activeIcon === item.id ? 'bg-blue-100/50 rounded-lg p-2' : 'p-2'
                } ${draggedIcon === item.id ? 'z-50 opacity-80' : 'z-10'}`}
                style={{
                  left: `${item.position.x}px`,
                  top: `${item.position.y}px`,
                  transform: draggedIcon === item.id ? 'scale(1.1)' : 'scale(1)',
                  transition: draggedIcon === item.id ? 'none' : 'transform 0.2s ease'
                }}
                onClick={() => setActiveIcon(activeIcon === item.id ? null : item.id)}
                onMouseDown={(e) => handleMouseDown(e, item.id, true)}
              >
                <div className="w-12 h-12 bg-white/80 rounded-lg shadow-sm flex items-center justify-center group-hover:bg-white transition-colors">
                  <IconComponent className="w-6 h-6 text-gray-700" />
                </div>
                <span className="text-xs text-gray-700 mt-1 text-center leading-tight max-w-16">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-orange-100/30 to-yellow-200/30"></div>
      </div>
    </div>
  );
}

export default App;