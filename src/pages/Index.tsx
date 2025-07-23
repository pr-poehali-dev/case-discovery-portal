import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CaseItem {
  id: number;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  value: number;
}

interface GameCase {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  items: CaseItem[];
}

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCase, setSelectedCase] = useState<GameCase | null>(null);
  const [wonItem, setWonItem] = useState<CaseItem | null>(null);

  const gameCases: GameCase[] = [
    {
      id: 1,
      name: "Мистический кейс",
      description: "Редкие артефакты и сокровища",
      price: 100,
      image: "💎",
      items: [
        { id: 1, name: "Алмазный меч", rarity: "legendary", image: "⚔️", value: 500 },
        { id: 2, name: "Золотая корона", rarity: "epic", image: "👑", value: 300 },
        { id: 3, name: "Магический щит", rarity: "rare", image: "🛡️", value: 150 },
        { id: 4, name: "Зелье силы", rarity: "common", image: "🧪", value: 50 },
      ]
    },
    {
      id: 2,
      name: "Боевой кейс",
      description: "Оружие и броня для сражений",
      price: 75,
      image: "⚔️",
      items: [
        { id: 5, name: "Огненный топор", rarity: "epic", image: "🪓", value: 250 },
        { id: 6, name: "Кольчуга", rarity: "rare", image: "🥋", value: 120 },
        { id: 7, name: "Боевые перчатки", rarity: "common", image: "🥊", value: 40 },
        { id: 8, name: "Шлем воина", rarity: "rare", image: "⛑️", value: 100 },
      ]
    },
    {
      id: 3,
      name: "Магический кейс",
      description: "Заклинания и артефакты магии",
      price: 150,
      image: "🔮",
      items: [
        { id: 9, name: "Кристалл времени", rarity: "legendary", image: "💫", value: 800 },
        { id: 10, name: "Книга заклинаний", rarity: "epic", image: "📚", value: 200 },
        { id: 11, name: "Магический жезл", rarity: "rare", image: "🪄", value: 180 },
        { id: 12, name: "Амулет удачи", rarity: "common", image: "🧿", value: 60 },
      ]
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'epic': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'rare': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-500 text-black';
      case 'epic': return 'bg-purple-500 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const spinRoulette = () => {
    if (!selectedCase || isSpinning) return;
    
    setIsSpinning(true);
    setWonItem(null);

    // Симуляция вращения рулетки
    setTimeout(() => {
      const randomItem = selectedCase.items[Math.floor(Math.random() * selectedCase.items.length)];
      setWonItem(randomItem);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-cyan-500/20" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="animate-bounce-in">
            <h1 className="text-6xl md:text-8xl font-black mb-6 gradient-primary bg-clip-text text-transparent">
              CASE OPENING
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Откройте уникальные кейсы и получите редкие предметы! 
              Испытайте удачу в захватывающей игре с рулеткой.
            </p>
            <div className="flex items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 gradient-primary hover:scale-105 transition-transform font-bold"
              >
                <Icon name="Play" className="mr-2" />
                НАЧАТЬ ИГРУ
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 glass-effect border-white/30 text-white hover:bg-white/20"
              >
                <Icon name="Trophy" className="mr-2" />
                РЕЙТИНГ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Roulette Section */}
      {selectedCase && (
        <div className="container mx-auto px-4 py-16">
          <Card className="glass-effect border-white/20 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-4">
                {selectedCase.name}
              </CardTitle>
              <div className="text-6xl mb-6">{selectedCase.image}</div>
            </CardHeader>
            <CardContent>
              {/* Roulette Wheel */}
              <div className="relative mb-8">
                <div className="overflow-hidden rounded-xl bg-slate-800/50 p-6">
                  <div 
                    className={`flex gap-4 transition-transform duration-3000 ease-out ${
                      isSpinning ? 'animate-spin-roulette' : ''
                    }`}
                  >
                    {[...selectedCase.items, ...selectedCase.items, ...selectedCase.items].map((item, index) => (
                      <div 
                        key={`${item.id}-${index}`}
                        className={`min-w-32 h-32 rounded-lg ${getRarityColor(item.rarity)} flex flex-col items-center justify-center p-2`}
                      >
                        <div className="text-3xl mb-1">{item.image}</div>
                        <div className="text-xs text-center text-white font-bold">
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-yellow-400 z-10" />
              </div>

              {/* Spin Button */}
              <div className="text-center mb-8">
                <Button
                  onClick={spinRoulette}
                  disabled={isSpinning}
                  size="lg"
                  className={`text-xl px-12 py-6 font-bold ${
                    isSpinning 
                      ? 'bg-gray-600' 
                      : 'gradient-primary hover:scale-105 animate-pulse-glow'
                  } transition-all`}
                >
                  {isSpinning ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" />
                      ВРАЩЕНИЕ...
                    </>
                  ) : (
                    <>
                      <Icon name="Zap" className="mr-2" />
                      КРУТИТЬ ЗА {selectedCase.price}₽
                    </>
                  )}
                </Button>
              </div>

              {/* Won Item */}
              {wonItem && (
                <div className="text-center animate-bounce-in">
                  <div className="mb-4">
                    <div className="text-2xl text-yellow-400 font-bold mb-2">🎉 ПОЗДРАВЛЯЕМ! 🎉</div>
                    <div className="text-lg text-gray-300">Вы выиграли:</div>
                  </div>
                  <Card className={`${getRarityColor(wonItem.rarity)} p-6 max-w-sm mx-auto`}>
                    <div className="text-6xl mb-4">{wonItem.image}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{wonItem.name}</h3>
                    <Badge className={getRarityBadgeColor(wonItem.rarity)}>
                      {wonItem.rarity.toUpperCase()}
                    </Badge>
                    <div className="text-2xl font-bold text-white mt-2">
                      {wonItem.value}₽
                    </div>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cases Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Доступные кейсы
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gameCases.map((caseItem) => (
            <Card 
              key={caseItem.id}
              className={`glass-effect border-white/20 hover:scale-105 transition-transform cursor-pointer ${
                selectedCase?.id === caseItem.id ? 'ring-2 ring-orange-500' : ''
              }`}
              onClick={() => setSelectedCase(caseItem)}
            >
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{caseItem.image}</div>
                <CardTitle className="text-white">{caseItem.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {caseItem.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {caseItem.items.map((item) => (
                    <div 
                      key={item.id}
                      className={`${getRarityColor(item.rarity)} rounded-lg p-3 text-center`}
                    >
                      <div className="text-2xl mb-1">{item.image}</div>
                      <div className="text-xs text-white font-medium">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full gradient-primary font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCase(caseItem);
                  }}
                >
                  ВЫБРАТЬ ЗА {caseItem.price}₽
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="glass-effect rounded-xl p-6 border-white/20">
            <div className="text-4xl mb-2">🎲</div>
            <div className="text-2xl font-bold text-white">1,247</div>
            <div className="text-gray-400">Кейсов открыто</div>
          </div>
          <div className="glass-effect rounded-xl p-6 border-white/20">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-2xl font-bold text-white">856</div>
            <div className="text-gray-400">Активных игроков</div>
          </div>
          <div className="glass-effect rounded-xl p-6 border-white/20">
            <div className="text-4xl mb-2">💎</div>
            <div className="text-2xl font-bold text-white">42</div>
            <div className="text-gray-400">Легендарных предметов</div>
          </div>
          <div className="glass-effect rounded-xl p-6 border-white/20">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-white">₽2.1M</div>
            <div className="text-gray-400">Общая стоимость выигрышей</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;