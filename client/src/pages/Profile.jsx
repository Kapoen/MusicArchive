import React from "react";

import Layout from "../components/Layout.jsx";
import { useAuth } from "../utils/AuthContext.jsx";

export default function Profile() {
    const { userID } = useAuth();

    return (
        <Layout>
        </Layout>
    );
};