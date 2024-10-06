import React, { useState, useEffect } from 'react';
import { Button } from './components/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/Card';

const items = [
  { type: 'Weapon', rarity: 'Common', color: 'bg-gray-300' },
  { type: 'Weapon', rarity: 'Rare', color: 'bg-blue-300' },
  { type: 'Weapon', rarity: 'Epic', color: 'bg-purple-300' },
  { type: 'Consumable', rarity: 'Common', color: 'bg-green-300' },
  { type: 'Consumable', rarity: 'Uncommon', color: 'bg-yellow-300' },
  { type: 'Material', rarity: 'Rare', color: 'bg-red-300' },
  { type: 'Material', rarity: 'Epic', color: 'bg-pink-300' },
];

const SlotMachine = () => {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    setSpinning(true);
    setWinner(null);
    const spinDegrees = 3600 + Math.floor(Math.random() * 360);
    const newRotation = rotation + spinDegrees;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const adjustedRotation = (newRotation + 90) % 360;
      const sectorSize = 360 / items.length;
      const winningIndex = Math.floor((360 - adjustedRotation) / sectorSize) % items.length;
      setWinner(items[winningIndex]);
    }, 10000); // 10 seconds spin duration
  };

  useEffect(() => {
    if (!spinning && winner) {
      // You can trigger any post-spin actions here
    }
  }, [spinning, winner]);

  return (
    <Card className="w-fit mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">Circular Slot Machine</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="relative w-[500px] h-[500px]">
          <div
            className="absolute w-full h-full rounded-full transition-transform duration-[10000ms] ease-in-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                id={item.type + ' ' + item.rarity}
                className={`absolute w-full h-full ${item.color}`}
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 49.5 * Math.cos((index * 360 / items.length) * Math.PI / 180)}% ${50 + 49.5 * Math.sin((index * 360 / items.length) * Math.PI / 180)}%, ${50 + 49.5 * Math.cos(((index + 1) * 360 / items.length) * Math.PI / 180)}% ${50 + 49.5 * Math.sin(((index + 1) * 360 / items.length) * Math.PI / 180)}%)`,
                }}
              >
                <div
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{
                    transform: `rotate(${index * (360 / items.length) + (180 / items.length)}deg)`,
                  }}
                >
                  <span
                    className="text-sm font-bold text-black whitespace-nowrap"
                    style={{ transform: 'translateX(100%) rotate(180deg)', width: '140px', }}
                  >
                    {item.type + ' ' + item.rarity}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-500 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
          <div className="absolute w-full h-full rounded-full border-4 border-gray-400 pointer-events-none"></div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-8 items-center">
        <Button onClick={spinWheel} disabled={spinning} className="mb-4">
          {spinning ? 'Spinning...' : 'Spin'}
        </Button>
        {winner && (
          <Card className="p-4 text-center">
            <p className="font-bold">{winner.type}</p>
            <p className="text-sm">{winner.rarity}</p>
          </Card>
        )}
      </CardFooter>
    </Card>
  );
};

export default SlotMachine;
