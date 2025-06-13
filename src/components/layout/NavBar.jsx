import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const NavBar = () => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const isActive = (path, submenu) => {
    if (location.pathname === path) return true;
    if (submenu) {
      return submenu.some((sub) => location.pathname === sub.path);
    }
    return false;
  };

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
    setOpenSubmenu(null);
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "My Team",
      path: "/my-team",
      submenu: [
        { name: "My Team", path: "/my-team" },
        { name: "My Referral", path: "/my-referral" },
        { name: "My Tree", path: "/my-tree" },
      ],
    },
    {
      name: "Level",
      path: "/level/level1",
      submenu: Array.from({ length: 8 }, (_, i) => ({
        name: `Level ${i + 1}`,
        path: `/level/level${i + 1}`,
      })),
    },
    {
      name: "Matrix",
      path: "/matrix/smart",
      submenu: [
        { name: "Smart Matrix", path: "/matrix/smart" },
        { name: "Silver Matrix", path: "/matrix/silver" },
        { name: "Gold Matrix", path: "/matrix/gold" },
        { name: "Royal Matrix", path: "/matrix/royal" },
        { name: "Diamond Matrix", path: "/matrix/diamond" },
        { name: "Crown Matrix", path: "/matrix/crown" },
      ],
    },
    {
      name: "My Income",
      path: "/my-income/referral",
      submenu: [
        { name: "Referral Income", path: "/my-income/referral" },
        { name: "Sponsor Income", path: "/my-income/sponsor" },
        { name: "Placement Income", path: "/my-income/placement" },
        { name: "Level Income", path: "/my-income/level" },
        { name: "Matrix Income", path: "/my-income/matrix" },
        { name: "Matrix Referral Income", path: "/my-income/matrix-referral" },
      ],
    },
    {
      name: "Download Plan",
      path: "/download-plan",
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-black to-gray-900 text-white shadow-lg w-full z-50">
      {/* Toggle Button (Mobile) */}
      <div className="md:hidden px-4 py-3 flex justify-between items-center border-b border-gray-700">
        <span className="text-xl font-semibold">Menu</span>
        <button
          onClick={toggleMobileNav}
          className="text-white text-2xl focus:outline-none"
        >
          {isMobileNavOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar Nav */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 z-50 transform ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="px-4 py-4 border-b border-gray-700 flex justify-between items-center">
          <span className="text-xl font-bold">Navigation</span>
          <button
            onClick={toggleMobileNav}
            className="text-white text-2xl focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.path, item.submenu);
            return (
              <li key={item.name}>
                <div className="flex justify-between items-center">
                  <Link
                    to={item.path}
                    className={`block px-4 py-2 rounded-md text-base font-medium ${
                      active ? "bg-[#146c7b] text-white" : "hover:bg-[#146c7b]"
                    }`}
                    onClick={() => {
                      if (item.submenu) {
                        toggleSubmenu(item.name);
                      } else {
                        toggleMobileNav();
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className="px-2"
                    >
                      {openSubmenu === item.name ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  )}
                </div>
                {item.submenu && openSubmenu === item.name && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.path}
                          className={`block px-4 py-1 text-sm rounded-md ${
                            location.pathname === subItem.path
                              ? "bg-[#146c7b] text-white"
                              : "hover:bg-[#146c7b]"
                          }`}
                          onClick={() => {
                            toggleMobileNav();
                            setOpenSubmenu(null);
                          }}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex md:justify-center px-8 py-3 space-x-24">
        {menuItems.map((item) => {
          const active = isActive(item.path, item.submenu);
          return (
            <li
              key={item.name}
              className="relative group"
              onMouseEnter={() =>
                item.submenu && setOpenSubmenu(item.name)
              }
              onMouseLeave={() => setOpenSubmenu(null)}
            >
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-md font-medium text-xl ${
                  active ? "bg-[#146c7b] text-white" : "hover:bg-[#146c7b]"
                }`}
              >
                {item.name}
              </Link>

              {/* Desktop Submenu */}
              {item.submenu && (
                <ul className="absolute hidden group-hover:block top-full mt-1 left-1/2 transform -translate-x-1/2 bg-white text-black shadow-lg rounded-md w-48 z-50">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className={`block px-4 py-2 text-sm hover:bg-[#146c7b] hover:text-white ${
                          location.pathname === subItem.path
                            ? "bg-[#146c7b] text-white"
                            : ""
                        }`}
                        onClick={() => setOpenSubmenu(null)}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
