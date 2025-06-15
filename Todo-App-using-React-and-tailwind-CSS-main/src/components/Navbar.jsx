import React from 'react';

const Navbar = () => {
    return (
        <nav className="flex justify-around bg-slate-700 text-white py-2">
            <div className="logo">
                <span className="font-bold text-xl mx-8">Todo</span>
            </div>
            <ul class="flex gap-8 mx-9">
                <li className="cursor-pointer hover:font-bold transition-all ">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all ">Your tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar;