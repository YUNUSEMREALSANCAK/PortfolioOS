import React, { useState, useCallback } from 'react';
import { 
  User, 
  Folder, 
  GraduationCap, 
  Award, 
  Rocket, 
  Mail,
  Instagram,
  Linkedin,
  Github,
  Monitor,
  Trash2,
  Target,
  Star,
  BarChart,
  Code,
  Brain,
  Leaf,
  Wallet,
  Briefcase,
  Calendar,
  Building2,
  MapPin
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
  isSelected: boolean;
  isDoubleClicked: boolean;
}

interface WindowState {
  id: string;
  title: string;
  content: string | JSX.Element;
  iconPosition: IconPosition;
  position: IconPosition;
  size: { width: number; height: number };
  isOpen: boolean;
  isMinimized: boolean;
  isAnimating: boolean;
  animationType: 'opening' | 'closing' | 'minimizing' | 'restoring' | null;
  zIndex: number;
  isDragging: boolean;
  isResizing: boolean;
}

function App() {
  console.log('App component is rendering...');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [windowDragOffset, setWindowDragOffset] = useState({ x: 0, y: 0 });
  const [resizingWindow, setResizingWindow] = useState<string | null>(null);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 });
  const [isDragInProgress, setIsDragInProgress] = useState(false);
  const [recycleBinItems] = useState([
    { id: 'plantcareapp', name: 'PlantcareApp', icon: Folder, link: 'https://github.com/YUNUSEMREALSANCAK/Plantcareapp' },
    { id: 'signlanguageapp', name: 'Sign_language_learning_app', icon: Folder, link: 'https://github.com/YUNUSEMREALSANCAK/sign-language-learning-app-with-object-detection-and-deep-learning' },
    { id: 'spendingtrackapp', name: 'SpendingTrackApp', icon: Folder, link: 'https://github.com/YUNUSEMREALSANCAK/spending-tracking-app-harcama-takip-uygulamas-' }
  ]);

  // Grid configuration - increased spacing
  const ICON_WIDTH = 80; // Horizontal spacing between icons
  const ICON_HEIGHT = 90; // Vertical spacing between icons (more space for text)
  const GRID_COLS = 2; // Number of columns
  const GRID_START_X = 10; // Starting X position
  const GRID_START_Y = 60; // Starting Y position - moved down from 30

  // Calculate grid positions automatically with proper spacing
  const calculateGridPosition = (index: number) => {
    const col = index % GRID_COLS;
    const row = Math.floor(index / GRID_COLS);
    return {
      x: GRID_START_X + (col * ICON_WIDTH),
      y: GRID_START_Y + (row * ICON_HEIGHT)
    };
  };

  const [leftIcons, setLeftIcons] = useState<DesktopIcon[]>([
    // Personal portfolio icons
    { id: 'about', name: 'Ben kimim', icon: User, position: calculateGridPosition(0), isSelected: false, isDoubleClicked: false },
    { id: 'projects', name: 'Projelerim klasörü', icon: Folder, position: calculateGridPosition(1), isSelected: false, isDoubleClicked: false },
    { id: 'education', name: 'Eğitim', icon: GraduationCap, position: calculateGridPosition(2), isSelected: false, isDoubleClicked: false },
    { id: 'experience', name: 'Deneyimlerim', icon: Award, position: calculateGridPosition(3), isSelected: false, isDoubleClicked: false },
    { id: 'startup', name: 'Main Startup', icon: Rocket, position: calculateGridPosition(4), isSelected: false, isDoubleClicked: false },
    // System folders
    { id: 'thispc', name: 'This PC', icon: Monitor, position: calculateGridPosition(5), isSelected: false, isDoubleClicked: false },
    { id: 'recyclebin', name: 'Recycle Bin', icon: Trash2, position: calculateGridPosition(6), isSelected: false, isDoubleClicked: false },
    // Social media contact icons
    { id: 'instagram', name: 'Instagram', icon: Instagram, position: calculateGridPosition(7), isSelected: false, isDoubleClicked: false },
    { id: 'github', name: 'GitHub', icon: Github, position: calculateGridPosition(8), isSelected: false, isDoubleClicked: false },
    { id: 'email', name: 'Email', icon: Mail, position: calculateGridPosition(9), isSelected: false, isDoubleClicked: false },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, position: calculateGridPosition(10), isSelected: false, isDoubleClicked: false },
  ]);

  const [rightIcons, setRightIcons] = useState<DesktopIcon[]>([
    // Right side is now empty
  ]);

  // Desktop-like icon behavior functions
  // MacOS-style window management functions
  const openWindow = useCallback((iconId: string, iconPosition: IconPosition) => {
    const windowContent = getWindowContent(iconId);
    
    // Calculate center position for the window
    const windowWidth = 1000; // Increased from 900
    const windowHeight = 700; // Increased from 650
    const centerX = window.innerWidth / 2 - windowWidth / 2;
    const centerY = window.innerHeight / 2 - windowHeight / 2;
    
    const newWindow: WindowState = {
      id: iconId,
      title: windowContent.title,
      content: windowContent.content,
      iconPosition,
      position: { x: centerX, y: centerY },
      size: { width: windowWidth, height: windowHeight },
      isOpen: false,
      isMinimized: false,
      isAnimating: true,
      animationType: 'opening',
      zIndex: nextZIndex,
      isDragging: false,
      isResizing: false
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);

    // Start opening animation with proper timing
    setTimeout(() => {
      setOpenWindows(prev => 
        prev.map(window => 
          window.id === iconId 
            ? { ...window, isOpen: true }
            : window
        )
      );
    }, 50);

    // End animation after it completes
    setTimeout(() => {
      setOpenWindows(prev => 
        prev.map(window => 
          window.id === iconId 
            ? { ...window, isAnimating: false, animationType: null }
            : window
        )
      );
    }, 550);
  }, [nextZIndex]);

  const minimizeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => 
      prev.map(window => 
        window.id === windowId 
          ? { ...window, isMinimized: true, isAnimating: true, animationType: 'minimizing' }
          : window
      )
    );

    setTimeout(() => {
      setOpenWindows(prev => 
        prev.map(window => 
          window.id === windowId 
            ? { ...window, isAnimating: false, animationType: null }
            : window
        )
      );
    }, 500);
  }, []);

  const restoreWindow = useCallback((windowId: string) => {
    console.log(`Restoring window: ${windowId}`);
    
    // Start restore animation - window should start minimized and animate to restored
    setOpenWindows(prev => 
      prev.map(window => 
        window.id === windowId 
          ? { 
              ...window, 
              isAnimating: true, 
              animationType: 'restoring',
              zIndex: nextZIndex,
              isMinimized: true // Start as minimized for animation
            }
          : window
      )
    );
    setNextZIndex(prev => prev + 1);

    // Then start restoring after brief delay
    setTimeout(() => {
      setOpenWindows(prev => 
        prev.map(window => 
          window.id === windowId 
            ? { ...window, isMinimized: false }
            : window
        )
      );
    }, 50);

    // End animation
    setTimeout(() => {
      setOpenWindows(prev => 
        prev.map(window => 
          window.id === windowId 
            ? { ...window, isAnimating: false, animationType: null }
            : window
        )
      );
    }, 550);
  }, [nextZIndex]);

  const closeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => 
      prev.map(window => 
        window.id === windowId 
          ? { ...window, isAnimating: true, animationType: 'closing' }
          : window
      )
    );

    setTimeout(() => {
      setOpenWindows(prev => prev.filter(window => window.id !== windowId));
    }, 500);
  }, []);

  const getWindowContent = (iconId: string) => {
    const contents: Record<string, {title: string, content: string | JSX.Element}> = {
      about: { 
        title: '', 
        content: (
          <div className="space-y-8">
            <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <User className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-300">Hakkımda</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Ben Yunus Emre ALSANCAK, Mühendis ve Geliştiriciyim, Ayrıca Sportif aktiviteleri seviyorum.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-300">•</span>
                  <p className="text-gray-300">Full Stack Developer</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-300">•</span>
                  <p className="text-gray-300">AI Integrated Technologies</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Code className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-purple-300">Yetenekler</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 bg-purple-500/10 rounded-lg p-2">
                  <span className="text-purple-300">•</span>
                  <span className="text-gray-300">Python</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-500/10 rounded-lg p-2">
                  <span className="text-purple-300">•</span>
                  <span className="text-gray-300">YOLO</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-500/10 rounded-lg p-2">
                  <span className="text-purple-300">•</span>
                  <span className="text-gray-300">TensorFlow</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-500/10 rounded-lg p-2">
                  <span className="text-purple-300">•</span>
                  <span className="text-gray-300">Dart</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-500/10 rounded-lg p-2">
                  <span className="text-purple-300">•</span>
                  <span className="text-gray-300">Flutter</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-500/10 rounded-lg p-2">
                  <span className="text-purple-300">•</span>
                  <span className="text-gray-300">Next.js</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-500/10 rounded-lg p-2">
                  <span className="text-purple-300">•</span>
                  <span className="text-gray-300">Firebase</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-500/10 rounded-lg p-2">
                  <span className="text-purple-300">•</span>
                  <span className="text-gray-300">Supabase</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      projects: { 
        title: 'Projelerim', 
        content: (
          <div className="space-y-8">
            <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Code className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-300">Öne Çıkan Projelerim</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div 
                  onClick={() => window.open('https://github.com/YUNUSEMREALSANCAK/sign-language-interpreter-with-object-dedection', '_blank')}
                  className="p-6 rounded-xl border cursor-pointer transition-all hover:scale-90 hover:shadow-lg backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="font-bold text-lg text-purple-300">İşaret Dili Tercümanı</h4>
                  </div>
                  <p className="text-gray-300">YOLOv8 ile en çok kullanılan işaret dili kelimelerinin tanımlanması</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">Python</div>
                    <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">AI</div>
                  </div>
                </div>

                <div 
                  onClick={() => window.open('https://github.com/YUNUSEMREALSANCAK/Alzheimer-s-Disease-Predictionn', '_blank')}
                  className="p-6 rounded-xl border cursor-pointer transition-all hover:scale-90 hover:shadow-lg backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="font-bold text-lg text-green-300">Alzheimer Tahmin Modeli</h4>
                  </div>
                  <p className="text-gray-300">Yapay zeka ile Alzheimer hastalığı tahmin modeli</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">Jupyter</div>
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">ML</div>
                  </div>
                </div>

                <div 
                  onClick={() => window.open('https://github.com/YUNUSEMREALSANCAK/Plantcareapp', '_blank')}
                  className="p-6 rounded-xl border cursor-pointer transition-all hover:scale-90 hover:shadow-lg backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="font-bold text-lg text-blue-300">Plant Care App</h4>
                  </div>
                  <p className="text-gray-300">Bitki bakım ve takip uygulaması</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">Dart</div>
                    <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">Flutter</div>
                  </div>
                </div>

                <div 
                  onClick={() => window.open('https://github.com/YUNUSEMREALSANCAK/spending-tracking-app-harcama-takip-uygulamas-', '_blank')}
                  className="p-6 rounded-xl border cursor-pointer transition-all hover:scale-90 hover:shadow-lg backdrop-blur-sm bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/30"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-orange-400" />
                    </div>
                    <h4 className="font-bold text-lg text-orange-300">Bütçe Takip Uygulaması</h4>
                  </div>
                  <p className="text-gray-300">Kişisel harcama ve bütçe yönetimi uygulaması</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm">Dart</div>
                    <div className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm">Mobile</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      education: { 
        title: 'Eğitim', 
        content: (
          <div className="space-y-8">
            <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-300">Üniversite Eğitimi</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                2021-2025 yılları arasında Selçuk Üniversitesi Bilgisayar Mühendisliği bölümünden başarıyla mezun oldum.
              </p>
            </div>

            <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Rocket className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-purple-300">İlgi Alanları</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Üniversite yıllarımda savunma teknolojileri ve yapay zeka alanlarına özel ilgi duydum. SAVTEK (Savunma Teknolojileri Topluluğu) üyesi olarak çeşitli projelerde aktif rol aldım.
              </p>
            </div>

            <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Award className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-300">Yarışma Deneyimleri</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                İHA teknolojileri alanında düzenlenen yarışmalarda yer aldım - Sabit Kanat İHA ve Savaşan İHA kategorilerinde gerçek zamanlı nesne algılama ve görüntü işleme projeleri geliştirdim. Bu süreçte edindiğim deneyimler, problem çözme becerilerimi ve teknik uzmanlığımı önemli ölçüde geliştirdi.
              </p>
            </div>
          </div>
        )
      },
      experience: { 
        title: 'Deneyimlerim', 
        content: (
          <div className="space-y-8">
            <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-300">İş Deneyimleri</h3>
              </div>
              <div className="space-y-6">
                <div 
                  onClick={() => window.open('https://www.linkedin.com/in/yunus-emre-alsancak-95475a21b/', '_blank')}
                  className="p-6 rounded-xl border cursor-pointer transition-all hover:scale-95 hover:shadow-lg backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-purple-300">Intern</h4>
                      <p className="text-sm text-gray-400">FLO Group · Stajyer</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Ağustos 2025 - Eylül 2025 · 2 ay</span>
                  </div>
                </div>

                <div 
                  onClick={() => window.open('https://www.linkedin.com/in/yunus-emre-alsancak-95475a21b/', '_blank')}
                  className="p-6 rounded-xl border cursor-pointer transition-all hover:scale-95 hover:shadow-lg backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Code className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-green-300">Bilgi İşlem Programcısı</h4>
                      <p className="text-sm text-gray-400">Eti Maden · Stajyer</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-2">Mühendislik, Ağ Yönetimi</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Temmuz 2024 - Ağustos 2024 · 2 ay</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>Bandırma, Balıkesir, Türkiye · Ofisten</span>
                  </div>
                </div>

                <div 
                  onClick={() => window.open('https://www.linkedin.com/in/yunus-emre-alsancak-95475a21b/', '_blank')}
                  className="p-6 rounded-xl border cursor-pointer transition-all hover:scale-95 hover:shadow-lg backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-blue-300">Bilgisayar Mühendisi</h4>
                      <p className="text-sm text-gray-400">Selçuk Üniversitesi · Yarı zamanlı</p>
                      <p className="text-sm text-gray-400">Araştırma Laboratuvarı Görevlisi</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-2">Z-Tree ve İstatistiksel Veri Analizi</p>
                  <p className="text-gray-300 mb-2">Davranışsal ve Deneysel Araştırmalar Laboratuvarı</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Kasım 2023 - Haziran 2024 · 8 ay</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>Konya, Türkiye · Ofisten</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      startup: { 
        title: 'Main Startup', 
        content: (
          <div className="space-y-8">
            <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Target className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-300">Temel Hedefimiz</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Fitness koçlarının online koçluk hizmetlerini hızlı ve basit bir şekilde yönetmelerine olanak sağlamaktır. Bu sayede koçlar, müşterileriyle daha etkili iletişim kurabilir ve hizmet kalitelerini artırabilirler.
              </p>
            </div>

            <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Star className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-purple-300">Biz Neden Farklıyız?</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Kişisel online koçluk hizmetleri genellikle oldukça pahalıdır ve sonuçtan memnun kalmadığınız takdirde ciddi bir maddi kayba yol açabilir. Biz ise fitness koçlarımıza aylık üyelikleri uygun fiyatlarla sunarak, kolay erişilebilir bir hizmet modeli geliştiriyoruz.
              </p>
            </div>

            <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <BarChart className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-300">Sürekli Gelişim</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Geri bildirimlerinizi her ay düzenli olarak değerlendirerek kendimizi sürekli geliştiriyor ve hizmet kalitemizi artırıyoruz. Bu yaklaşımımızla, hem koçların hem de müşterilerin memnuniyetini en üst seviyede tutmayı hedefliyoruz.
              </p>
            </div>
          </div>
        )
      },
      thispc: { title: 'This PC', content: 'Bilgisayar dosyalarına ve sistem bilgilerine erişim.' },
      recyclebin: { title: 'Recycle Bin', content: 'Silinen dosyalar ve projeler burada saklanır.' },
      instagram: { title: 'Instagram', content: 'Instagram profilime buradan ulaşabilirsiniz.' },
      github: { title: 'GitHub', content: 'GitHub profilim ve açık kaynak projelerim.' },
      email: { title: 'Email', content: 'Benimle email(yunusemrealsancak@gmail.com.tr) üzerinden iletişime geçin.' },
      linkedin: { title: 'LinkedIn', content: 'LinkedIn profilim ve profesyonel ağım.' }
    };
    return contents[iconId] || { title: 'Bilinmeyen', content: 'İçerik bulunamadı.' };
  };

  const handleIconDoubleClick = useCallback((iconId: string, isRightSide: boolean) => {
    console.log(`Double clicked on ${iconId}`);
    
    // Special handling for social media links - redirect to external URLs
    if (iconId === 'linkedin') {
      window.open('https://www.linkedin.com/in/yunus-emre-alsancak-95475a21b/', '_blank');
      return;
    }
    
    if (iconId === 'instagram') {
      window.open('https://www.instagram.com/yunus.emre.alsancak/', '_blank');
      return;
    }
    
    if (iconId === 'github') {
      window.open('https://github.com/YUNUSEMREALSANCAK', '_blank');
      return;
    }
    
    // Get icon position for animation
    const icons = isRightSide ? rightIcons : leftIcons;
    const icon = icons.find(i => i.id === iconId);
    if (!icon) return;

    // Check if window is already open
    const existingWindow = openWindows.find(w => w.id === iconId);
    if (existingWindow) {
      // If window exists, bring to front or close
      if (existingWindow.isOpen) {
        closeWindow(iconId);
      } else {
        // Bring to front
        setOpenWindows(prev => 
          prev.map(window => 
            window.id === iconId 
              ? { ...window, zIndex: nextZIndex }
              : window
          )
        );
        setNextZIndex(prev => prev + 1);
      }
    } else {
      // Open new window
      openWindow(iconId, icon.position);
    }
    
    // Update icon state for double click feedback
    const updateIcons = (icons: DesktopIcon[]) => 
      icons.map(icon => ({
        ...icon,
        isSelected: icon.id === iconId ? false : false,
        isDoubleClicked: icon.id === iconId ? true : false
      }));

    if (isRightSide) {
      setRightIcons(prevIcons => updateIcons(prevIcons));
    } else {
      setLeftIcons(prevIcons => updateIcons(prevIcons));
    }
    
    // Clear double click state
    setTimeout(() => {
      const clearIcons = (icons: DesktopIcon[]) => 
        icons.map(icon => ({
          ...icon,
          isDoubleClicked: false
        }));

      if (isRightSide) {
        setRightIcons(prevIcons => clearIcons(prevIcons));
      } else {
        setLeftIcons(prevIcons => clearIcons(prevIcons));
      }
    }, 200);
  }, [openWindows, nextZIndex, openWindow, closeWindow, rightIcons, leftIcons]);

  const handleIconClick = useCallback((iconId: string, isRightSide: boolean) => {
    // Don't process click if drag is in progress or was recently in progress
    if (draggedIcon || isDragInProgress) return;
    
    // If this icon is already selected, this might be a double click
    if (selectedIcon === iconId) {
      handleIconDoubleClick(iconId, isRightSide);
      return;
    }

    // Single click - select the icon
    setSelectedIcon(iconId);
    
    // Update icon selection
    const updateIcons = (icons: DesktopIcon[]) => 
      icons.map(icon => ({
        ...icon,
        isSelected: icon.id === iconId ? true : false,
        isDoubleClicked: false
      }));

    if (isRightSide) {
      setRightIcons(prevIcons => updateIcons(prevIcons));
    } else {
      setLeftIcons(prevIcons => updateIcons(prevIcons));
    }
  }, [selectedIcon, draggedIcon, isDragInProgress, handleIconDoubleClick]);


  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    // If clicking on empty desktop area, deselect all icons
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
      setLeftIcons(prevIcons => prevIcons.map(icon => ({ ...icon, isSelected: false, isDoubleClicked: false })));
      setRightIcons(prevIcons => prevIcons.map(icon => ({ ...icon, isSelected: false, isDoubleClicked: false })));
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent, iconId: string, isRightSide: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Start drag only after a delay (to distinguish from click)
    const dragStartDelay = setTimeout(() => {
      setDraggedIcon(iconId);
      setIsDragInProgress(true);
      
      const icons = isRightSide ? rightIcons : leftIcons;
      const icon = icons.find(i => i.id === iconId);
      if (icon) {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }, 150); // 150ms delay before drag starts

    // Store the timeout so we can cancel it on mouseup
    setClickTimeout(dragStartDelay);
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
    // Cancel drag timeout if mouse is released before drag starts
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    
    // Only reset drag state, don't trigger any click actions
    setDraggedIcon(null);
    setDragOffset({ x: 0, y: 0 });
    
    // Reset drag progress flag after a short delay to prevent accidental clicks
    if (isDragInProgress) {
      setTimeout(() => {
        setIsDragInProgress(false);
      }, 100);
    }
  };

  // Window dragging handlers
  const handleWindowMouseDown = useCallback((e: React.MouseEvent, windowId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const window = openWindows.find(w => w.id === windowId);
    if (!window) return;
    
    setDraggedWindow(windowId);
    setWindowDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y
    });
    
    // Bring window to front
    setOpenWindows(prev => 
      prev.map(w => 
        w.id === windowId 
          ? { ...w, zIndex: nextZIndex, isDragging: true }
          : w
      )
    );
    setNextZIndex(prev => prev + 1);
  }, [openWindows, nextZIndex]);

  const handleWindowMouseMove = useCallback((e: React.MouseEvent) => {
    if (draggedWindow) {
      const newX = e.clientX - windowDragOffset.x;
      const newY = e.clientY - windowDragOffset.y;
      
      setOpenWindows(prev => 
        prev.map(window => 
          window.id === draggedWindow 
            ? { ...window, position: { x: Math.max(0, newX), y: Math.max(0, newY) } }
            : window
        )
      );
    }
    
    if (resizingWindow) {
      const window = openWindows.find(w => w.id === resizingWindow);
      if (!window) return;
      
      const deltaX = e.clientX - resizeStartPos.x;
      const deltaY = e.clientY - resizeStartPos.y;
      
      const newWidth = Math.max(400, resizeStartSize.width + deltaX);
      const newHeight = Math.max(300, resizeStartSize.height + deltaY);
      
      setOpenWindows(prev => 
        prev.map(w => 
          w.id === resizingWindow 
            ? { ...w, size: { width: newWidth, height: newHeight } }
            : w
        )
      );
    }
  }, [draggedWindow, windowDragOffset, resizingWindow, resizeStartPos, resizeStartSize, openWindows]);

  const handleWindowMouseUp = useCallback(() => {
    if (draggedWindow) {
      setOpenWindows(prev => 
        prev.map(window => 
          window.id === draggedWindow 
            ? { ...window, isDragging: false }
            : window
        )
      );
      setDraggedWindow(null);
      setWindowDragOffset({ x: 0, y: 0 });
    }
    
    if (resizingWindow) {
      setOpenWindows(prev => 
        prev.map(window => 
          window.id === resizingWindow 
            ? { ...window, isResizing: false }
            : window
        )
      );
      setResizingWindow(null);
    }
  }, [draggedWindow, resizingWindow]);

  // Window resizing handlers
  const handleResizeMouseDown = useCallback((e: React.MouseEvent, windowId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const window = openWindows.find(w => w.id === windowId);
    if (!window) return;
    
    setResizingWindow(windowId);
    setResizeStartPos({ x: e.clientX, y: e.clientY });
    setResizeStartSize({ width: window.size.width, height: window.size.height });
    
    setOpenWindows(prev => 
      prev.map(w => 
        w.id === windowId 
          ? { ...w, isResizing: true }
          : w
      )
    );
    }, [openWindows]);

  const themeClasses = "dark h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden select-none fixed inset-0";

  return (
    <div 
      className={themeClasses}
      onMouseMove={(e) => {
        handleMouseMove(e);
        handleWindowMouseMove(e);
      }}
      onMouseUp={() => {
        handleMouseUp();
        handleWindowMouseUp();
      }}
      onMouseLeave={() => {
        handleMouseUp();
        handleWindowMouseUp();
      }}
      onClick={handleDesktopClick}
    >

      {/* Desktop Interface */}
      <div className="flex h-full">
        {/* Left Sidebar with Desktop Icons */}
        <div className="w-48 bg-transparent p-4 relative pt-12 overflow-visible">
          {leftIcons.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`absolute w-20 flex flex-col items-center cursor-pointer group transition-all duration-200 ${
                  item.isSelected 
                    ? 'bg-blue-500/30 border border-blue-400/50 rounded-lg pt-3 px-2 pb-2' 
                    : 'pt-3 px-2 pb-2 rounded-lg hover:bg-gray-700/30'
                } ${
                  item.isDoubleClicked 
                    ? 'scale-110 bg-blue-400/50' 
                    : ''
                } ${
                  draggedIcon === item.id 
                    ? 'z-[9999] opacity-90 scale-105' 
                    : 'z-10'
                }`}
                style={{
                  left: `${item.position.x}px`,
                  top: `${item.position.y}px`,
                  transition: draggedIcon === item.id ? 'none' : 'all 0.2s ease'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(item.id, false);
                }}
                onMouseDown={(e) => handleMouseDown(e, item.id, false)}
              >
                <div className={`w-12 h-12 rounded-lg shadow-sm flex items-center justify-center transition-all duration-200 ${
                  item.isSelected 
                    ? 'bg-gray-700/90 border border-blue-400/30' 
                    : 'bg-gray-800/80 group-hover:bg-gray-700'
                } ${
                  item.isDoubleClicked 
                    ? 'bg-blue-600/50' 
                    : ''
                }`}>
                  <IconComponent className={`w-6 h-6 transition-colors duration-200 ${
                    item.isSelected 
                      ? 'text-blue-300' 
                      : 'text-gray-300 group-hover:text-white'
                  }`} />
                </div>
                <span className={`text-xs mt-1 text-center leading-tight w-full transition-colors duration-200 ${
                  item.isSelected 
                    ? 'text-blue-200' 
                    : 'text-gray-300 group-hover:text-white'
                }`}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative">
          {/* Empty main content area */}
        </div>
      </div>

      {/* CENTERED TEXT - Fixed positioning for perfect center */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-5">
        <div className="text-center">
          <h1 className="text-8xl font-light mb-8 leading-tight py-6 tracking-wider text-blue-400/90"
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 300,
                textShadow: '0 4px 16px rgba(96, 165, 250, 0.3)',
                letterSpacing: '0.03em'
              }}>
            HOŞGELDİNİZ
          </h1>
          <p className="text-4xl mb-6 font-semibold tracking-wide text-green-400/90" 
             style={{ 
               fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
               textShadow: '0 2px 8px rgba(74, 222, 128, 0.2)',
               letterSpacing: '0.02em'
             }}>
            Yunus Emre ALSANCAK
          </p>
          <div className="space-y-3 text-cyan-300/90">
            <p className="text-3xl font-medium tracking-wide"
               style={{
                 fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                 letterSpacing: '0.02em',
                 textShadow: '0 2px 8px rgba(34, 211, 238, 0.2)'
               }}>
              WebOS
            </p>
            <p className="text-lg font-normal text-gray-300/90" 
               style={{ 
                 fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                 letterSpacing: '0.01em'
               }}>
              Klasörlere tıklayarak keşfedin
            </p>
          </div>
          </div>
        </div>

      {/* MacOS-style Bottom Taskbar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="backdrop-blur-md rounded-2xl px-4 py-2 shadow-2xl border bg-gray-800/90 border-gray-700/50">
          <div className="flex items-center space-x-3">
            {openWindows.map((window) => {
              // Find the original icon for this window
              const originalIcon = leftIcons.find(icon => icon.id === window.id);
              const IconComponent = originalIcon?.icon;
              
              return (
                <button
                  key={window.id}
                  onClick={() => window.isMinimized ? restoreWindow(window.id) : minimizeWindow(window.id)}
                  className={`w-12 h-12 rounded-xl transition-all duration-300 ${
                    window.isMinimized 
                      ? 'bg-gray-700/50 scale-90 opacity-70' 
                      : 'bg-gray-600/80 scale-100 shadow-lg'
                  } hover:bg-gray-500/80 hover:scale-110`}
                  title={window.title}
                >
                  <div className="w-full h-full rounded-xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                    {IconComponent ? (
                      <IconComponent className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-xs font-medium text-white">
                        {window.title.charAt(0)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
              </div>
        </div>
      </div>

      {/* Windows with MacOS-style animations */}
      {openWindows.map((window) => {
        // Don't render minimized windows unless they're animating
        if (window.isMinimized && !window.isAnimating) return null;
        
            return (
              <div
            key={window.id}
            className="fixed"
                style={{
              zIndex: window.zIndex,
              left: window.isAnimating ? '50%' : `${window.position.x}px`,
              top: window.isAnimating ? '50%' : `${window.position.y}px`,
              width: `${window.size.width}px`,
              height: `${window.size.height}px`,
            transform: window.isAnimating
              ? window.animationType === 'opening'
                ? !window.isOpen 
                  ? `translate(${window.iconPosition.x - window.size.width/2}px, ${window.iconPosition.y - window.size.height/2}px) scale(0.1)`
                  : 'translate(-50%, -50%) scale(1)'
                : window.animationType === 'closing'
                ? `translate(${window.iconPosition.x - window.size.width/2}px, ${window.iconPosition.y - window.size.height/2}px) scale(0.1)`
                : window.animationType === 'minimizing'
                ? `translate(-50%, 200px) scale(0.2)`
                : window.animationType === 'restoring'
                ? window.isMinimized 
                  ? `translate(-50%, 150px) scale(0.3)`
                  : 'translate(-50%, -50%) scale(1)'
                : 'translate(-50%, -50%) scale(1)'
              : 'none',
              opacity: window.isAnimating 
              ? window.animationType === 'opening'
                ? window.isOpen ? 1 : 0
                : window.animationType === 'restoring'
                ? window.isMinimized ? 0 : 1
                : window.animationType === 'closing' || window.animationType === 'minimizing'
                ? 0
                : 1
              : 1,
              transition: window.isAnimating 
                ? 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                : 'none',
              display: window.isMinimized && !window.isAnimating ? 'none' : 'block',
              cursor: window.isDragging ? 'grabbing' : 'default'
            }}
          >
          <div className="rounded-2xl shadow-2xl border h-full flex flex-col overflow-hidden backdrop-blur-sm relative bg-gradient-to-br from-gray-900 to-gray-800 border-gray-600/50">
            {/* Modern Title Bar */}
            <div 
              className="px-6 py-4 flex items-center justify-between border-b select-none backdrop-blur-md cursor-grab active:cursor-grabbing bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-gray-600/30"
              onMouseDown={(e) => handleWindowMouseDown(e, window.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm">📁</span>
                  </div>
                  <h3 className="font-semibold text-lg text-white">{window.title}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Minimizing window: ${window.id}`);
                    minimizeWindow(window.id);
                  }}
                  className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-lg flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
                  title="Minimize"
                >
                  <span className="text-gray-800 text-sm font-bold">−</span>
                </button>
                <button 
                  onClick={() => closeWindow(window.id)}
                  className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
                  title="Close"
                >
                  <span className="text-white text-sm font-bold">×</span>
                </button>
        </div>
      </div>

            {/* Window Content */}
            <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-4 text-white">{window.title}</h2>
                <p className="text-xl leading-relaxed text-gray-200">{window.content}</p>
                
                {/* Sample content based on window type */}
                
                

                {window.id === 'recyclebin' && (
                  <div className="space-y-6 mt-8">
                    <div className="p-4 rounded-xl border bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
                      <h3 className="font-bold text-lg mb-3 text-red-300">🗑️ Silinen Projeler</h3>
                      <p className="text-sm mb-4 text-gray-400">Aşağıdaki projeler geri dönüştürülmeyi bekliyor. Çift tıklayarak GitHub'da görüntüleyebilirsiniz.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-6">
                      {recycleBinItems.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <div 
                            key={item.id}
                            className="p-4 rounded-xl border cursor-pointer transition-all hover:shadow-lg bg-gradient-to-br from-gray-700/30 to-gray-800/30 border-gray-600/30 hover:border-blue-500/50"
                            onClick={() => globalThis.open(item.link, '_blank')}
                            onDoubleClick={() => globalThis.open(item.link, '_blank')}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-600/50">
                                <ItemIcon className="w-5 h-5 text-gray-300" />
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{item.name}</h4>
                                <p className="text-sm text-gray-400">GitHub Repository</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {window.id === 'thispc' && (
                  <div className="space-y-6 mt-8">
                    <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
                      <h3 className="font-bold text-lg mb-3 text-blue-300">💻 Sistem Bilgileri</h3>
                      <div className="space-y-2">
                        <p className="leading-relaxed text-gray-300"><strong>İşletim Sistemi:</strong> WebOS v1.0</p>
                        <p className="leading-relaxed text-gray-300"><strong>Kullanıcı:</strong> Yunus Emre ALSANCAK</p>
                        <p className="leading-relaxed text-gray-300"><strong>Tema:</strong> Koyu Tema</p>
                      </div>
                    </div>
                    <div className="p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
                      <h3 className="font-bold text-lg mb-3 text-green-300">📊 Dosya Sistemi</h3>
                      <div className="space-y-2">
                        <p className="leading-relaxed text-gray-300"><strong>Portfolio Klasörleri:</strong> 5 adet</p>
                        <p className="leading-relaxed text-gray-300"><strong>İletişim Platformları:</strong> 4 adet</p>
                        <p className="leading-relaxed text-gray-300"><strong>Sistem Klasörleri:</strong> 2 adet</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Resize Handle */}
            <div 
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize transition-colors bg-gray-600/50 hover:bg-gray-500/70"
              onMouseDown={(e) => handleResizeMouseDown(e, window.id)}
              style={{
                clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)',
              }}
            />
          </div>
      </div>
        );
      })}
    </div>
  );
}

export default App;