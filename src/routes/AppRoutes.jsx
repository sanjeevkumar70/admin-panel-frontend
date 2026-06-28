
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Unauthorized from "../pages/Unauthorized";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Blog from "../pages/Blog/BlogPage/Blog";
import CategoryBlog from "../pages/Blog/CategoryPage/CategoryBlog";
import Campaign from "../pages/Campaign/CampaignPage/Campaign";
import CategoryCamp from "../pages/Campaign/CategoryPage/CategoryCamp";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/blog"
                    element={
                        <ProtectedRoute
                            roles={["admin"]}
                        >
                            <DashboardLayout>
                                <Blog />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/blog-category"
                    element={
                        <ProtectedRoute
                            roles={["admin"]}
                        >
                            <DashboardLayout>
                                <CategoryBlog />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/category-campaign"
                    element={
                        <ProtectedRoute
                            roles={["admin"]}
                        >
                            <DashboardLayout>
                                <CategoryCamp />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/campaign"
                    element={
                        <ProtectedRoute
                            roles={["admin"]}
                        >
                            <DashboardLayout>
                                <Campaign />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />
            </Routes>
        </BrowserRouter>
    );
}