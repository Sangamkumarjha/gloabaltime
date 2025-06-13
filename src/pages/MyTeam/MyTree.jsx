import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getUserChildren } from "../../api/api";
import { buildTree } from "../utils/treeBuilder";

const maxDepth = 3;

const TreeNode = ({ node, onNodeClick, depth = 0 }) => {
  return (
    <div className="flex flex-col items-center relative">
      <div
        className={`bg-gradient-to-r from-indigo-600 to-indigo-800 
          p-4 rounded-xl shadow-lg text-sm text-white 
          cursor-pointer hover:from-indigo-500 hover:to-indigo-700 
          transition-all duration-300 border border-indigo-300
          flex flex-col items-center z-10`}
        onClick={() => onNodeClick(node.id || node.name)} 
      >
        <FaUserCircle className="text-white text-2xl mb-2" />
        <span className="font-medium text-center">{node.name}</span>
        {node.id && <small className="text-indigo-200 mt-1">ID: {node.id}</small>}
      </div>

      {depth < maxDepth && node.children && node.children.length > 0 && (
        <>
          <div className="w-0.5 h-6 bg-indigo-300 z-0" />
          <div className="flex justify-between items-start mt-0 relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-300 z-0 mx-4" />
            {node.children.map((child, index) => (
              <div key={index} className="flex flex-col items-center relative px-4">
                <div className="w-0.5 h-6 bg-indigo-300 z-0" />
                <TreeNode node={child} onNodeClick={onNodeClick} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ensurePerfectDepth = (node, currentDepth = 0) => {
  if (!node) return { name: "Empty", children: [], id: null };

  if (currentDepth < maxDepth) {
    let children = node.children || [];

    while (children.length < 2) {
      children.push({ name: "Empty", children: [], id: null });
    }

    children = children.map((child) => ensurePerfectDepth(child, currentDepth + 1));

    return { ...node, children };
  } else {
    return { ...node, children: [] };
  }
};

const MyTree = () => {
  const [treeData, setTreeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTree = async (userId = localStorage.getItem("UserID")) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUserChildren(userId);
      const rootName = userId || "You";

      if (!response || response.length === 0) {
        const emptyTree = {
          name: rootName,
          children: [
            { name: "Empty", children: [], id: null },
            { name: "Empty", children: [], id: null },
          ],
          id: userId || null,
        };
        setTreeData(ensurePerfectDepth(emptyTree));
      } else {
        const tree = buildTree(response, "level1", rootName);
        setTreeData(ensurePerfectDepth(tree));
      }
    } catch (err) {
      console.error("Failed to load tree:", err);
      setError("Failed to load tree data");
      const emptyTree = {
        name: "You",
        children: [
          { name: "Empty", children: [], id: null },
          { name: "Empty", children: [], id: null },
        ],
        id: null,
      };
      setTreeData(ensurePerfectDepth(emptyTree));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTree();
  }, []);

  const handleNodeClick = (userId) => {
    if (userId && userId !== "Empty" && userId !== "Available") {
      fetchTree(userId);
    }
  };

  // On search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchTree(searchTerm.trim());
    }
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-8 text-black flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-indigo-800">
        Team Structure
      </h1>

      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-6 w-full max-w-md flex">
        <input
          type="text"
          placeholder="Enter User ID to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-indigo-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </form>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="ml-4 text-indigo-600">Loading team data...</p>
        </div>
      ) : error ? (
        <div className="max-w-md text-center p-6 rounded-xl bg-red-50 border border-red-200">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => fetchTree()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      ) : treeData ? (
        <div className="w-full overflow-x-auto py-4">
          <div className="min-w-max mx-auto">
            <TreeNode node={treeData} onNodeClick={handleNodeClick} />
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No tree data to display.</p>
      )}
    </div>
  );
};

export default MyTree;
