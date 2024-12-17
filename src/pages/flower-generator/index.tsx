import { Component } from "solid-js";
import { FlowerGenerator } from "../../widgets/flower-generator";

export const FlowerGeneratorPage: Component = () => {
  return (
    <div class="h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-2 sm:p-8 overflow-hidden">
      <div class="h-full max-w-4xl mx-auto flex flex-col">
        <h1 class="text-4xl font-bold text-center text-purple-800">flowwy</h1>
        <div class="mt-[84px] mb-[108px] flex-grow">
          <FlowerGenerator />
        </div>
      </div>
    </div>
  );
};
