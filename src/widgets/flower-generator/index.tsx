import { Component } from "solid-js";
import { useUnit } from "effector-solid";
import {
  $currentFlower,
  Flower,
  regenerateFlower,
} from "../../entities/flower/model";

const FlowerSVG: Component<{ flower: Flower }> = (props) => {
  const getFlowerHeight = () => {
    const vaseHeight = props.flower.vase === "tall" ? 100 : 60;
    const minStemHeight = vaseHeight + 60;
    return Math.max(minStemHeight, props.flower.height);
  };

  const getVasePath = () => {
    const baseHeight = 300;
    switch (props.flower.vase) {
      case "round":
        return `
          M 150 ${baseHeight} 
          Q 120 ${baseHeight} 120 ${baseHeight - 30} 
          Q 120 ${baseHeight - 60} 150 ${baseHeight - 60} 
          L 250 ${baseHeight - 60} 
          Q 280 ${baseHeight - 60} 280 ${baseHeight - 30} 
          Q 280 ${baseHeight} 250 ${baseHeight} 
          Z
        `;
      case "square":
        return `
          M 120 ${baseHeight} 
          L 120 ${baseHeight - 60} 
          L 280 ${baseHeight - 60} 
          L 280 ${baseHeight} 
          Z
        `;
      case "tall":
        return `
          M 150 ${baseHeight} 
          L 150 ${baseHeight - 80} 
          Q 150 ${baseHeight - 100} 200 ${baseHeight - 100} 
          Q 250 ${baseHeight - 100} 250 ${baseHeight - 80} 
          L 250 ${baseHeight} 
          Z
        `;
      case "wide":
        return `
          M 120 ${baseHeight} 
          Q 120 ${baseHeight - 40} 200 ${baseHeight - 40} 
          Q 280 ${baseHeight - 40} 280 ${baseHeight} 
          Z
        `;
      case "oval":
        return `
          M 150 ${baseHeight}
          Q 120 ${baseHeight} 120 ${baseHeight - 40}
          Q 120 ${baseHeight - 80} 200 ${baseHeight - 80}
          Q 280 ${baseHeight - 80} 280 ${baseHeight - 40}
          Q 280 ${baseHeight} 250 ${baseHeight}
          Z
        `;
      case "modern":
        return `
          M 140 ${baseHeight}
          L 160 ${baseHeight - 90}
          L 240 ${baseHeight - 90}
          L 260 ${baseHeight}
          Z
        `;
      case "vintage":
        return `
          M 150 ${baseHeight}
          Q 130 ${baseHeight} 130 ${baseHeight - 30}
          Q 130 ${baseHeight - 70} 200 ${baseHeight - 70}
          Q 270 ${baseHeight - 70} 270 ${baseHeight - 30}
          Q 270 ${baseHeight} 250 ${baseHeight}
          Q 200 ${baseHeight - 20} 150 ${baseHeight}
          Z
        `;
      case "slim":
        return `
          M 180 ${baseHeight}
          L 170 ${baseHeight - 80}
          Q 170 ${baseHeight - 90} 200 ${baseHeight - 90}
          Q 230 ${baseHeight - 90} 230 ${baseHeight - 80}
          L 220 ${baseHeight}
          Z
        `;
    }
  };

  const getBudPath = () => {
    const centerX = 200;
    const baseY = 300;
    const centerY = baseY - getFlowerHeight();
    const petalLength = 45;

    switch (props.flower.bud) {
      case "rose":
        return Array.from({ length: props.flower.petalCount })
          .map((_, i) => {
            const angle = (360 / props.flower.petalCount) * i;
            const innerRadius = 24;
            const outerRadius = 45;
            const startAngle = angle * (Math.PI / 180);
            const endAngle =
              ((angle + 360 / props.flower.petalCount) * Math.PI) / 180;

            const x1 = centerX + innerRadius * Math.cos(startAngle);
            const y1 = centerY + innerRadius * Math.sin(startAngle);
            const x2 = centerX + outerRadius * Math.cos(startAngle);
            const y2 = centerY + outerRadius * Math.sin(startAngle);
            const x3 = centerX + outerRadius * Math.cos(endAngle);
            const y3 = centerY + outerRadius * Math.sin(endAngle);
            const x4 = centerX + innerRadius * Math.cos(endAngle);
            const y4 = centerY + innerRadius * Math.sin(endAngle);

            return `M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3} L ${x4} ${y4} Z`;
          })
          .join(" ");

      case "tulip":
        return Array.from({ length: props.flower.petalCount })
          .map((_, i) => {
            const angle = (360 / props.flower.petalCount) * i;
            return `
            M ${centerX} ${centerY}
            L ${centerX + petalLength * Math.cos((angle * Math.PI) / 180)} 
              ${centerY + petalLength * Math.sin((angle * Math.PI) / 180)}
            L ${
              centerX +
              (petalLength - 10) * Math.cos(((angle + 30) * Math.PI) / 180)
            }
              ${
                centerY +
                (petalLength - 10) * Math.sin(((angle + 30) * Math.PI) / 180)
              }
          `;
          })
          .join(" ");

      case "daisy":
        return Array.from({ length: props.flower.petalCount })
          .map((_, i) => {
            const angle = (360 / props.flower.petalCount) * i;
            return `
            M ${centerX} ${centerY}
            Q ${centerX + 60 * Math.cos((angle * Math.PI) / 180)}
              ${centerY + 60 * Math.sin((angle * Math.PI) / 180)}
              ${centerX + 45 * Math.cos(((angle + 30) * Math.PI) / 180)}
              ${centerY + 45 * Math.sin(((angle + 30) * Math.PI) / 180)}
          `;
          })
          .join(" ");

      case "lily":
        return Array.from({ length: props.flower.petalCount })
          .map((_, i) => {
            const angle = (360 / props.flower.petalCount) * i;
            return `
            M ${centerX} ${centerY}
            Q ${centerX + 75 * Math.cos((angle * Math.PI) / 180)}
              ${centerY + 75 * Math.sin((angle * Math.PI) / 180)}
              ${centerX + 45 * Math.cos(((angle + 45) * Math.PI) / 180)}
              ${centerY + 45 * Math.sin(((angle + 45) * Math.PI) / 180)}
            Q ${centerX + 15 * Math.cos(((angle + 90) * Math.PI) / 180)}
              ${centerY + 15 * Math.sin(((angle + 90) * Math.PI) / 180)}
              ${centerX} ${centerY}
          `;
          })
          .join(" ");
    }
  };

  const getStemPath = () => {
    const baseY = 300;
    const stemStartY = baseY - 20;
    const topY = baseY - getFlowerHeight();

    switch (props.flower.stem) {
      case "straight":
        return `M 200 ${stemStartY} L 200 ${topY}`;
      case "curved":
        return `M 200 ${stemStartY} C 200 ${stemStartY - 40} 280 ${
          topY + 60
        } 200 ${topY}`;
      case "branched":
        const midY = (stemStartY + topY) / 2;
        return `
          M 200 ${stemStartY} 
          L 200 ${midY}
          L 140 ${midY - 60}
          M 200 ${midY} 
          L 260 ${midY - 60}
          M 200 ${midY} 
          L 200 ${topY}
        `;
    }
  };

  return (
    <svg
      viewBox="0 0 400 400"
      class="w-full max-w-[400px] h-auto mx-auto rounded-lg overflow-hidden"
    >
      <defs>
        <linearGradient id="vaseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#B8860B;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#966B00;stop-opacity:1" />
        </linearGradient>
        <filter id="flowerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
          <feOffset dx="1" dy="1" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect
        width="400"
        height="400"
        fill={props.flower.backgroundColor}
        fill-opacity="0.8"
      />

      {/* Stem */}
      <path d={getStemPath()} stroke="#228B22" stroke-width="6" fill="none" />

      {/* Vase */}
      <path d={getVasePath()} fill="url(#vaseGradient)" />

      {/* Bud */}
      <path
        d={getBudPath()}
        fill={props.flower.color}
        filter="url(#flowerShadow)"
      />

      {/* Center of the flower */}
      <circle
        cx="200"
        cy={300 - getFlowerHeight()}
        r="12"
        fill={props.flower.secondaryColor}
        filter="url(#flowerShadow)"
      />
    </svg>
  );
};

export const FlowerGenerator: Component = () => {
  const { flower, onRegenerateFlower } = useUnit({
    flower: $currentFlower,
    onRegenerateFlower: regenerateFlower,
  });

  const copyToClipboard = async () => {
    const svg = document.querySelector("svg") as SVGSVGElement;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    canvas.width = 800; // Увеличенный размер для лучшего качества
    canvas.height = 800;

    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = async () => {
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      try {
        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b!), "image/png")
        );
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div class="h-full w-full flex flex-col items-center">
      <div class="bg-white rounded-xl shadow-lg p-4 flex flex-col">
        <div class="flex items-center justify-center">
          <FlowerSVG flower={flower()} />
        </div>
        <div class="mt-8 text-center space-y-4">
          <button
            onClick={onRegenerateFlower}
            class="w-full bg-[#2D3250] text-white px-6 py-3 rounded-full hover:bg-[#424769] transition-colors text-sm sm:text-base"
          >
            Хочу ещё цветочек
          </button>
          <div>
            <button
              onClick={copyToClipboard}
              class="w-full bg-white text-[#2D3250] border-2 border-[#2D3250] px-6 py-3 rounded-full hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Скопировать цветочек
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
