import { Link, Outlet } from 'react-router-dom';

const DataStructurePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <div className="mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Data Structures Visualization</h1>
        
        <p className="text-xl mb-8 text-center max-w-3xl mx-auto">
          Explore and learn about different data structures through interactive visualizations.
          Click on any data structure below to see it in action.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <Link 
            to="/data-structures/stack"
            className="bg-card hover:bg-card/90 rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-4">Stack</h2>
            <div className="h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
              <div className="w-3/4 flex flex-col-reverse items-center border-b-2 border-secondary pb-4 pt-2">
                <div className="w-full bg-primary/20 border border-primary p-2 mb-1">
                  <span className="text-center block">Element 3</span>
                </div>
                <div className="w-full bg-primary/20 border border-primary p-2 mb-1">
                  <span className="text-center block">Element 2</span>
                </div>
                <div className="w-full bg-primary/20 border border-primary p-2 mb-1">
                  <span className="text-center block">Element 1</span>
                </div>
              </div>
            </div>
            <p className="mb-4">
              A stack is a linear data structure that follows the Last In First Out (LIFO) principle.
              Elements can only be added or removed from the top of the stack.
            </p>
            <p className="text-primary font-semibold">Explore Stack →</p>
          </Link>
          
          {/* Queue Card */}
          <Link 
            to="/data-structures/queue"
            className="bg-card hover:bg-card/90 rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-4">Queue</h2>
            <div className="h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
              <div className="w-3/4 flex flex-row items-center border-b-2 border-secondary pb-4 pt-2">
                <div className="flex-1 bg-primary/20 border border-primary p-2 mx-1">
                  <span className="text-center block">Element 1</span>
                </div>
                <div className="flex-1 bg-primary/20 border border-primary p-2 mx-1">
                  <span className="text-center block">Element 2</span>
                </div>
                <div className="flex-1 bg-primary/20 border border-primary p-2 mx-1">
                  <span className="text-center block">Element 3</span>
                </div>
              </div>
            </div>
            <p className="mb-4">
              A queue is a linear data structure that follows the First In First Out (FIFO) principle.
              Elements are added at the rear and removed from the front of the queue.
            </p>
            <p className="text-primary font-semibold">Explore Queue →</p>
          </Link>
          
          <Link 
            to="/data-structures/linked-list"
            className="bg-card hover:bg-card/90 rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-4">Linked List</h2>
            <div className="h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
              <div className="w-full flex flex-row items-center justify-center">
                <div className="flex-none bg-primary/20 border border-primary p-2 rounded-md w-16 h-16 flex items-center justify-center">
                  <span>1</span>
                </div>
                <div className="flex-none mx-2">→</div>
                <div className="flex-none bg-primary/20 border border-primary p-2 rounded-md w-16 h-16 flex items-center justify-center">
                  <span>2</span>
                </div>
                <div className="flex-none mx-2">→</div>
                <div className="flex-none bg-primary/20 border border-primary p-2 rounded-md w-16 h-16 flex items-center justify-center">
                  <span>3</span>
                </div>
                <div className="flex-none mx-2">→</div>
                <div className="w-4 flex items-center justify-center text-sm">null</div>
              </div>
            </div>
            <p className="mb-4">
              A linked list is a linear data structure where each element points to the next one.
              Elements can be efficiently inserted or removed without reallocation.
            </p>
            <p className="text-primary font-semibold">Explore Linked List →</p>
          </Link>
          
          <Link 
            to="/data-structures/bst"
            className="bg-card hover:bg-card/90 rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-4">Binary Search Tree</h2>
            <div className="h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
              <div className="w-full flex flex-col items-center">
                <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span>8</span>
                </div>
                <div className="flex justify-between w-full px-8">
                  <div className="flex flex-col items-center">
                    <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-12 h-12 flex items-center justify-center">
                      <span>4</span>
                    </div>
                    <div className="flex justify-between w-full px-4 mt-4">
                      <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center">
                        <span>2</span>
                      </div>
                      <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center">
                        <span>6</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-12 h-12 flex items-center justify-center">
                      <span>12</span>
                    </div>
                    <div className="flex justify-between w-full px-4 mt-4">
                      <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center">
                        <span>10</span>
                      </div>
                      <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center">
                        <span>14</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mb-4">
              A binary search tree is a hierarchical data structure where each node has at most two children,
              with values arranged in a specific order for efficient searching.
            </p>
            <p className="text-primary font-semibold">Explore Binary Search Tree →</p>
          </Link>
          
          <Link 
            to="/data-structures/avl-tree"
            className="bg-card hover:bg-card/90 rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-4">AVL Tree</h2>
            <div className="h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
              <div className="w-full flex flex-col items-center">
                <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4 relative">
                  <span>8</span>
                  <span className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">2</span>
                </div>
                <div className="flex justify-between w-full px-8">
                  <div className="flex flex-col items-center">
                    <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-12 h-12 flex items-center justify-center relative">
                      <span>4</span>
                      <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">1</span>
                    </div>
                    <div className="flex justify-between w-full px-4 mt-4">
                      <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center relative">
                        <span>2</span>
                        <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">0</span>
                      </div>
                      <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center relative">
                        <span>6</span>
                        <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">0</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-12 h-12 flex items-center justify-center relative">
                      <span>12</span>
                      <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">1</span>
                    </div>
                    <div className="flex justify-between w-full px-4 mt-4">
                      <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center relative">
                        <span>10</span>
                        <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">0</span>
                      </div>
                      <div className="flex-none bg-primary/20 border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center relative">
                        <span>14</span>
                        <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mb-4">
              AVL trees are self-balancing binary search trees where the heights of child subtrees differ by at most one,
              ensuring O(log n) operations through automatic rotations.
            </p>
            <p className="text-primary font-semibold">Explore AVL Tree →</p>
          </Link>
          
          <Link 
            to="/data-structures/rb-tree"
            className="bg-card hover:bg-card/90 rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-4">Red-Black Tree</h2>
            <div className="h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
              <div className="w-full flex flex-col items-center">
                <div className="flex-none bg-black border border-primary p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-white">
                  <span>8</span>
                </div>
                <div className="flex justify-between w-full px-8">
                  <div className="flex flex-col items-center">
                    <div className="flex-none bg-red-600 border border-primary p-2 rounded-full w-12 h-12 flex items-center justify-center text-white">
                      <span>4</span>
                    </div>
                    <div className="flex justify-between w-full px-4 mt-4">
                      <div className="flex-none bg-black border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center text-white">
                        <span>2</span>
                      </div>
                      <div className="flex-none bg-black border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center text-white">
                        <span>6</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex-none bg-red-600 border border-primary p-2 rounded-full w-12 h-12 flex items-center justify-center text-white">
                      <span>12</span>
                    </div>
                    <div className="flex justify-between w-full px-4 mt-4">
                      <div className="flex-none bg-black border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center text-white">
                        <span>10</span>
                      </div>
                      <div className="flex-none bg-black border border-primary p-2 rounded-full w-10 h-10 flex items-center justify-center text-white">
                        <span>14</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mb-4">
              Red-Black trees are self-balancing binary search trees where nodes are colored red or black,
              maintaining balance with color properties and ensuring O(log n) operations.
            </p>
            <p className="text-primary font-semibold">Explore Red-Black Tree →</p>
          </Link>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Visualize Data Structures?</h2>
          <div className="max-w-3xl mx-auto text-lg">
            <p className="mb-4">
              Visualizing data structures helps you understand how they work in a more intuitive way.
              By seeing operations like push, pop, enqueue, dequeue, and list manipulation in action, you can better
              grasp their functionality and use cases.
            </p>
            <p>
              These visualizations aim to make learning about data structures more interactive and engaging.
              Click on any of the data structures above to get started!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataStructurePage;
