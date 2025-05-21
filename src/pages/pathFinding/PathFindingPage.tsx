import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { algConfigs } from '@/configs/pathFinding';
import { Card } from '@heroui/react';

const PathFindingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary p-2">
      <Outlet />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-secondary mb-4">
          Pathfinding Algorithms
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore different pathfinding algorithms and see how they work in
          action. Each algorithm has its own strengths and use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {algConfigs.map((config) => (
          <Card
            as={Link}
            key={config.path}
            to={config.path}
            className="bg-primary rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                {config.title}
              </h2>
              <p className="text-gray-600 mb-6">{config.description}</p>

              <div className="grid grid-cols-9 gap-1 mb-6">
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

              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">Learn more →</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Why Visualize Pathfinding Algorithms?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Understanding Algorithm Behavior
            </h3>
            <p className="text-gray-600">
              Visualizing pathfinding algorithms helps you understand how they
              explore and find paths through a maze or grid. You can see the
              differences in how each algorithm approaches the problem.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Comparing Efficiency
            </h3>
            <p className="text-gray-600">
              By watching the algorithms in action, you can compare their
              efficiency in terms of nodes explored, path length, and time taken
              to find a solution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathFindingPage;