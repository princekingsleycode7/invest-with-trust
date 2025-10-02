# RehobothBank - Invest With Trust

RehobothBank is a modern, full-stack web application designed to be a secure and transparent platform for investing in real-world projects. It connects investors with carefully vetted opportunities in sectors like manufacturing, energy, and real estate, providing detailed project insights and tracking of investment performance.

## ✨ Features

The platform is equipped with a rich set of features for both investors and administrators:

-   **Secure Authentication**: Users can sign up, log in, and reset their passwords, with their sessions managed securely.
-   **Project Discovery**: A comprehensive projects page allows users to browse, search, and filter investment opportunities by category, status, or funding progress.
-   **Real-Time Updates**: Project cards and detail pages reflect funding progress in real-time, powered by Supabase's Realtime subscriptions.
-   **In-Depth Project Analysis**: A detailed view for each project provides an executive summary, financial projections, market opportunities, and social impact analysis.
-   **Seamless Investment Flow**: A user-friendly investment modal integrates with the Korapay payment gateway, handled by a secure Supabase Edge Function.
-   **User Dashboard**: A personalized dashboard for users to track their total investments, view their portfolio, and monitor project statuses.
-   **Admin Dashboard**: A protected admin panel provides a complete overview of platform statistics, including total users, total investment volume, and lists of all users and transactions.
-   **Role-Based Access Control (RBAC)**: Distinct access levels and capabilities for regular users and administrators.
-   **Responsive Design**: A clean, responsive UI built with Tailwind CSS and Shadcn/UI ensures a great experience on any device.

## 🛠️ Tech Stack

This project is built with a modern, scalable, and type-safe technology stack.

-   **Frontend**:
    -   **Framework**: React
    -   **Language**: TypeScript
    -   **Build Tool**: Vite
    -   **Styling**: Tailwind CSS
    -   **UI Components**: Shadcn/UI
    -   **Routing**: React Router DOM
    -   **Data Fetching & State Management**: TanStack Query (React Query)
    -   **Form Management**: React Hook Form

-   **Backend (BaaS)**:
    -   **Platform**: Supabase
    -   **Database**: Supabase Postgres with RLS (Row Level Security)
    -   **Authentication**: Supabase Auth
    -   **Serverless Functions**: Supabase Edge Functions (Deno)
    -   **Real-Time Functionality**: Supabase Realtime Subscriptions

-   **Payment Integration**:
    -   **Provider**: Korapay

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js and npm (or your preferred package manager)
-   Supabase CLI

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/princekingsleycode7-invest-with-trust.git
    cd princekingsleycode7-invest-with-trust
    ```

2.  **Install frontend dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Supabase:**
    -   Log in to the Supabase CLI: `supabase login`
    -   Link your local repository to your Supabase project: `supabase link --project-ref <YOUR_PROJECT_REF>`
    -   Push the database migrations: `supabase db push`

4.  **Set up Environment Variables:**
    -   Create a `.env` file in the root directory.
    -   Add your Supabase project URL and Anon Key. You can find these in your Supabase project's API settings.

    ```env
    VITE_SUPABASE_URL="https://czknjslirxpzjipqxtid.supabase.co"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

5.  **Deploy Supabase Functions:**
    -   Deploy the payment processing edge function:
    ```sh
    supabase functions deploy create-investment
    ```
    -   Deploy the webhook handler function:
    ```sh
    supabase functions deploy korapay-webhook
    ```

6.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application should now be running on `http://localhost:8080`.
