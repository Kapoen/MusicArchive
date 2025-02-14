import React from "react";

export default function Layout({ children }) {
    return (
        <main>
            <nav>
                HOME
            </nav>
            {children}
        </main>
    );
};