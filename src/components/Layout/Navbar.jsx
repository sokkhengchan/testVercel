import { useState } from 'react'
import { NavLink } from 'react-router'

export default () => {
  const [state, setState] = useState(false)

  const navigation = [
    { title: "Product List", path: "/products", isDrapdown: false },
    { title: "About", path: "/about", isDrapdown: false },
    { title: "Contact", path: "/contact", isDrapdown: false },
  ]

  return (
    <>
      <nav className={`relative z-20 bg-white w-full md:static md:text-sm md:border-none ${state ? "shadow-lg rounded-b-xl md:shadow-none" : ""}`}>
        <div className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <NavLink to="/">
              <img
                src="https://www.floatui.com/logo.svg"
                width={120}
                height={50}
                alt="Float UI logo"
              />
            </NavLink>
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {
                  state ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                  )
                }
              </button>
            </div>
          </div>
          <div className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
            <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {
                navigation.map((item, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        "block text-gray-700 hover:text-indigo-600" + (isActive ? " font-semibold underline" : "")
                      }
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))
              }
              <div className='flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0'>
                <li>
                  <NavLink to="/create" className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none">
                    Create Product |
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/delete" className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none">
                    Delete Product |
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none">
                    Log in
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
                    Register
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      {
        state ? (
          <div
            className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setState(false)}></div>
        ) : ""
      }
    </>
  )
}
