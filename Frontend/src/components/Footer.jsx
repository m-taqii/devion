import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-slate-900 bg-black py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} Devion — Built for developers
          </div>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <a className="text-slate-400 hover:text-white transition-colors" href="#">About</a>
            <a className="text-slate-400 hover:text-white transition-colors" href="#">Privacy</a>
          </div>
        </div>
      </footer>
  )
}

export default Footer