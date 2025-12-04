"use client"
import { Canvas, useThree } from "@react-three/fiber"
import { Billboard, OrbitControls, Sky, Center, Text3D } from "@react-three/drei"
import Table from "@/components/Table"
import FlowerPot from "@/components/Flower"
import Coin from "@/components/Coin"
import { useEffect, useState, useCallback } from "react"
import { socket } from "@/socket"
import { useRoomStore } from "@/store/roomStore"
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation"
import Room from "@/components/Room"
import ifont from '@/font/Inter_Italic.json'
function ScoreText({ score, room, player }:any) {
  const { camera } = useThree();
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    if (!room) return;

    // Kiểm tra xem camera hiện tại có phải là góc nhìn của Host không
    // Host: camera ở z=20, nhìn về z=0. Text cần xoay 0 độ.
    // Guest: camera ở z=-20, nhìn về z=0. Text cần xoay 180 độ quanh trục Y (Math.PI).
    const isHostView = player === room.host; 

    // Nếu không phải Host (là người chơi 2), xoay 180 độ (Math.PI) quanh trục Y
    if (!isHostView) {
      setRotation([0, Math.PI, 0]);
    } else {
      setRotation([0, 0, 0]);
    }
    
    // Lưu ý: camera.position không ổn định để dùng trực tiếp trong useEffect này
    // vì nó bị ghi đè bởi OrbitControls, nên ta dựa vào logic game (host/player)
  }, [room, player]);

  const scoreText = room?.players ? 
    `${room.players[0]}: ${score[room.players[0]] ?? 0}  -  ${room.players[1]}: ${score[room.players[1]] ?? 0}` : '';

  return (
    <Center position={[0, 10, 0]}>
      <Text3D
        font={ifont}
        height={0.5}
        bevelEnabled
        curveSegments={32}
        bevelSize={0.04}
        bevelThickness={0.1}
        lineHeight={0.5}
        letterSpacing={-0.06}
        size={1.5}
        rotation={rotation} // Áp dụng độ xoay ở đây
      >
        {scoreText}
        <meshNormalMaterial />
      </Text3D>
    </Center>
  );
}