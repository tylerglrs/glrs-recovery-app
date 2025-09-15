'use client';

import React, { useState, useEffect } from 'react';

// Component definitions
const Card = ({ children, className }) => <div className={`rounded-lg border bg-white shadow-sm ${className || ''}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="p-6 pb-0">{children}</div>;
const CardContent = ({ children, className }) => <div className={`p-6 ${className || ''}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={`text-xl font-semibold ${className || ''}`}>{children}</h3>;
const CardDescription = ({ children }) => <p className="text-sm text-gray-600">{children}</p>;
const Button = ({ children, onClick, className, variant = 'default', size = 'default' }) => {
  const baseClass = 'rounded-md font-medium transition-colors';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 hover:bg-gray-100',
    ghost: 'hover:bg-gray-100'
  };
  const sizes = {
    default: 'px-4 py-2',
    sm: 'px-3 py-1 text-sm'
  };
  return <button onClick={onClick} className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className || ''}`}>{children}</button>;
};
const Input = ({ ...props }) => <input className="w-full rounded-md border px-3 py-2" {...props} />;
const Label = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">{children}</label>;
const Textarea = ({ ...props }) => <textarea className="w-full rounded-md border px-3 py-2" {...props} />;
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    outline: 'border border-gray-300'
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}>{children}</span>;
};
const Alert = ({ children }) => <div className="rounded-lg border p-4 bg-blue-50">{children}</div>;
const AlertDescription = ({ children }) => <p className="text-sm">{children}</p>;
const Tabs = ({ children, value, onValueChange }) => {
  return <div>{React.Children.map(children, child => 
    React.cloneElement(child, { activeTab: value, onTabChange: onValueChange })
  )}</div>;
};
const TabsList = ({ children, className, activeTab, onTabChange }) => {
  return <div className={className}>{React.Children.map(children, child =>
    React.cloneElement(child, { activeTab, onTabChange })
  )}</div>;
};
const TabsTrigger = ({ children, value, className, activeTab, onTabChange }) => {
  return <button onClick={() => onTabChange(value)} className={`${className} ${activeTab === value ? 'bg-white' : 'bg-gray-100'}`}>{children}</button>;
};
const TabsContent = ({ children, value, activeTab }) => {
  return activeTab === value ? <div>{children}</div> : null;
};
const Avatar = ({ children, className }) => <div className={`rounded-full bg-gray-200 flex items-center justify-center ${className}`}>{children}</div>;
const AvatarFallback = ({ children }) => <span>{children}</span>;
const AvatarImage = () => null;
const Slider = ({ value, onValueChange, max = 100, step = 1, className }) => {
  return <input type="range" value={value[0]} onChange={e => onValueChange([parseInt(e.target.value)])} max={max} step={step} className={className} />;
};

// Icon components
const Bell = () => <span>🔔</span>;
const Calendar = () => <span>📅</span>;
const Home = () => <span>🏠</span>;
const MessageSquare = () => <span>💬</span>;
const Trophy = () => <span>🏆</span>;
const Users = () => <span>👥</span>;
const User = () => <span>👤</span>;
const Send = () => <span>➤</span>;
const Coffee = () => <span>☕</span>;
const Target = () => <span>🎯</span>;
const Heart = () => <span>❤️</span>;
const AlertCircle = () => <span>ℹ️</span>;

// Main App Component
export default function GLRSApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check if user is logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('glrsUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return <AuthScreen onLogin={(user) => {
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('glrsUser', JSON.stringify(user));
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">GLRS Connect</h1>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="connections" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Connect</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab currentUser={currentUser} />
          </TabsContent>
          <TabsContent value="connections">
            <ConnectionsTab currentUser={currentUser} />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesTab currentUser={currentUser} />
          </TabsContent>
          <TabsContent value="progress">
            <ProgressTab currentUser={currentUser} />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileTab currentUser={currentUser} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
        <div className="grid grid-cols-5 h-16">
          <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center justify-center ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-600'}`}>
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </button>
          <button onClick={() => setActiveTab('connections')} className={`flex flex-col items-center justify-center ${activeTab === 'connections' ? 'text-blue-600' : 'text-gray-600'}`}>
            <Users className="h-5 w-5" />
            <span className="text-xs">Connect</span>
          </button>
          <button onClick={() => setActiveTab('messages')} className={`flex flex-col items-center justify-center ${activeTab === 'messages' ? 'text-blue-600' : 'text-gray-600'}`}>
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Messages</span>
          </button>
          <button onClick={() => setActiveTab('progress')} className={`flex flex-col items-center justify-center ${activeTab === 'progress' ? 'text-blue-600' : 'text-gray-600'}`}>
            <Trophy className="h-5 w-5" />
            <span className="text-xs">Progress</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center justify-center ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-600'}`}>
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

