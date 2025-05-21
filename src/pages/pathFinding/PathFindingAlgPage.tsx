import React from 'react';
import { AlgConfig } from '@/types/pathFinding';
import { Tabs, Tab } from '@heroui/react';
import Visualizer from '@/components/pathFinding/Visualizer';

interface PathFindingAlgPageProps {
  config: AlgConfig;
}

const PathFindingAlgPage: React.FC<PathFindingAlgPageProps> = ({ config }) => {
  return (
    <div className="min-h-screen bg-primary px-2">
      <main className="mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {config.title}
        </h1>
        <Tabs
          aria-label="Algorithm Tabs"
          color="secondary"
          variant="underlined"
        >
          <Tab key="visualization" title="Visualization">
            <Visualizer
              algorithm={config.algorithm}
              buttonText={config.buttonText}
            />
          </Tab>
          <Tab key="how-it-works" title="How It Works">
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                {config.visualization.description}
              </p>
              <div className="grid grid-cols-9 gap-1 max-w-2xl mx-auto">
                {config.visualization.grid.map((cell, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded ${
                      cell.type === 'entry'
                        ? 'bg-green-500'
                        : cell.type === 'exit'
                        ? 'bg-red-500'
                        : cell.type === 'path'
                        ? 'bg-blue-500'
                        : cell.type === 'visited'
                        ? 'bg-purple-200'
                        : cell.type === 'wall'
                        ? 'bg-gray-800'
                        : 'bg-white border border-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Advantages
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {config.advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Limitations
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {config.limitations.map((limitation, index) => (
                    <li key={index}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Tab>
          <Tab key="code" title="Code">
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{config.code}</code>
            </pre>
          </Tab>
        </Tabs>
      </main>
    </div>
  );
};

export default PathFindingAlgPage;
