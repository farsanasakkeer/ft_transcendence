// pages.ts

export function loginPage(): string {
    return `
    <div class="w-full max-w-md bg-gray-800 p-8 shadow-lg rounded-lg border border-blue-500">
        <h1 class="text-3xl font-extrabold text-center text-blue-400 drop-shadow-lg">🔹 Player Login</h1>

        <form id="loginForm" class="mt-6">
            <div class="mb-4">
                <label for="email" class="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <input type="email" id="email" placeholder="Enter your email"
                    class="w-full px-4 py-2 bg-gray-700 border border-blue-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div class="mb-4">
                <label for="password" class="block text-gray-300 text-sm font-medium mb-2">Password</label>
                <input type="password" id="password" placeholder="Enter your password"
                    class="w-full px-4 py-2 bg-gray-700 border border-blue-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <button type="submit"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition transform hover:scale-105 duration-300">
                Enter the Arena
            </button>
        </form>

        <p class="text-sm text-center text-gray-400 mt-4">
            New to GameZone?
            <a href="/register" id="toRegister" class="text-blue-400 hover:underline">Create an Account</a>
        </p>
    </div>
        `;
}

export function registerPage(): string {
    return `
        <div class="w-full max-w-md bg-gray-800 p-8 shadow-lg rounded-lg border border-blue-500">
            <h1 class="text-3xl font-extrabold text-center text-blue-400 drop-shadow-lg">Build Your Player Profile!</h1>

            <form id="registerForm" class="mt-6">
                <div class="mb-4">
                    <label for="email" class="block text-gray-300 text-sm font-medium mb-2">Email</label>
                    <input type="email" id="email" placeholder="Enter your email"
                        class="w-full px-4 py-2 bg-gray-700 border border-blue-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-gray-300 text-sm font-medium mb-2">Password</label>
                    <input type="password" id="password" placeholder="Enter your password"
                        class="w-full px-4 py-2 bg-gray-700 border border-blue-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div class="mb-4">
                    <label for="confirmPassword" class="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Re-enter your password"
                        class="w-full px-4 py-2 bg-gray-700 border border-blue-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <p id="error-message" class="text-red-500 text-sm mt-1 hidden">Passwords do not match</p>
                </div>

                <button type="submit"
                    class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition transform hover:scale-105 duration-300">
                    Join the Battle
                </button>
            </form>

            <p class="text-sm text-center text-gray-400 mt-4">
                Already a warrior?
                <a href="/" id="toLogin" class="text-blue-400 hover:underline">Enter the Arena</a>
            </p>
        </div>
         `;
}

export function dashboardPage(): string {
    return `
         <!-- Navbar -->
        <nav class="bg-gradient-to-r from-purple-700 to-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
            <h1 class="text-2xl font-extrabold tracking-wide">🎮 Gamer Dashboard</h1>
            <button id="logoutBtn"
                class="bg-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition duration-300">
                Logout
            </button>
        </nav>

        <!-- Main Content -->
        <div class="flex flex-1">
            <!-- Sidebar -->
            <aside class="w-64 bg-gray-800 p-6 shadow-lg">
                <h2 class="text-lg font-bold text-gray-300 mb-4">Navigation</h2>
                <ul class="space-y-3">
                    <li><a href="#" class="block text-blue-400 hover:text-white transition">🏠 Home</a></li>
                    <li><a href="#" class="block text-blue-400 hover:text-white transition">📝 Profile</a></li>
                    <li><a href="#" class="block text-blue-400 hover:text-white transition">⚙️ Settings</a></li>
                </ul>
            </aside>

            <!-- Dashboard Content -->
            <main class="flex-1 p-8">
                <h2 class="text-3xl font-bold text-blue-400">Welcome, Player!</h2>
                <p class="text-gray-400 mt-2">Your gaming stats and recent activities are below.</p>

                <!-- Stats Section -->
                <div class="grid grid-cols-3 gap-6 mt-6">
                    <div class="bg-gray-800 shadow-lg p-6 rounded-lg text-center border border-blue-500">
                        <h3 class="text-3xl font-bold text-blue-400">🏆 25</h3>
                        <p class="text-gray-400">Total Wins</p>
                    </div>
                    <div class="bg-gray-800 shadow-lg p-6 rounded-lg text-center border border-green-500">
                        <h3 class="text-3xl font-bold text-green-400">🔥 12</h3>
                        <p class="text-gray-400">Active Matches</p>
                    </div>
                    <div class="bg-gray-800 shadow-lg p-6 rounded-lg text-center border border-red-500">
                        <h3 class="text-3xl font-bold text-red-400">💀 8</h3>
                        <p class="text-gray-400">Defeats</p>
                    </div>
                </div>

                <!-- Recent Activity Section -->
                <div class="mt-8">
                    <h3 class="text-2xl font-bold text-gray-300">Recent Activity</h3>
                    <ul class="mt-4 space-y-3">
                        <li class="bg-gray-800 shadow-md p-4 rounded-lg border border-gray-700">✅ Defeated <span class="text-yellow-400">PlayerX</span> in Battle Royale</li>
                        <li class="bg-gray-800 shadow-md p-4 rounded-lg border border-gray-700">🏅 Reached Level <span class="text-green-400">50</span> in Ranked Mode</li>
                        <li class="bg-gray-800 shadow-md p-4 rounded-lg border border-gray-700">💬 Joined a new Clan: <span class="text-blue-400">Elite Warriors</span></li>
                    </ul>
                </div>
                <!-- Play Button -->
                <div class="mt-10 flex justify-center">
                    <button id="playPongBtn"
                        class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition transform hover:scale-105 duration-300">
                        🕹️ Play Pong
                    </button>
                </div>
            </main>
        </div>
    `;
}

export function pongPage(): string {
    return `
        <canvas id="gameCanvas" width="800" height="600" style="border:1px solid #000;"></canvas>
    `;
}