// Auth Screen Component
function AuthScreen({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    recoveryDate: ''
  });

  const handleSubmit = () => {
    // Simulate authentication
    const user = {
      id: Date.now(),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      recoveryDate: formData.recoveryDate || new Date().toISOString().split('T')[0],
      joinedDate: new Date().toISOString()
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">GLRS Recovery Connect</CardTitle>
          <CardDescription className="text-center">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            {isSignUp && (
              <div>
                <Label htmlFor="recoveryDate">Recovery Start Date</Label>
                <Input
                  id="recoveryDate"
                  type="date"
                  value={formData.recoveryDate}
                  onChange={(e) => setFormData({...formData, recoveryDate: e.target.value})}
                />
              </div>
            )}
            <Button onClick={handleSubmit} className="w-full">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-blue-600 hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Dashboard Tab
function DashboardTab({ currentUser }) {
  const [checkIn, setCheckIn] = useState({
    energy: 5,
    connection: 5,
    win: '',
    focus: ''
  });
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  const daysInRecovery = Math.floor((new Date() - new Date(currentUser.recoveryDate)) / (1000 * 60 * 60 * 24));

  const handleCheckIn = () => {
    // Save check-in data
    const today = new Date().toISOString().split('T')[0];
    const checkInData = { ...checkIn, date: today };
    localStorage.setItem(`checkIn_${today}`, JSON.stringify(checkInData));
    setHasCheckedIn(true);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {currentUser.name}!</CardTitle>
          <CardDescription>Day {daysInRecovery} of your recovery journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">{daysInRecovery}</p>
              <p className="text-sm text-gray-600">Days Strong</p>
            </div>
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      {/* Daily Check-In */}
      {!hasCheckedIn ? (
        <Card>
          <CardHeader>
            <CardTitle>Daily Check-In</CardTitle>
            <CardDescription>Take a moment to reflect on your day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>How's your energy today?</Label>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm">Low</span>
                <Slider
                  value={[checkIn.energy]}
                  onValueChange={(value) => setCheckIn({...checkIn, energy: value[0]})}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm">High</span>
                <span className="font-bold w-8">{checkIn.energy}</span>
              </div>
            </div>

            <div>
              <Label>Connection score?</Label>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm">Isolated</span>
                <Slider
                  value={[checkIn.connection]}
                  onValueChange={(value) => setCheckIn({...checkIn, connection: value[0]})}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm">Connected</span>
                <span className="font-bold w-8">{checkIn.connection}</span>
              </div>
            </div>

            <div>
              <Label htmlFor="win">One win from yesterday?</Label>
              <Input
                id="win"
                placeholder="I accomplished..."
                value={checkIn.win}
                onChange={(e) => setCheckIn({...checkIn, win: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="focus">What's your focus today?</Label>
              <Input
                id="focus"
                placeholder="Today I will..."
                value={checkIn.focus}
                onChange={(e) => setCheckIn({...checkIn, focus: e.target.value})}
              />
            </div>

            <Button onClick={handleCheckIn} className="w-full">
              Complete Check-In
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Great job completing your check-in today! Keep up the amazing work.
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Coffee className="h-8 w-8 mx-auto mb-2 text-brown-600" />
            <p className="font-medium">Find Coffee Connect</p>
            <p className="text-sm text-gray-600">Meet a recovery buddy</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="font-medium">Today's Goals</p>
            <p className="text-sm text-gray-600">Track your progress</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Connections Tab
function ConnectionsTab({ currentUser }) {
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, name: 'Sarah M.', days: 45, interests: ['Fitness', 'Reading'], status: 'pending' }
  ]);
  
  const [connections, setConnections] = useState([
    { id: 2, name: 'Mike D.', days: 120, interests: ['Music', 'Hiking'], status: 'connected' }
  ]);

  const [potentialMatches] = useState([
    { id: 3, name: 'Jennifer L.', days: 90, interests: ['Yoga', 'Cooking'], compatibility: 85 },
    { id: 4, name: 'David R.', days: 200, interests: ['Running', 'Art'], compatibility: 78 }
  ]);

  const handleConnect = (matchId) => {
    const match = potentialMatches.find(m => m.id === matchId);
    if (match) {
      setPendingRequests([...pendingRequests, { ...match, status: 'sent' }]);
    }
  };

  const handleAccept = (requestId) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      setConnections([...connections, { ...request, status: 'connected' }]);
      setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Requests */}
      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Connection Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg mb-2">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-gray-600">{request.days} days in recovery</p>
                    <div className="flex gap-2 mt-1">
                      {request.interests.map(interest => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {request.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleAccept(request.id)}>Accept</Button>
                    <Button size="sm" variant="outline">Decline</Button>
                  </div>
                )}
                {request.status === 'sent' && (
                  <Badge variant="outline">Request Sent</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Current Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recovery Buddies</CardTitle>
          <CardDescription>People you're connected with</CardDescription>
        </CardHeader>
        <CardContent>
          {connections.map(connection => (
            <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg mb-2">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{connection.name}</p>
                  <p className="text-sm text-gray-600">{connection.days} days in recovery</p>
                  <div className="flex gap-2 mt-1">
                    {connection.interests.map(interest => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Connections</CardTitle>
          <CardDescription>People with similar recovery goals</CardDescription>
        </CardHeader>
        <CardContent>
          {potentialMatches.map(match => (
            <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg mb-2">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{match.name}</p>
                  <p className="text-sm text-gray-600">{match.days} days in recovery</p>
                  <div className="flex gap-2 mt-1">
                    {match.interests.map(interest => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-green-600 mt-1">{match.compatibility}% compatibility</p>
                </div>
              </div>
              <Button size="sm" onClick={() => handleConnect(match.id)}>
                Connect
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Messages Tab
function MessagesTab({ currentUser }) {
  const [conversations] = useState([
    {
      id: 1,
      name: 'Mike D.',
      lastMessage: 'Thanks for the coffee chat yesterday!',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      name: 'Recovery Coach',
      lastMessage: 'Great job on your check-ins this week',
      time: '1 day ago',
      unread: false
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Mike D.', text: 'Hey! Want to grab coffee tomorrow?', time: '10:30 AM', isMine: false },
    { id: 2, sender: 'Me', text: 'Sure! How about 2pm at the usual spot?', time: '10:45 AM', isMine: true },
    { id: 3, sender: 'Mike D.', text: 'Perfect! See you there', time: '11:00 AM', isMine: false },
    { id: 4, sender: 'Mike D.', text: 'Thanks for the coffee chat yesterday!', time: '2:00 PM', isMine: false }
  ]);

  const sendMessage = () => {
    if (messageText.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'Me',
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: true
      }]);
      setMessageText('');
    }
  };

  if (selectedConversation) {
    return (
      <div className="flex flex-col h-[600px]">
        {/* Chat Header */}
        <div className="border-b p-4 flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)} className="mr-4">
            ← Back
          </Button>
          <Avatar className="h-8 w-8 mr-3">
            <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-medium">{selectedConversation.name}</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${
                message.isMine ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}>
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.isMine ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t p-4 flex space-x-2">
          <Input
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Stay connected with your recovery network</CardDescription>
        </CardHeader>
        <CardContent>
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              className="flex items-center justify-between p-4 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{conversation.name}</p>
                  <p className="text-sm text-gray-600">{conversation.lastMessage}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{conversation.time}</p>
                {conversation.unread && (
                  <Badge className="mt-1" variant="default">New</Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Progress Tab
function ProgressTab({ currentUser }) {
  const daysInRecovery = Math.floor((new Date() - new Date(currentUser.recoveryDate)) / (1000 * 60 * 60 * 24));
  
  const milestones = [
    { days: 30, title: "One Month", achieved: daysInRecovery >= 30 },
    { days: 60, title: "Two Months", achieved: daysInRecovery >= 60 },
    { days: 90, title: "Three Months", achieved: daysInRecovery >= 90 },
    { days: 180, title: "Six Months", achieved: daysInRecovery >= 180 },
    { days: 365, title: "One Year", achieved: daysInRecovery >= 365 }
  ];

  const weeklyStats = {
    checkIns: 7,
    connections: 3,
    groupSessions: 2,
    averageEnergy: 7.2,
    averageConnection: 8.1
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recovery Journey</CardTitle>
          <CardDescription>Celebrating every step forward</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-blue-600">{daysInRecovery}</p>
            <p className="text-gray-600">Days in Recovery</p>
          </div>
          
          {/* Milestones */}
          <div className="space-y-3">
            {milestones.map(milestone => (
              <div key={milestone.days} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    milestone.achieved ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {milestone.achieved ? (
                      <Trophy className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${milestone.achieved ? 'text-green-600' : 'text-gray-500'}`}>
                      {milestone.title}
                    </p>
                    <p className="text-sm text-gray-500">{milestone.days} days</p>
                  </div>
                </div>
                {milestone.achieved && (
                  <Badge variant="success">Achieved!</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{weeklyStats.checkIns}/7</p>
              <p className="text-sm text-gray-600">Daily Check-ins</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{weeklyStats.connections}</p>
              <p className="text-sm text-gray-600">New Connections</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{weeklyStats.averageEnergy}/10</p>
              <p className="text-sm text-gray-600">Avg Energy</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{weeklyStats.averageConnection}/10</p>
              <p className="text-sm text-gray-600">Avg Connection</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Insights</CardTitle>
          <CardDescription>Areas of strength and opportunity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Connection Building</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
                <span className="text-sm font-medium">Strong</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Daily Consistency</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
                <span className="text-sm font-medium">Excellent</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Group Participation</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
                <span className="text-sm font-medium">Growing</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Profile Tab
function ProfileTab({ currentUser }) {
  const [interests, setInterests] = useState(['Reading', 'Fitness', 'Music']);
  const [newInterest, setNewInterest] = useState('');
  const [bio, setBio] = useState('On a journey of recovery and self-discovery. Looking to connect with others who understand the path.');

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleLogout = () => {
    localStorage.removeItem('glrsUser');
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{currentUser.name}</h2>
            <p className="text-gray-600">{currentUser.email}</p>
            <Badge className="mt-2" variant="secondary">
              Member since {new Date(currentUser.joinedDate).toLocaleDateString()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Bio Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Share a bit about yourself..."
            className="min-h-[100px]"
          />
          <Button className="mt-3" size="sm">Save Bio</Button>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Interests & Activities</CardTitle>
          <CardDescription>Help us match you with like-minded peers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {interests.map(interest => (
              <Badge key={interest} variant="secondary" className="pr-1">
                {interest}
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Add an interest..."
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addInterest()}
            />
            <Button onClick={addInterest} size="sm">Add</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Information */}
      <Card>
        <CardHeader>
          <CardTitle>Recovery Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <Label>Recovery Start Date</Label>
              <p className="text-sm text-gray-600">{new Date(currentUser.recoveryDate).toLocaleDateString()}</p>
            </div>
            <div>
              <Label>Primary Support</Label>
              <p className="text-sm text-gray-600">GLRS Virtual Services</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <Heart className="h-4 w-4 mr-2" />
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
